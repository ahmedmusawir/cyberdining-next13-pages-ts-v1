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
      arrayFormat: "brackets",
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

// RESTAURANT SEARCH AND FILTERS

export const searchRestaurants = async (
  query: FiltersState
): Promise<PostApiResponse> => {
  let categoryTermsArray: string[] = [];
  let postTagTermsArray: string[] = [];

  console.log("Current Page:", query.currentPage);
  console.log("Restaurants Per Page:", query.postsPerPage);

  // PROCESSING CATEGORY ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (query.categoryTerms) {
    if (typeof query.categoryTerms === "string") {
      categoryTermsArray = (query.categoryTerms as string).split(","); // Convert comma-separated string to array
    } else {
      categoryTermsArray = query.categoryTerms as string[];
    }
  }
  // PROCESSING RESTAURANT TAG ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (query.postTagTerms) {
    if (typeof query.postTagTerms === "string") {
      postTagTermsArray = (query.postTagTerms as string).split(","); // Convert comma-separated string to array
    } else {
      postTagTermsArray = query.postTagTerms as string[];
    }
  }

  const fields = [
    "title",
    "content",
    "slug",
    "categories.name",
    "post_tags.name",
  ];

  const searchFields = query.searchTerm
    ? generateSearchFields(query.searchTerm, fields)
    : [];

  const strapiQuery = {
    populate: ["categories", "post_tags"],
    // Add pagination parameters
    "pagination[start]": (query.currentPage - 1) * query.postsPerPage,
    "pagination[limit]": query.postsPerPage,

    filters: {
      ...(query.isFeatured && { isFeatured: { $eq: true } }),

      ...(categoryTermsArray.length && {
        categories: {
          id: { $in: categoryTermsArray.map((catId) => Number(catId)) }, // Converting id string to number
        },
      }),

      ...(postTagTermsArray?.length && {
        post_tags: {
          id: { $in: postTagTermsArray.map((tagId) => Number(tagId)) }, // Converting id string to number
        },
      }),

      ...(searchFields.length > 0 && { $or: searchFields }),
    },
  };

  console.log("query in Data Layer:", query);

  const strapiQueryStr = qs.stringify(strapiQuery, { encodeValuesOnly: true });
  console.log("Final Query String in post.ts:", strapiQueryStr);
  const response = await postService.getAll(strapiQueryStr);

  return response;
};
