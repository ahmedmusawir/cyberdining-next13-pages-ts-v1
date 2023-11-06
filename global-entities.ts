import { RestaurantApiResponse } from "./services/restaurantService";

export interface GlobalState {
  restaurants: RestaurantState;
  restaurantFilters: FiltersState;
  auth: AuthState;
}

export interface ApiError {
  data?: {
    error?: string;
  };
  status?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  loginModalOpen: boolean;
}

export interface FiltersState {
  searchTerm?: string;
  sortNameOrder?: string;
  isFeatured?: boolean;
  hasOnlineOrdering?: boolean;
  cuisineIds: string[];
  locationIds: string[];
  prices: string[];
  currentPage: number;
  restaurantsPerPage: number;
  isFeaturedButtonEnabled: boolean;
  hasOnlineOrderingButtonEnabled: boolean;
}

export interface RestaurantState {
  restaurants: RestaurantApiResponse;
}

export interface AxiosError {
  response?: {
    status?: number;
    data?: any;
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  starts: number;
  content: string;
}
