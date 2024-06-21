"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Cta from "../../common/components/Cta.tsx";
import LawyerSignupForm from "../../common/components/LawyerSignupForm.tsx";
import UserSignupForm from "../../common/components/UserSignupForm.tsx";
import Switch from "../../common/utils/Switch.jsx";

function Signup() {
  const [isActive, setIsActive] = useState<boolean>(true);
  const handleSwitch = (isActive: boolean) => setIsActive(isActive);
  const [isSuccessUser, setIsSuccessUser] = useState<boolean>(false);
  const [isSuccessLawyer, setIsSuccessLawyer] = useState<boolean>(false);

  return (
    <main className="container mx-auto flex flex-col gap-10 px-4 lg:px-8">
      <Switch
        active={isActive}
        switchHandler={handleSwitch}
        firstTitle="إنشاء حساب المستخدم"
        secondTitle="إنشاء حساب المحامي"
      />
      <div
        className={`grid ${
          isSuccessUser || isSuccessLawyer ? "md:grid-cols-1" : "lg:grid-cols-2"
        } items-center justify-center md:relative`}
      >
        {isSuccessUser || isSuccessLawyer ? (
          <>
            <Image
              src="/assets/images/signup-success.png"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "44rem" }}
              className="hidden rounded-md object-cover md:block"
              alt="signup-image"
            />
            <div className="flex max-w-[600px] flex-col items-center justify-center gap-8 justify-self-center rounded-md bg-[#334F6980] px-8 py-9 md:absolute md:px-28">
              <Image
                src="/assets/icons/signup-success.svg"
                alt="signup-success"
                width={64}
                height={64}
              />
              <div className="flex flex-col items-center justify-center gap-4 text-text-light">
                <h2>تم إرسال بيناتك بنجاح</h2>
                <p className="font-light">
                  {isSuccessUser
                    ? "شكرا لتقديم بياناتك. لقد قمنا بإرسال كود تفعيل إلى حسابك الالكتروني."
                    : "شكرا لتقديم بياناتك. نحن الآن نراجع طلبك، وسنقوم بإعلامك قريبا بالموافقة. بمجرد الموافقة، ستتمكن من الوصول للوحة التحكم الخاصة بك."}
                </p>
              </div>
              <Link href={"/verify"} className="border-0 hover:border-0">
                <Cta text="تفعيل الحساب" type="button" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-[44rem] flex-col items-center border-secondary-normal lg:rounded-r-md lg:border-y-4 lg:border-r-4 lg:bg-background lg:py-6">
              {isActive ? (
                <UserSignupForm setIsSuccessUser={setIsSuccessUser} />
              ) : (
                <LawyerSignupForm setIsSuccessLawyer={setIsSuccessLawyer} />
              )}
            </div>
            <div
              style={{ backgroundImage: "url(assets/images/signup-image.png)" }}
              className="hidden h-full w-full rounded-l-md bg-cover lg:block"
            />
          </>
        )}
      </div>
    </main>
  );
}

export default Signup;
