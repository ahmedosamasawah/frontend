"use client";

import Cookie from "js-cookie";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../common/components/Footer";
import Nav from "../../common/components/Nav/Nav";
import { useFetchUserQuery } from "../../features/Auth/authApi.ts";
import { setCredentials } from "../../features/Auth/authSlice.ts";

export default function EndUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const token = Cookie.get("userToken");
  const { data: user } = useFetchUserQuery(undefined, { skip: !token });

  useEffect(() => {
    if (token && user) {
      dispatch(setCredentials({ user, token }));
    }
  }, [token, user, dispatch]);

  return (
    <>
      <Nav />
      <main className={pathname !== "/" ? "pb-32 pt-12" : ""}>{children}</main>
      <Footer />
    </>
  );
}
