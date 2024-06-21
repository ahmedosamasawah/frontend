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

export const advicesCategoryesApi = createApi({
  reducerPath: "advicesCategoryesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.taqadi.com/api/v1",
    prepareHeaders: headers => {
      const token = getTokenFromCookie();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log(token);
      }

      return headers;
    },
  }),
  //
  endpoints: builder => ({
    getAllAdvicesCategoryesApi: builder.query({
      query: () => "/advice/categories",
    }),
    //
    createAdviceCategorye: builder.mutation({
      query: formData => ({
        url: `/advice/categories`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    updateAdviceCategorye: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/advice/categories/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    //
    deleteAdviceCategorye: builder.mutation({
      query: id => ({
        url: `/advice/categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllAdvicesCategoryesApiQuery,
  useCreateAdviceCategoryeMutation,
  useUpdateAdviceCategoryeMutation,
  useDeleteAdviceCategoryeMutation,
} = advicesCategoryesApi;
