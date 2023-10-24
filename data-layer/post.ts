import qs from "qs";
import postService, { PostApiResponse } from "@/services/postService";
import { PostData } from "./post-entities";
import { FiltersState } from "@/global-entities";
import { generateSearchFields } from "@/utils";

// GETS ALL POSTS
export const getPosts = async (): Promise<PostApiResponse> => {
  const query = qs.stringify(
    {
      populate: [
        "comments",
        "comments.user",
        "comments.user.profileImage",
        "categories",
        "post_tags",
      ],
    },
    {
      encodeValuesOnly: true,
      arrayFormat: "brackets",
    }
  );

  const response = await postService.getAll(query);

  return response;
};

// GETS ONLY ALL POST SLUGS AS AN ARRAY OF STRINGS
export const getPostSlugs = async (): Promise<string[]> => {
  const query = qs.stringify({ fields: ["slug"] }, { encodeValuesOnly: true });

  const response = await postService.getAll(query);

  const slugs = response.data.map((slug) => slug.attributes.slug);

  return slugs;
};

// GETS SINGLE POST BY IT'S SLUG
export const getPostBySlug = async (slug: string): Promise<PostData> => {
  const query = qs.stringify(
    {
      populate: [
        "comments",
        "comments.user",
        "comments.user.profileImage",
        "categories",
        "post_tags",
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

  const rawPost = await postService.getOneBySlug(query);

  return rawPost;
};

// GETS SINGLE POST BY IT'S ID
export const getPostById = async (postId: number): Promise<PostData> => {
  const query = qs.stringify(
    {
      populate: [
        "comments",
        "comments.user",
        "comments.user.profileImage",
        "categories",
        "post_tags",
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

  const rawPost = await postService.getOneById(query);

  return rawPost;
};

// POST SEARCH AND FILTERS

export const searchPosts = async (
  query: FiltersState
): Promise<PostApiResponse> => {
  let categoryTermsArray: string[] = [];
  let postTagTermsArray: string[] = [];

  console.log("Current Page:", query.currentPage);
  console.log("Posts Per Page:", query.postsPerPage);

  // PROCESSING CATEGORY ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (query.categoryTerms) {
    if (typeof query.categoryTerms === "string") {
      categoryTermsArray = (query.categoryTerms as string).split(","); // Convert comma-separated string to array
    } else {
      categoryTermsArray = query.categoryTerms as string[];
    }
  }
  // PROCESSING POST TAG ID-S STRING INTO ARRAY FOR $in STRAPI FILTER
  if (query.postTagTerms) {
    if (typeof query.postTagTerms === "string") {
      postTagTermsArray = (query.postTagTerms as string).split(","); // Convert comma-separated string to array
    } else {
      postTagTermsArray = query.postTagTerms as string[];
    }
  }

  const searchFields = query.searchTerm
    ? generateSearchFields(query.searchTerm)
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
