"use client";
import Link from "next/link";
import { useState } from "react";
import { useLoginDashboardMutation } from "../../../features/dashboarAuthApi";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/userSlice";
import Cookie from "js-cookie";

const LoginDashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDashboard, { isLoading, error }] = useLoginDashboardMutation();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const result = await loginDashboard({ email, password }).unwrap();
      console.log("Login success:", result);
      dispatch(setUser({ name: result.user.name, email: result.user.email }));
      const token = result.token;
      Cookie.set("token", token);
      router.replace("/admin");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="h-screen w-screen bg-[url('/assets/images/loginBGpng.png')] bg-cover bg-fixed bg-right">
      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-6 grid justify-center rounded-md bg-[#324557d5] px-[44px] py-[96px] md:px-[84px] md:py-[96px] lg:px-[104px] lg:py-[96px]">
          <div className="mb-10 text-center text-white">
            <h1 className="text-[20px]">تسجيل الدخول</h1>
          </div>
          <div className="text-white">
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <label className="grid gap-2" htmlFor="email">
                البريد الالكتروني
                <input
                  type="email"
                  id="email"
                  className="rounded-sm bg-[#395875] px-8 py-2 text-white outline-none"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="grid gap-2" htmlFor="password">
                كلمة السر
                <input
                  type="password"
                  id="password"
                  className="rounded-sm bg-[#395875] px-8 py-2 text-white outline-none"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </label>
              <Link
                href="/admin/login"
                className="text-left text-[14px] text-[#e4ac66]"
              >
                نسيت كلمة السر؟
              </Link>
              <button
                type="submit"
                className="rounded-sm bg-[#e4ac66] px-8 py-2 text-[#092944]"
                disabled={isLoading}
              >
                {isLoading ? "جارٍ تسجيل الدخول..." : "سجل الدخول"}
              </button>
              {error && (
                <p className="text-[#e81123]">
                  خطأ في تسجيل الدخول. حاول مرة اخرى.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboardPage;
