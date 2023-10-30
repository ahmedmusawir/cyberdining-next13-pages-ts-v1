import { FiltersState } from "@/global-entities";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRestaurant = createApi({
  reducerPath: "apiRestaurant",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    // The following sort function is not being used now
    // getRestaurantsByNameSort: builder.query<RestaurantApiResponse, string>({
    //   query: (sortOrder) => `/restaurants-by-name-sort?sortOrder=${sortOrder}`,
    // }),
    // This function handles all the Search, Sort and Filtering
    getRestaurants: builder.query<RestaurantApiResponse, FiltersState>({
      query: (filters) => {
        // Constructing the query based on the filters
        let query = "/restaurants-by-search-filters?";

        // SEARCH TERM
        if (filters.searchTerm) {
          query += `searchTerm=${filters.searchTerm}&`;
        }
        // SORT NAME ORDER
        if (filters.sortNameOrder) {
          query += `sortNameOrder=${filters.sortNameOrder}&`;
        }
        // FEATURED RESTAURANTS
        if (filters.isFeatured) {
          query += `isFeatured=${filters.isFeatured}&`;
        }
        // HAS ONLINE ORDERING
        if (filters.hasOnlineOrdering) {
          query += `hasOnlineOrdering=${filters.hasOnlineOrdering}&`;
        }
        // LOCATION IDS
        if (filters.locationIds?.length) {
          query += `locationIds=${filters.locationIds}&`;
        }
        // CUISINE IDS
        if (filters.cuisineIds?.length) {
          query += `cuisineIds=${filters.cuisineIds}&`;
        }
        // PRICES
        if (filters.prices?.length) {
          query += `prices=${filters.prices}&`;
        }

        // PAGINATION PARAMS
        query += `currentPage=${filters.currentPage}&postsPerPage=${filters.restaurantsPerPage}&`;

        return query;
      },
      // keepUnusedDataFor: 0, // to disable caching completely
    }),
  }),
});

export const {
  useGetRestaurantsQuery,
  useLazyGetRestaurantsQuery,
  // useGetRestaurantsByNameSortQuery,
} = apiRestaurant;
