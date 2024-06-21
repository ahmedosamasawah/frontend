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

export const expensesApi = createApi({
  reducerPath: "expensesApi",
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
    getAllExpenses: builder.query({
      query: () => "expenses",
    }),
    //
    deleteExpenses: builder.mutation({
      query: id => ({
        url: `expenses/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createExpenses: builder.mutation({
      query: formData => ({
        url: `expenses`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getExpensById: builder.query({
      query: id => `expenses/${id}`,
    }),
    //
    updateExpenses: builder.mutation({
      query: ({ formData, id }) => ({
        url: `expenses/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllExpensesQuery,
  useDeleteExpensesMutation,
  useCreateExpensesMutation,
  useGetExpensByIdQuery,
  useUpdateExpensesMutation,
} = expensesApi;
