import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const getTokenFromCookie = () => {
  return getCookie("token");
};

export const advicesApi = createApi({
  reducerPath: "advicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.taqadi.com/api/v1",
    prepareHeaders: headers => {
      const token = getTokenFromCookie();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getAllAdvices: builder.query({
      query: () => "advice",
    }),
    //
    deleteAdvice: builder.mutation({
      query: id => ({
        url: `advice/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createAdvice: builder.mutation({
      query: formData => ({
        url: `advice`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getAdviceById: builder.query({
      query: id => `advice/${id}`,
    }),
    //
    updateAdvice: builder.mutation({
      query: ({ formData, id }) => ({
        url: `advice/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllAdvicesQuery,
  useDeleteAdviceMutation,
  useCreateAdviceMutation,
  useGetAdviceByIdQuery,
  useUpdateAdviceMutation,
} = advicesApi;
