import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import Link from "next/link";
import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useLoginMutation } from "../../features/Auth/authApi.ts";
import { setCredentials } from "../../features/Auth/authSlice.ts";
import Cta from "./Cta";
import Loading from "./Feedback/Loading";
import TextInput from "./Form/TextInput.tsx";

const schema = z.object({
  email: z.string().email({ message: "برجاء إدخال بريد إلكتروني صالح!" }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, {
      message: "لا تقل عن 8 حروف وتحتوي: حرف كبير وصغير-رمز-رقم",
    }),
});

interface Data extends FieldValues {
  email: string;
  password: string;
}

export default function UserSigninForm() {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  const [loginApi, { isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  const onSubmit = async (data: Data) => {
    try {
      const response = await loginApi(data).unwrap();
      dispatch(setCredentials({ user: response.user, token: response.token }));
      Cookie.set("userToken", response.token, { expires: 30 });
      localStorage.setItem("userType", response.user.userType);
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed", err);
      if (error) {
        console.log("Error:", error);
      }
    }
  };

  const header = isSuccess ? (
    <p className="text-lg font-semibold text-success">تم تسجيل الدخول بنجاح</p>
  ) : (
    <p className="hidden text-lg font-semibold text-secondary-light lg:block">
      تسجيل دخول المستخدم
    </p>
  );

  return (
    <FormProvider {...methods}>
      {isError ? (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   @ts-expect-error
        <p className="text-lg font-semibold text-error">{error?.data?.msg}</p>
      ) : (
        header
      )}
      <form
        className="flex w-[90vw] flex-col gap-4 py-8 lg:w-[24rem] lg:py-0"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <TextInput
          name="email"
          type="email"
          labelText="البريد الإلكتروني"
          placeholder="ما هو بريدك الإلكتروني؟"
          error={methods.formState.errors.email?.message}
          register={methods.register("email")}
        />
        <TextInput
          name="password"
          type="password"
          labelText="كلمة السر"
          placeholder="ما هي كلمة السر؟"
          error={methods.formState.errors.password?.message}
          register={methods.register("password")}
        />
        <p className="text-left">
          <Link
            href={"/reset-password"}
            className="text-[0.875rem] text-secondary-normal hover:text-secondary-normal-hover hover:underline"
          >
            نسيت كلمة السر؟
          </Link>
        </p>
        <div className="mt-4">
          {isLoading ? (
            <Loading />
          ) : (
            <Cta
              type="submit"
              onClick={methods.handleSubmit(onSubmit)}
              text="تسجيل الدخول"
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
}
