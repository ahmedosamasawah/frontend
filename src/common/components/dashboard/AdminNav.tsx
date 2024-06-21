"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/admin/GlobalRedux/store";

const AdminNavBar = () => {
  const user = useSelector((state: RootState) => state.user);
  const pathname = usePathname();

  const [isOpenn, setIsOpenn] = useState(true);
  const toggleNavbarn = () => {
    setIsOpenn(!isOpenn);
  };
  const [isOpen2, setIsOpen2] = useState(false);
  const toggleNavbar2 = () => {
    setIsOpen2(!isOpen2);
  };
  const [isOpen3, setIsOpen3] = useState(false);
  const toggleNavbar3 = () => {
    setIsOpen3(!isOpen3);
  };
  const [isOpen4, setIsOpen4] = useState(false);
  const toggleNavbar4 = () => {
    setIsOpen4(!isOpen4);
  };
  const [isOpen5, setIsOpen5] = useState(false);
  const toggleNavbar5 = () => {
    setIsOpen5(!isOpen5);
  };
  const [isOpenc1, setIsOpenc1] = useState(false);
  const toggleNavbarc1 = () => {
    setIsOpenc1(!isOpenc1);
  };
  const isActive = (href: string) => {
    return pathname === href;
  };
  return (
    <div className="">
      <nav className="fixed top-0 z-20 w-full bg-[#1d3c58]">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rounded-md bg-primary-normal-hover rtl:justify-end">
              <button
                onClick={toggleNavbarn}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="text-gray-500 inline-flex items-center p-1 text-sm lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                {isOpenn ? (
                  <Image
                    loading="eager"
                    width={40}
                    height={40}
                    src="/assets/icons/open-arrow.svg"
                    alt="open"
                  />
                ) : (
                  <Image
                    loading="eager"
                    width={40}
                    height={40}
                    src="/assets/icons/close-arrow.svg"
                    alt="close"
                  />
                )}
              </button>
            </div>
            <div className="flex items-center">
              <div className="rounded-xl ms-3 flex items-center justify-between">
                <div className="bottom-6.5 absolute right-[80px] lg:right-[280px]">
                  <div
                    className="bg-gray-800 flex rounded-full text-sm"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-10 w-10 rounded-full"
                      loading="eager"
                      width={93}
                      height={96}
                      src="/assets/images/muslim.png"
                      alt="user photo"
                    />
                    <div className="mr-3 grid">
                      <p className="text-[14px] font-light text-primary-light-active lg:text-[16px]">
                        مرحبا بك
                      </p>
                      <p className="text-[13px] text-white lg:text-[15px]">
                        {user.name}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-2 flex justify-center gap-3 text-center">
                  <button className="grid cursor-pointer items-center justify-center text-center">
                    <div className="flex w-full cursor-pointer justify-center">
                      <div className="flex h-[42px] w-[42px] justify-center rounded-full bg-primary-dark p-2 text-center lg:h-[46px] lg:w-[46px]">
                        <div className="flex items-center">
                          <Image
                            loading="eager"
                            width={96}
                            height={96}
                            src="/assets/icons/bell.svg"
                            alt="bell"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid cursor-pointer text-center">
                      <p className="text-[12px] text-primary-light-active lg:text-[14px]">
                        الاشعارات
                      </p>
                    </div>
                  </button>
                  <button className="grid cursor-pointer items-center justify-center text-center">
                    <div className="flex w-full cursor-pointer justify-center">
                      <div className="flex h-[42px] w-[42px] justify-center rounded-full bg-primary-dark p-2 text-center lg:h-[46px] lg:w-[46px]">
                        <div className="flex items-center">
                          <Image
                            className=""
                            loading="eager"
                            width={300}
                            height={300}
                            src="/assets/icons/message.svg"
                            alt="message"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid text-center">
                      <p className="text-[12px] text-primary-light-active lg:text-[14px]">
                        التواصل
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed right-0 top-0 z-10 h-screen w-64 pt-20 text-start transition-transform ${
          isOpenn ? "translate-x-full" : "translate-x-0"
        } bg-[#1d3c58] lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="mt-6 h-full overflow-y-auto pb-4 font-extralight">
          <div className="flex w-[335px] justify-center">
            <Link href="/admin" className="ms-2 flex md:me-24">
              <Image
                loading="eager"
                width={96}
                height={96}
                src="/assets/images/logo.png"
                className="me-5 h-[100px]"
                alt="Logo"
              />
            </Link>
          </div>
          <ul className=" ">
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  الرئيسية
                </span>
              </Link>
            </li>
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin/case"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin/case")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  القضايا
                </span>
              </Link>
            </li>
            <li className="border-b border-[#2b4a66] text-white">
              <button
                onClick={toggleNavbar2}
                type="button"
                className="rounded-lg hover:bg-gray-100 group flex w-full items-center p-2 py-3 text-base text-white transition duration-75"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  الاستشارات
                </span>
                <Image
                  className=""
                  loading="eager"
                  width={30}
                  height={30}
                  src="/assets/icons/down-arrow.svg"
                  alt="down"
                />
              </button>
              {isOpen2 && (
                <ul
                  id="dropdown-example"
                  className="mr-6 space-y-2 border-r border-white py-2 pl-2 text-[16px] font-light"
                >
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>
                    <Link
                      href="/admin/inquiries"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/inquiries")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      طلبات الاستشارة
                    </Link>
                  </li>
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>
                    <Link
                      href="/admin/departments"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/departments")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      أقسام الاستشارة
                    </Link>
                  </li>
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>
                    <Link
                      href="/admin/consultations-types"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/consultations-types")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      أنواع الاستشارة
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="border-b border-[#2b4a66]">
              <button
                onClick={toggleNavbar5}
                type="button"
                className="rounded-lg hover:bg-gray-100 group flex w-full items-center p-2 py-3 text-base text-white transition duration-75"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  المصاريف
                </span>
                <Image
                  className=""
                  loading="eager"
                  width={30}
                  height={30}
                  src="/assets/icons/down-arrow.svg"
                  alt="down"
                />
              </button>
              {isOpen5 && (
                <ul
                  id="dropdown-example"
                  className="mr-6 space-y-2 border-r border-white py-2 pl-2 text-[16px] font-light"
                >
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>

                    <Link
                      href="/admin/sending"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/sending")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      المصاريف
                    </Link>
                  </li>
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>

                    <Link
                      href="/admin/sending-types"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/sending-types")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      {" "}
                      انواع المصاريف
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="border-b border-[#2b4a66] text-white">
              <button
                onClick={toggleNavbar3}
                type="button"
                className="rounded-lg hover:bg-gray-100 group flex w-full items-center p-2 py-3 text-base text-white transition duration-75"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  المستخدمين
                </span>
                <Image
                  className=""
                  loading="eager"
                  width={30}
                  height={30}
                  src="/assets/icons/down-arrow.svg"
                  alt="down"
                />
              </button>
              {isOpen3 && (
                <ul
                  id="dropdown-example"
                  className="mr-6 space-y-2 border-r border-white py-2 pl-2 text-[16px] font-light"
                >
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>

                    <Link
                      href="/admin/customers"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/customers")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } text-gray-300 hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      العملاء
                    </Link>
                  </li>
                  <li className={"grid items-center gap-2"}>
                    <span
                      className={"h-[1px] w-4 translate-y-[35px] bg-white"}
                    ></span>
                    <button
                      onClick={toggleNavbarc1}
                      className="flex w-full items-center rounded-sm px-2 py-3 transition duration-75"
                    >
                      <span className="ms-3 flex-1 -translate-x-[10px] whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                        المحاميين
                      </span>
                      <Image
                        className=""
                        loading="eager"
                        width={30}
                        height={30}
                        src="/assets/icons/down-arrow.svg"
                        alt="down"
                      />
                    </button>
                    {isOpenc1 && (
                      <ul
                        id="dropdown-example"
                        className="mr-6 space-y-2 border-r border-white py-2 pl-2 text-[16px] font-light"
                      >
                        <li className={"flex items-center gap-2"}>
                          <span className={"h-[1px] w-4 bg-white"}></span>
                          <Link
                            href="/admin/lawyers-orders"
                            className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                              isActive("/admin/lawyers-orders")
                                ? "bg-primary-normal-hover text-[#e4ac66]"
                                : "text-white"
                            } text-gray-300 hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                          >
                            طلبات المحامين
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              )}
            </li>
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin/messages"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin/messages")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  المراسلات
                </span>
              </Link>
            </li>
            <li className="border-b border-[#2b4a66] text-white">
              <button
                onClick={toggleNavbar4}
                type="button"
                className="rounded-lg hover:bg-gray-100 group flex w-full items-center p-2 py-3 text-base text-white transition duration-75"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  الموظفين
                </span>
                <Image
                  className=""
                  loading="eager"
                  width={30}
                  height={30}
                  src="/assets/icons/down-arrow.svg"
                  alt="down"
                />
              </button>
              {isOpen4 && (
                <ul
                  id="dropdown-example"
                  className="mr-6 space-y-2 border-r border-white py-2 pl-2 text-[16px] font-light"
                >
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>

                    <Link
                      href="/admin/managers"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/managers")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      الإداريين
                    </Link>
                  </li>
                  <li className={"flex items-center gap-2"}>
                    <span className={"h-[1px] w-4 bg-white"}></span>

                    <Link
                      href="/admin/lawyers"
                      className={`flex w-full items-center rounded-sm px-3 py-3 transition duration-75 ${
                        isActive("/admin/lawyers")
                          ? "bg-primary-normal-hover text-[#e4ac66]"
                          : "text-white"
                      } text-gray-300 hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                    >
                      المحامين
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin/profits"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin/profits")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  طلبات سحب الأرباح
                </span>
              </Link>
            </li>
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin/settings"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin/settings")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  الإعدادات
                </span>
              </Link>
            </li>
            <li className="border-b border-[#2b4a66]">
              <Link
                href="/admin/profile"
                type="button"
                className={`flex w-full items-center p-2 py-3 text-base transition duration-75 ${
                  isActive("/admin/profile")
                    ? "bg-primary-normal-hover text-[#e4ac66]"
                    : "text-white"
                } hover:bg-primary-normal-hover hover:text-[#e4ac66]`}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <span className="ms-3 flex-1 whitespace-nowrap text-left text-[16px] font-light rtl:text-right">
                  الملف الشخصي
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminNavBar;
