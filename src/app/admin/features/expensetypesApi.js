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

export const expensetypesApi = createApi({
  reducerPath: "expensetypesApi",
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
    getAllExpenseTypes: builder.query({
      query: () => "expense-types",
    }),
    //
    deleteExpensesTypes: builder.mutation({
      query: id => ({
        url: `expense-types/${id}`,
        method: "DELETE",
      }),
    }),
    //
    createExpensesTyeps: builder.mutation({
      query: formData => ({
        url: `expense-types`,
        method: "POST",
        body: formData,
      }),
    }),
    //
    getExpensTypesById: builder.query({
      query: id => `expense-types/${id}`,
    }),
    //
    updateExpensesTypes: builder.mutation({
      query: ({ formData, id }) => ({
        url: `expense-types/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetAllExpenseTypesQuery,
  useDeleteExpensesTypesMutation,
  useCreateExpensesTyepsMutation,
  useGetExpensTypesByIdQuery,
  useUpdateExpensesTypesMutation,
} = expensetypesApi;
