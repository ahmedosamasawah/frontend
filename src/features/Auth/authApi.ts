import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";

interface ResetPassRequestBody {
  email: string;
}

interface ResetPasswordRequestBody {
  password: string;
  confirmPassword: string;
  token: string;
}

interface SignupRequestBody {
  firstName: string;
  lastName: string;
  nationalId: string;
  city: string;
  phone: string;
  email: string;
  password: string;
  specialization: { value: string; label: string };
  nationalIdImage: string;
  certificate: string;
  lawLicense: string;
  slotsConfirmed: boolean;
  uploadedFileNames: {
    nationalIdImage: string;
    certificate: string;
    lawLicense: string;
  };
  selectedOptions: {
    specialization: string | null;
  };
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface UpdateUserRequestBody {
  email?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  phone?: string;
  nationalId?: string;
  userType?: string;
}

interface VerifyOtpRequestBody {
  email: string;
  otp: string;
}

interface User {
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  phone: string;
  nationalId: string;
  userType: string;
}

interface Specialization {
  id: string;
  name: string;
  imageUrl: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api/v1/",
    prepareHeaders: headers => {
      const token = Cookie.get("userToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    resetPassRequest: builder.mutation<void, ResetPassRequestBody>({
      query: email => ({
        url: "auth/lawyers/send-reset-link",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequestBody>({
      query: body => ({
        url: "auth/lawyers/reset-password",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation<void, SignupRequestBody>({
      query: body => ({
        url: "auth/signup",
        method: "POST",
        body,
        formData: true,
      }),
    }),
    login: builder.mutation<{ token: string }, LoginRequestBody>({
      query: credentials => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    updateUser: builder.mutation<void, UpdateUserRequestBody>({
      query: body => ({
        url: "auth",
        method: "PATCH",
        body,
      }),
    }),
    verifyOtp: builder.mutation<void, VerifyOtpRequestBody>({
      query: credentials => ({
        url: "auth/verify-otp",
        method: "POST",
        body: credentials,
      }),
    }),
    fetchSpecializations: builder.query<Specialization[], void>({
      query: () => "advice/categories",
    }),
    fetchUser: builder.query<User, void>({
      query: () => "auth/current-user",
    }),
  }),
});

export const {
  useResetPassRequestMutation,
  useResetPasswordMutation,
  useSignupMutation,
  useLoginMutation,
  useFetchUserQuery,
  useFetchSpecializationsQuery,
  useUpdateUserMutation,
  useVerifyOtpMutation,
} = authApi;
