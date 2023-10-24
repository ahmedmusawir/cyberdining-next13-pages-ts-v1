import { FiltersState } from "@/global-entities";
import { PostApiResponse } from "@/services/postService";

export interface PostDataSource {
  getPosts: () => Promise<PostApiResponse>;
  getPostSlugs: () => Promise<string[]>;
  getPostBySlug: (slug: string) => Promise<PostData>;
  getPostById: (postId: number) => Promise<PostData>;
  searchPosts: (query: FiltersState) => Promise<PostApiResponse>;
}

export interface PostData {
  id: number;
  attributes: Post;
}

export interface Post {
  title: string;
  content: string;
  featuredImage: string;
  isFeatured: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentsData;
  categories: Categories;
  post_tags: PostTags;
}

export interface CommentsData {
  data: Comments[];
}

export interface Comments {
  id: number;
  attributes: Comment;
}

export interface Comment {
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserField;
}

export interface UserField {
  data: UserData;
}

export interface UserData {
  id: number;
  attributes: User;
}

export interface User {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage: ProfileImageField;
}

export interface ProfileImageField {
  data?: ProfileImageData;
}

export interface ProfileImageData {
  id: number;
  attributes: ProfileImage;
}

export interface ProfileImage {
  name: string;
  alternativeText: any;
  caption: any;
  width: number;
  height: number;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Categories {
  data: CategoriesData[];
}

export interface CategoriesData {
  id: number;
  attributes: Category;
}

export interface Category {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostTags {
  data: PostTagsData[];
}

export interface PostTagsData {
  id: number;
  attributes: PostTag;
}

export interface PostTag {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
