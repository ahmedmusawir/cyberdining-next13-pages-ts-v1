import { RestaurantApiResponse } from "@/services/restaurantService";

export interface RestaurantDataSource {
  getAllRestaurants: () => Promise<RestaurantApiResponse>;
  getAllRestaurantsByCuisineId: (
    cuisineId: number
  ) => Promise<RestaurantApiResponse>;
  getAllRestaurantsByLocationId: (
    locationId: number
  ) => Promise<RestaurantApiResponse>;
  getAllRestaurantsBySearchTerm: (
    searchTerm: string
  ) => Promise<RestaurantApiResponse>;
  getRestaurantSlugs: () => Promise<string[]>;
  getRestaurantBySlug: (slug: string) => Promise<RestaurantData>;
  getRestaurantById: (postId: number) => Promise<RestaurantData>;
  // searchRestaurants: (query: FiltersState) => Promise<PostApiResponse>;
}

export interface RestaurantData {
  id: number;
  attributes: Restaurant;
}

export interface Restaurant {
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  bannerImage: string;
  openTime: string;
  closeTime: string;
  slug: string;
  price: string;
  isFeatured: any;
  hasOnlineOrdering: any;
  photos: Photo[];
  menuItems: MenuItem[];
  location: LocationData;
  cuisines: CuisinesData;
  reviews: ReviewsData;
}

export interface Photo {
  id: number;
  url: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
}

export interface LocationData {
  data: {
    id: number;
    attributes: Location;
  };
}

export interface Location {
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CuisinesData {
  data: Cuisines[];
}

export interface Cuisines {
  id: number;
  attributes: Cuisine;
}

export interface Cuisine {
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsData {
  data: Reviews[];
}

export interface Reviews {
  id: number;
  attributes: Review;
}

export interface Review {
  content: string;
  stars: number;
  createdAt: string;
  updatedAt: string;
  user: UserData;
}

export interface UserData {
  data: {
    id: number;
    attributes: User;
  };
}

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: string;
}
