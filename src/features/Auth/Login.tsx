"use client";

import { useState } from "react";
import Switch from "../../common/utils/Switch.jsx";
import UserSigninForm from "../../common/components/UserSigninForm.tsx";
import LawyerSigninForm from "../../common/components/LawyerSigninForm.tsx";

function Login() {
    const [isActive, setIsActive] = useState<boolean>(true);
    const handleSwitch = (isActive: boolean) => setIsActive(isActive);

  return (
    <main className="container mx-auto flex flex-col gap-10 px-4 lg:px-8">
      <Switch
        active={isActive}
        switchHandler={handleSwitch}
        firstTitle="تسجيل دخول المستخدم"
        secondTitle="تسجيل دخول المحامي"
      />
      <div className="grid items-center justify-center lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center border-secondary-normal lg:gap-12 lg:rounded-r-md lg:border-y-4 lg:border-r-4 lg:bg-background lg:px-28 lg:py-28">
          {isActive ? <UserSigninForm /> : <LawyerSigninForm />}
        </div>
        <div
          style={{ backgroundImage: "url(assets/images/signin-image.png)" }}
          className="hidden h-full w-full rounded-l-md bg-cover lg:block"
        />
      </div>
    </main>
  );
}

export default Login;
