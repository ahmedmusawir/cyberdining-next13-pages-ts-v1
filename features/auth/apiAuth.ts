import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authBaseQuery = fetchBaseQuery({ baseUrl: "/api" });

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ identifier, password }) => ({
        url: `/login`,
        method: "POST",
        body: {
          identifier,
          password,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getCurrentUser: builder.query({
      query: () => `/current-user`,
    }),
    signup: builder.mutation({
      query: ({ username, email, password }) => ({
        url: `/signup`,
        method: "POST",
        body: {
          username,
          email,
          password,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useSignupMutation,
} = apiAuth;
