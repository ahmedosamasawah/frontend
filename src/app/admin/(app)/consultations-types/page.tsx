"use client";
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useGetAllAdvicesQuery,
  useDeleteAdviceMutation,
} from "../../features/advicesApi";
import Loading from "../../../loading";

const ConsultationsTypes = () => {
  const [openedIndex, setOpenedIndex] = useState(null);
  const { data, error, isLoading, refetch } = useGetAllAdvicesQuery(null);
  const [deleteAdvice] = useDeleteAdviceMutation();

  const toggleNavbardots = index => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  useEffect(() => {
    if (data) {
      console.log("Response Data:", data);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, error]);

  const handleDelete = async id => {
    try {
      await deleteAdvice(id).unwrap();
      console.log(`Advice with ID ${id} deleted successfully`);
      refetch();
    } catch (err) {
      console.error("Failed to delete the advice: ", err);
    }
  };

  if (isLoading)
    return (
      <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
        <Loading />
      </div>
    );

  return (
    <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
      <div className="grid gap-6">
        <div className="flex items-center justify-between p-5 max-[659px]:grid max-[659px]:justify-center max-[659px]:gap-7 max-[542px]:text-center">
          <div className="flex justify-center max-[542px]:text-center">
            <p className="text-[18px] text-white">انواع الاستشارة</p>
          </div>
          <div className="flex items-center gap-3 max-[659px]:grid">
            <button className="flex items-center gap-1 text-[16px] text-secondary-normal underline underline-offset-4">
              <Image
                width={30}
                height={30}
                src="/assets/icons/download.svg"
                alt="download"
              />
              تحميل البيانات كملف
            </button>
            <Link
              href="/admin/consultations-types/add"
              className="rounded-sm bg-secondary-normal px-8 py-2 text-[16px]"
            >
              إضافة نوع +
            </Link>
          </div>
        </div>
        <div className="flex h-full justify-center overflow-x-auto">
          <div className="-m-1.5 h-full w-full overflow-x-auto">
            <div className="inline-block h-full w-full p-1.5 align-middle">
              <div className="h-full w-full rounded-md bg-[#1d3c58] py-3">
                <div className="flex w-full justify-between px-4 py-3 pl-8">
                  <div className="relative max-w-xs">
                    <label className="sr-only">Search</label>
                    <input
                      type="text"
                      name="hs-table-with-pagination-search"
                      id="hs-table-with-pagination-search"
                      className="border-gray-200 rounded-lg block w-full bg-[#1d3c58] px-3 py-2 ps-9 text-[15px] text-white outline-none focus:z-10 disabled:pointer-events-none disabled:opacity-50"
                      placeholder="ابحث : اسم الاستشارة"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-between ps-3">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                        <svg
                          className="size-4 text-primary-light-active"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.3-4.3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl grid w-full">
                  <div className="sm:rounded-lg relative overflow-auto">
                    <table className="w-full overflow-x-auto text-left rtl:text-right">
                      <thead className="bg-[#436789] uppercase text-white">
                        <tr>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            اسم الاستشارة
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            القسم
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            السعر
                          </th>
                          <th
                            scope="col"
                            className="flex justify-end whitespace-nowrap px-6 py-3"
                          >
                            <button>
                              <Image
                                width={30}
                                height={30}
                                src="/assets/icons/dots.svg"
                                alt="dots"
                              />
                            </button>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.advices.map((advice, index) => (
                          <tr
                            key={advice._id}
                            className="bg-[#1d3c58] text-white"
                          >
                            <th
                              scope="row"
                              className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium"
                            >
                              {advice.title}
                            </th>
                            <td className="whitespace-nowrap px-6 py-4">
                              {advice.categoryId?.name ?? advice.categoryName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {advice.price}
                            </td>
                            <td className="flex justify-end whitespace-nowrap px-6 py-4">
                              <button onClick={() => toggleNavbardots(index)}>
                                <Image
                                  width={30}
                                  height={30}
                                  src="/assets/icons/dots.svg"
                                  alt="dots"
                                />
                              </button>
                              {openedIndex === index && (
                                <div
                                  id="dropdownAction"
                                  className="fixed left-[120px] z-10 grid w-[196px] gap-2 rounded-sm border-2 border-[#436789] bg-[#082a48] p-4 text-white shadow"
                                >
                                  <ul className="whitespace-nowrap rounded-t-sm bg-[#082a48] py-1 text-sm hover:bg-[#1d3c58] hover:text-[#e4ac66]">
                                    <li>
                                      <button
                                        onClick={() => handleDelete(advice._id)}
                                        className="block w-full px-4 py-2 text-right"
                                      >
                                        حذف
                                      </button>
                                    </li>
                                  </ul>
                                  <ul className="whitespace-nowrap rounded-t-sm bg-[#082a48] py-1 text-sm hover:bg-[#1d3c58] hover:text-[#e4ac66]">
                                    <li>
                                      <Link
                                        href={`/admin/consultations-types/edit/${advice._id}`}
                                        className="block px-4 py-2"
                                      >
                                        تعديل
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationsTypes;
