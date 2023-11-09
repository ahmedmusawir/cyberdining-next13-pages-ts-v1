import { RestaurantData } from "@/data-layer/restaurant-entities";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiReviews = createApi({
  reducerPath: "apiReviews",
  tagTypes: ["Review"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getPostById: builder.query<RestaurantData, number>({
      query: (postId) => `post-by-id?id=${postId}`,
      providesTags: [{ type: "Review", id: "LIST" }],
    }),
    createReview: builder.mutation({
      query: ({ content, postId, userId }) => ({
        url: `/create-comment`,
        method: "POST",
        body: {
          content,
          postId,
          userId,
        },
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `/delete-comment`,
        method: "DELETE",
        body: {
          commentId,
        },
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useCreateReviewMutation,
  useDeleteCommentMutation,
} = apiReviews;
