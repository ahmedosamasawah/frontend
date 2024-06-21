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

export const filesApi = createApi({
  reducerPath: "filesApi",
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
    getAllFilesApi: builder.query({
      query: () => "filetype",
    }),
    //
  }),
});

export const { useGetAllFilesApiQuery } = filesApi;
