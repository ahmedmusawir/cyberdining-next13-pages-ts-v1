import { RestaurantState } from "@/global-entities";
import { RestaurantApiResponse } from "@/services/restaurantService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: RestaurantState = {
  restaurants: {
    data: [],
    meta: {
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    },
  },
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<RestaurantApiResponse>) => {
      state.restaurants = action.payload;
    },
  },
});

export const { setRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;
