import qs from "qs";
import postService, { PostApiResponse } from "@/services/postService";
import { FiltersState } from "@/global-entities";
import { generateSearchFields } from "@/utils";
import restaurantService, {
  RestaurantApiResponse,
} from "@/services/restaurantService";
import { RestaurantData } from "./restaurant-entities";

// GETS ALL RESTAURANTS
export const getAllRestaurants = async (): Promise<RestaurantApiResponse> => {
  const query = qs.stringify(
    {
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};

// GETS ALL RESTAURANTS
export const getAllRestaurantsByNameSort = async (
  sortOrder: string
): Promise<RestaurantApiResponse> => {
  const query = qs.stringify(
    {
      sort: [`name:${sortOrder}`],

      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};

// GETS ALL RESTAURANTS BY CUISINE ID
export const getAllRestaurantsByCuisineId = async (
  cuisineId: number
): Promise<RestaurantApiResponse> => {
  const query = qs.stringify(
    {
      filters: {
        ...(cuisineId && {
          cuisines: {
            id: {
              $eq: cuisineId,
            },
          },
        }),
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};

// GETS ALL RESTAURANTS BY LOCATION ID
export const getAllRestaurantsByLocationId = async (
  locationId: number
): Promise<RestaurantApiResponse> => {
  const query = qs.stringify(
    {
      filters: {
        ...(locationId && {
          location: {
            id: {
              $eq: locationId,
            },
          },
        }),
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};

// GETS ALL RESTAURANTS BY TEXT SEARCH TERM
export const getAllRestaurantsBySearchTerm = async (
  searchTerm: string
): Promise<RestaurantApiResponse> => {
  const fields = [
    "name",
    "description",
    "slug",
    "price",
    "menuItems.name",
    "menuItems.description",
    "location.name",
    "cuisines.name",
  ];

  const searchFields = searchTerm
    ? generateSearchFields(searchTerm, fields)
    : [];

  // Get search results:
  const query = qs.stringify(
    {
      sort: ["id:asc"],

      fields: [],

      filters: {
        $or: searchFields,
      },

      populate: "*",
    },

    {
      encodeValuesOnly: true,
      // arrayFormat: "brackets", NEVER USE THIS
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};

// GETS ONLY ALL RESTAURANT SLUGS AS AN ARRAY OF STRINGS
export const getRestaurantSlugs = async (): Promise<string[]> => {
  const query = qs.stringify({ fields: ["slug"] }, { encodeValuesOnly: true });

  const response = await restaurantService.getAll(query);

  const slugs = response.data.map((slug) => slug.attributes.slug);

  return slugs;
};

// GETS SINGLE RESTAURANT BY IT'S SLUG
export const getRestaurantBySlug = async (
  slug: string
): Promise<RestaurantData> => {
  const query = qs.stringify(
    {
      populate: [
        "photos",
        "menuItems",
        "location",
        "cuisines",
        "reviews",
        "reviews.user",
      ],

      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const rawRestaurant = await restaurantService.getOneBySlug(query);

  return rawRestaurant;
};

// GETS SINGLE RESTAURANT BY IT'S ID
export const getRestaurantById = async (
  postId: number
): Promise<RestaurantData> => {
  const query = qs.stringify(
    {
      populate: [
        "photos",
        "menuItems",
        "location",
        "cuisines",
        "reviews",
        "reviews.user",
      ],

      filters: {
        id: {
          $eq: postId,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const rawRestaurant = await restaurantService.getOneById(query);

  return rawRestaurant;
};

// RESTAURANTS BY SEARH AND FILTERS
export const getAllRestaurantsBySearchFilters = async (
  searchFilterQuery: FiltersState
): Promise<RestaurantApiResponse> => {
  let cuisineIdsArray: string[] = [];
  let locationIdsArray: string[] = [];

  // console.log("Current Page:", searchFilterQuery.currentPage);
  // console.log("Posts Per Page:", searchFilterQuery.postsPerPage);
  // console.log(
  //   "SEARCH FILTER QUERY IN RESTAURANTS IN DATA LAYER:",
  //   searchFilterQuery
  // );

  // PROCESSING CATEGORY ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (searchFilterQuery.cuisineIds) {
    if (typeof searchFilterQuery.cuisineIds === "string") {
      cuisineIdsArray = (searchFilterQuery.cuisineIds as string).split(","); // Convert comma-separated string to array
    } else {
      cuisineIdsArray = searchFilterQuery.cuisineIds as string[];
    }
  }
  // PROCESSING POST TAG ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (searchFilterQuery.locationIds) {
    if (typeof searchFilterQuery.locationIds === "string") {
      locationIdsArray = (searchFilterQuery.locationIds as string).split(","); // Convert comma-separated string to array
    } else {
      locationIdsArray = searchFilterQuery.locationIds as string[];
    }
  }
  const fields = [
    "name",
    "description",
    "slug",
    "price",
    "menuItems.name",
    "menuItems.description",
    "location.name",
    "cuisines.name",
  ];

  const searchFields = searchFilterQuery.searchTerm
    ? generateSearchFields(searchFilterQuery.searchTerm, fields)
    : [];

  console.log("Prices in data layer", searchFilterQuery.prices);

  // Get search results:
  const query = qs.stringify(
    {
      sort: [`name:${searchFilterQuery.sortNameOrder}`],

      filters: {
        ...(searchFilterQuery.isFeatured && { isFeatured: { $eq: true } }),
        ...(searchFilterQuery.hasOnlineOrdering && {
          hasOnlineOrdering: { $eq: true },
        }),
        ...(cuisineIdsArray.length && {
          cuisines: {
            id: { $in: cuisineIdsArray.map((catId) => Number(catId)) }, // Converting id string to number
          },
        }),
        ...(locationIdsArray.length && {
          location: {
            id: { $in: locationIdsArray.map((catId) => Number(catId)) }, // Converting id string to number
          },
        }),
        ...(searchFilterQuery.prices && {
          price: {
            $in: searchFilterQuery.prices,
          },
        }),

        $or: searchFields,
      },

      populate: "*",
    },

    {
      encodeValuesOnly: true,
      // arrayFormat: "brackets", //NEVER USE THIS
    }
  );

  const response = await restaurantService.getAll(query);

  return response;
};
