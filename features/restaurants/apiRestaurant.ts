import { FiltersState } from "@/global-entities";
import { PostApiResponse } from "@/services/postService";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRestaurant = createApi({
  reducerPath: "apiRestaurant",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getRestaurants: builder.query<RestaurantApiResponse, FiltersState>({
      query: (filters) => {
        // Constructing the query based on the filters
        let query = "/restaurants-by-search-filters?";

        // SEARCH TERM
        if (filters.searchTerm) {
          query += `searchTerm=${filters.searchTerm}&`;
        }
        // FEATURED RESTAURANTS
        if (filters.isFeatured) {
          query += "isFeatured=true&";
        }
        // HAS ONLINE ORDERING
        if (filters.hasOnlineOrdering) {
          query += "hasOnlineOrdering=true&";
        }
        // LOCATION IDS
        if (filters.locationIds?.length) {
          query += `locationIds=${filters.locationIds}&`;
        }
        // CUISINE IDS
        if (filters.cuisineIds?.length) {
          query += `cuisineIds=${filters.cuisineIds}&`;
        }
        // PAGINATION PARAMS
        query += `currentPage=${filters.currentPage}&postsPerPage=${filters.restaurantsPerPage}&`;

        return query;
      },
      // keepUnusedDataFor: 0, // to disable caching completely
    }),
  }),
});

export const { useGetRestaurantsQuery, useLazyGetRestaurantsQuery } =
  apiRestaurant;
