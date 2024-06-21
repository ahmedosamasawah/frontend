"use client";

import Cta from "../../common/components/Cta";
import YellowContainer from "../../common/components/Feedback/YellowContainer";
import TextInput from "../../common/components/Form/TextInput";
import useInput from "../../common/hooks/useInput";
import { EMAIL_REGEX } from "../../constants/regexPatterns";
import { useResetPassRequestMutation } from "./authApi.js";
import Alert from "../../common/components/Feedback/Alert";
import Loading from "../../common/components/Feedback/Loading";
import Image from "next/image";

const ForgetPasswordReq = () => {
  const email = useInput(EMAIL_REGEX, "برجاء إدخال بريد إلكتروني صالح");
  const [resetPassRequest, { isLoading, isSuccess, isError, error }] =
    useResetPassRequestMutation();

  const submitHandler = e => {
    e.preventDefault();

    if (!email.isValid) {
      email.setError("برجاء إدخال بريد إلكتروني صالح!");
    } else resetPassRequest(email.value);
  };

  return (
    <section className="mt-10 p-3">
      {isError && !isLoading && (
        <Alert message={error.data.msg} status="error" />
      )}
      <YellowContainer>
        <div className="md:w-[600px] md:rounded-md md:bg-background md:p-24">
          {!isSuccess && (
            <>
              <article className="mb-6 text-center">
                <h2 className="mb-3 font-medium md:text-1xl">
                  استرداد كلمة السر
                </h2>
                <p className="text-sm font-light md:text-md md:font-extralight">
                  اكتب بريدك الإلكتروني لنرسل لك رابط تتمكن من خلاله تغيير كلمة
                  السر
                </p>
              </article>
              <form onSubmit={submitHandler} className="flex flex-col gap-8">
                <TextInput
                  labelText="البريد الالكتروني"
                  type="email"
                  name="email"
                  value={email.value}
                  error={email.error}
                  changeHandler={e => email.setValue(e.target.value)}
                />
                {isLoading && <Loading size={8} />}
                <div className="text-primary-normal">
                  {!isLoading && <Cta text="التالى" />}
                </div>
              </form>
            </>
          )}

          {isSuccess && (
            <>
              <div className="flex items-center justify-center">
                <Image
                  src="icons/mail.svg"
                  alt="mail image"
                  width={24}
                  height={24}
                  className="mb-6"
                />
              </div>
              <article className="mb-8 text-center">
                <h2 className="mb-4 md:text-1xl">تم إرسال الرابط</h2>
                <p className="text-[14px] md:text-md">
                  لقد قمنا بإرسال رابط إلى بريدك الالكتروني لاسترداد كلمة السر
                </p>
              </article>
              {/* <Cta text="التالى" /> */}
            </>
          )}
        </div>
      </YellowContainer>
    </section>
  );
};
export default ForgetPasswordReq;
