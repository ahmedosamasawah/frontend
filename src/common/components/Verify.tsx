"use client";

import React, { useState, useEffect, useRef } from "react";
import YellowContainer from "../../common/components/Feedback/YellowContainer";
import { useVerifyOtpMutation } from "../../features/Auth/authApi.ts";
import Cta from "./Cta";
import Loading from "./Feedback/Loading";

// TODO: HANDLE RESEND OTP, HANDLE AUTHENTICATE WHEN VERIFIED CORRECTLY, HANDLE THE UX BUGS...
const ForgetPasswordReq = () => {
  const [timer, setTimer] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [showResendButton, setShowResendButton] = useState(false);
  const [verifyOtp, { isLoading, error, isSuccess, isError }] =
    useVerifyOtpMutation();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    setCode(["", "", "", "", "", ""]);
    setTimer(60);
    // TODO: Resend OTP...
    console.log("ResendCode");
  };

  const handleVerify = async () => {
    const otp = code.join("");
    try {
      await verifyOtp({ otp }).unwrap();
      const userType = localStorage.getItem("userType");
      userType === "Client"
        ? (window.location.href = "/")
        : (window.location.href = "/lawyer");
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <section className="mt-10 p-3">
      <YellowContainer>
        <div className="flex flex-col items-center justify-center gap-4 text-primary-dark md:w-[600px] md:rounded-md md:bg-background md:p-24">
          <h2 className="font-medium text-text-light md:text-1xl">
            اكتب الكود
          </h2>
          <div className="flex gap-4" dir="ltr">
            {code.map((digit, index) => (
              <input
                key={index}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleCodeChange(e.target.value, index)}
                className="h-12 w-12 rounded-sm bg-input-bg text-center text-text-light"
              />
            ))}
          </div>
          <div className="mb-4">
            {timer > 0 ? (
              <span className="text-text-light" dir="ltr">{`00 : ${
                timer < 10 ? `0${timer}` : timer
              }`}</span>
            ) : (
              showResendButton && (
                <button
                  onClick={handleResendCode}
                  className="border-b-2 text-md font-normal text-secondary-normal hover:text-secondary-normal-hover"
                >
                  أرسل الكود مرة أخرى
                </button>
              )
            )}
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <Cta text="تفعيل الحساب" type="button" onClick={handleVerify} />
          )}
          {isSuccess && (
            <p className="justify-self-center text-success">
              تم تفعيل الحساب بنجاح
            </p>
          )}
          {isError && (
            <p className="justify-self-center font-light text-error">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/*@ts-expect-error*/}
              {error ? error.data.msg : "فشل تفعيل الحساب، يرجى إعادة المحاولة"}
            </p>
          )}
        </div>
      </YellowContainer>
    </section>
  );
};

export default ForgetPasswordReq;
