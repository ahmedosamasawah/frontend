import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardAuthApi = createApi({
  reducerPath: "dashboardAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.taqadi.com/api/v1" }),
  endpoints: builder => ({
    loginDashboard: builder.mutation({
      query: credentials => ({
        url: "/auth/dashboard/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginDashboardMutation } = dashboardAuthApi;
