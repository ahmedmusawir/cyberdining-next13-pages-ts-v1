import { RestaurantApiResponse } from "@/services/restaurantService";

export interface RestaurantDataSource {
  getAllRestaurants: () => Promise<RestaurantApiResponse>;
  // getPostSlugs: () => Promise<string[]>;
  // getPostBySlug: (slug: string) => Promise<PostData>;
  // getPostById: (postId: number) => Promise<PostData>;
  // searchPosts: (query: FiltersState) => Promise<PostApiResponse>;
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
}
