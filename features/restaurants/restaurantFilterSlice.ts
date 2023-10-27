import { FiltersState } from "@/global-entities";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FiltersState = {
  searchTerm: "",
  cuisineIds: [],
  locationIds: [],
  currentPage: 1,
  restaurantsPerPage: 4,
  isFeatured: false,
  hasOnlineOrdering: false,
  isFeaturedButtonEnabled: false,
  hasOnlineOrderingButtonEnabled: false,
};

const restaurantFilterSlice = createSlice({
  name: "restaurantFilters",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    toggleIsFeatured: (state) => {
      state.isFeatured = !state.isFeatured;
    },
    togglehasOnlineOrdering: (state) => {
      state.hasOnlineOrdering = !state.hasOnlineOrdering;
    },
    setLocationIds: (state, action: PayloadAction<string[]>) => {
      state.locationIds = action.payload;
    },
    addLocationId: (state, action: PayloadAction<string>) => {
      state.locationIds?.push(action.payload);
    },
    removeLoctionId: (state, action: PayloadAction<string>) => {
      state.locationIds = state.locationIds?.filter(
        (term) => term !== action.payload
      );
    },
    setCuisineIds: (state, action: PayloadAction<string[]>) => {
      state.cuisineIds = action.payload;
    },
    addCuisineId: (state, action: PayloadAction<string>) => {
      state.cuisineIds?.push(action.payload);
    },
    removeCuisineId: (state, action: PayloadAction<string>) => {
      state.cuisineIds = state.cuisineIds?.filter(
        (term) => term !== action.payload
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetAll: (state) => {
      state.searchTerm = "";
      state.locationIds = [];
      state.cuisineIds = [];
      state.isFeatured = false;
      state.hasOnlineOrdering = false;
      state.currentPage = 1;
    },
  },
});

export const {
  setSearchTerm,
  toggleIsFeatured,
  togglehasOnlineOrdering,
  setLocationIds,
  addLocationId,
  removeLoctionId,
  setCuisineIds,
  addCuisineId,
  removeCuisineId,
  setCurrentPage,
  resetAll,
} = restaurantFilterSlice.actions;
export default restaurantFilterSlice.reducer;
