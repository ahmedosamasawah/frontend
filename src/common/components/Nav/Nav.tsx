"use client";

import Cookie from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../../features/Auth/authSlice.ts";

type Props = {
  notification?: boolean;
};

const Nav = ({ notification }: Props) => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const isAuthenticated = useSelector(state => state?.auth.token);
  const dispatch = useDispatch();
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [activePath, setActivePath] = useState<string | null>("/");
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinksArr = [
    { href: "/", label: "الرئيسية" },
    { href: "/#about-us", label: "من نحن" },
    { href: "/services", label: "الخدمات" },
    { href: "/join-us", label: "إنضم إلينا كمحامي" },
    { href: "/#contact-us", label: "تواصل معنا" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onHandleLinkClick = (path: string) => {
    setActivePath(path);
    setIsNavExpanded(false);
  };

  const handleLogout = () => {
    dispatch(clearCredentials());
    Cookie.remove("userToken");
    localStorage.removeItem("userType");
    window.location.reload();
  };

  const navLinks = navLinksArr.map(item => (
    <li
      key={item.label}
      className={`flex items-center justify-center px-1 transition max-[768px]:w-full max-[768px]:text-lg`}
    >
      <Link
        className={`cursor-pointer border-b-2 py-1 hover:text-secondary-normal ${
          activePath === item.href
            ? "border-secondary-normal"
            : "border-transparent"
        } ${activePath === item.href ? "text-secondary-normal" : ""}`}
        href={item.href}
        onClick={() => onHandleLinkClick(item.href)}
      >
        {item.label}
      </Link>
    </li>
  ));

  const defaultLinksBtn = (
    <div className="flex items-center gap-1 max-[768px]:hidden md:gap-3 lg:gap-6">
      <Link
        className="btn--outlined rounded-sm border-2 px-6 py-2 text-center text-base md:text-[12px] lg:px-7 lg:py-2.5 lg:text-[14px] xl:text-lg"
        href={"/signup"}
      >
        إنشاء حساب
      </Link>
      <Link
        className="btn--filled rounded-sm border-2 px-5 py-2 text-center text-base md:text-[12px] lg:px-6 lg:py-2.5 lg:text-[14px] xl:text-lg"
        href={"/login"}
      >
        تسجيل الدخول
      </Link>
    </div>
  );

  const userLinksBtn = (
    <div className="flex items-center gap-6">
      <div className="flex items-center justify-center gap-4 max-[768px]:gap-6">
        {/* Note: NOTIFICATION will be a separate Component made by SocketIO */}
        <Link
          className="flex cursor-pointer items-start"
          href={"/notifications"}
        >
          <Image
            width={35}
            height={35}
            src="/assets/icons/notification.svg"
            alt="notification icon"
          />
          {notification && (
            <div className="absolute h-2 w-2 rounded-full bg-[#10B981]" />
          )}
        </Link>

        <Link className="cursor-pointer" href={"/profile"}>
          <Image
            src="/assets/icons/user.svg"
            width={35}
            height={35}
            alt="user profile icon"
          />
        </Link>
      </div>
      <Link
        className="rounded-sm border-2 border-secondary-normal bg-secondary-normal px-5 py-2 text-center text-base hover:bg-secondary-normal-hover max-[768px]:hidden lg:px-6 lg:py-2.5 lg:text-md"
        href={"/request-service"}
      >
        اطلب استشارة
      </Link>
      <button onClick={handleLogout} type="button" className="cursor-pointer">
        <Image
          src="/assets/images/logout.png"
          width={35}
          height={35}
          alt="Logoout icon"
        />
      </button>
    </div>
  );

  return (
    <header
      className={`${
        pathname === "/" ? "fixed" : "sticky"
      } inset-x-0 top-0 z-20 transition-all duration-300 ${
        isScrolled || pathname !== "/" ? "bg-primary-normal" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Image
          src="/assets/images/logo.png"
          alt="Taqade Logo"
          className="md:h-10 md:w-10"
          width={56}
          height={56}
        />

        <ul className="flex items-center justify-center gap-3 text-primary-light max-[768px]:hidden md:text-[12px] lg:gap-8 lg:text-[14px] xl:text-lg">
          {navLinks}
        </ul>

        {!isAuthenticated ? defaultLinksBtn : userLinksBtn}

        <button
          type="button"
          className="cursor-pointer text-primary-light min-[769px]:hidden"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          <Image
            src="/assets/icons/menu.svg"
            width={45}
            height={45}
            alt="menu burger icon"
          />
        </button>

        {isNavExpanded && (
          <MobileNav
            isNavExpanded
            navLinks={navLinks}
            isAuthenticated={isAuthenticated}
            setIsNavExpanded={setIsNavExpanded}
          />
        )}
      </nav>
    </header>
  );
};

export default Nav;
