import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiAuth } from "@/features/auth/apiAuth";
import authSliceReducer from "@/features/auth/authSlice";
import { apiRestaurant } from "@/features/restaurants/apiRestaurant";
import restaurantSliceReducer from "@/features/restaurants/restaurantSlice";
import restaurantFilterSliceReducer from "@/features/restaurants/restaurantFilterSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only auth will be persisted
};

const rootReducer = combineReducers({
  auth: authSliceReducer,
  [apiRestaurant.reducerPath]: apiRestaurant.reducer,
  [apiAuth.reducerPath]: apiAuth.reducer,
  restaurants: restaurantSliceReducer,
  restaurantFilters: restaurantFilterSliceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], // This was added for redux-persist
      },
    }).concat([apiRestaurant.middleware, apiAuth.middleware]),
});

export const persistor = persistStore(store);
