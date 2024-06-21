"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "../../../../common/components/model";
import {
  useGetAllAdvicesCategoryesApiQuery,
  useCreateAdviceCategoryeMutation,
  useUpdateAdviceCategoryeMutation,
  useDeleteAdviceCategoryeMutation,
} from "../../features/advicesCategoryesApi";
import Loading from "../../../loading";

const Departments = () => {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
    refetch,
  } = useGetAllAdvicesCategoryesApiQuery(null);
  const [createAdviceCategory, { isLoading: isCreating }] =
    useCreateAdviceCategoryeMutation();
  const [updateAdviceCategory] = useUpdateAdviceCategoryeMutation();
  const [deleteAdviceCategorye] = useDeleteAdviceCategoryeMutation();
  const [openedIndex, setOpenedIndex] = useState(null);
  const toggleNavbardots = index => {
    setOpenedIndex(openedIndex === index ? null : index);
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  //fill the fields
  const handleOpenModal2 = category => {
    setEditCategoryData({
      id: category._id,
      name: category.name,
      image: null,
    });
    setModalOpen2(true);
  };
  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    image: null,
  });
  //Delete fun.
  const handleDelete = async id => {
    try {
      await deleteAdviceCategorye(id).unwrap();
      console.log(`Advice with ID ${id} deleted successfully`);
      refetch();
    } catch (err) {
      console.error("Failed to delete the advice: ", err);
    }
  };
  const [editCategoryData, setEditCategoryData] = useState({
    id: "",
    name: "",
    image: null,
  });
  //input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewCategoryData({
      ...newCategoryData,
      [name]: value,
    });
  };
  const handleEditInputChange = e => {
    const { name, value } = e.target;
    setEditCategoryData({
      ...editCategoryData,
      [name]: value,
    });
  };
  //image change
  const handleFileChange = e => {
    setNewCategoryData({
      ...newCategoryData,
      image: e.target.files[0],
    });
  };
  const handleEditFileChange = e => {
    setEditCategoryData({
      ...editCategoryData,
      image: e.target.files[0],
    });
  };
  //ADD fun.
  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newCategoryData.name);
    if (newCategoryData.image) {
      formData.append("image", newCategoryData.image);
    }

    try {
      await createAdviceCategory(formData);
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };
  //update fun.
  const handleEditSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", editCategoryData.name);
    if (editCategoryData.image) {
      formData.append("image", editCategoryData.image);
    }

    try {
      await updateAdviceCategory({
        id: editCategoryData.id,
        formData: formData,
      });
      refetch();
      handleCloseModal2();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };
  //log
  useEffect(() => {
    if (categoriesData) {
      console.log("Response Data:", categoriesData);
    }
    if (categoriesError) {
      console.log("Error:", categoriesError);
    }
  }, [categoriesData, categoriesError]);

  if (categoriesLoading || isCreating)
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
            <p className="text-[18px] text-white">أقسام الاستشارة</p>
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
            <button
              onClick={handleOpenModal}
              className="rounded-sm bg-secondary-normal px-8 py-2 text-[16px]"
            >
              إضافة قسم +
            </button>
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
                            الرقم التسلسلي
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            اسم القسم
                          </th>
                          <th
                            scope="col"
                            className="whitespace-nowrap px-6 py-3"
                          >
                            الرمز التعبيري
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
                        {categoriesData.categories.map((category, index) => (
                          <tr
                            key={category._id}
                            className="bg-[#1d3c58] text-white"
                          >
                            <th
                              scope="row"
                              className="text-gray-900 whitespace-nowrap px-6 py-4 font-medium"
                            >
                              {index + 1}
                            </th>
                            <td className="whitespace-nowrap px-6 py-4">
                              {category.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Image
                                width={30}
                                height={30}
                                src={category.imageUrl}
                                alt="image"
                              />
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
                                        onClick={() =>
                                          handleDelete(category._id)
                                        }
                                        className="block px-4 py-2"
                                      >
                                        حذف قسم الاستشارة
                                      </button>
                                    </li>
                                  </ul>
                                  <ul className="whitespace-nowrap rounded-t-sm bg-[#082a48] py-1 text-sm hover:bg-[#1d3c58] hover:text-[#e4ac66]">
                                    <li>
                                      <button
                                        onClick={() =>
                                          handleOpenModal2(category)
                                        }
                                        className="block px-4 py-2"
                                      >
                                        تعديل قسم الاستشارة
                                      </button>
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <h1 className="mb-4 text-2xl font-light">إضافة قسم الاستشارة</h1>
          <h2 className="mb-4 text-xl font-light">اسم القسم</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="text"
              name="name"
              placeholder="قانوني"
              value={newCategoryData.name}
              onChange={handleInputChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <h2 className="mb-4 text-xl font-light">
            إضافة صورة/أيقون/رمز تعبيري
          </h2>
          <div className="mb-4 rounded-sm">
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
            >
              اضافة
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-[200px] rounded-sm border border-[#e4ac66] px-4 py-2 text-[#e4ac66]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={handleCloseModal2}>
        <form onSubmit={handleEditSubmit}>
          <h1 className="mb-4 text-2xl font-light">تعديل قسم الاستشارة</h1>
          <h2 className="mb-4 text-xl font-light">اسم القسم</h2>
          <div className="mb-4 rounded-sm">
            <input
              type="text"
              name="name"
              value={editCategoryData.name}
              onChange={handleEditInputChange}
              placeholder="قانوني"
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <h2 className="mb-4 text-xl font-light">
            إضافة صورة/أيقون/رمز تعبيري
          </h2>
          <div className="mb-4 rounded-sm">
            <input
              type="file"
              name="image"
              onChange={handleEditFileChange}
              className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
            >
              تعديل
            </button>
            <button
              type="button"
              onClick={handleCloseModal2}
              className="w-[200px] rounded-sm border border-[#e4ac66] px-4 py-2 text-[#e4ac66]"
            >
              إلغاء
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Departments;
