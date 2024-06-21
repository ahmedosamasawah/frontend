"use client";
import {
  useGetAdviceByIdQuery,
  useUpdateAdviceMutation,
} from "../../../../features/advicesApi";
import { useGetAllFilesApiQuery } from "../../../../features/filesApi";
import { useGetAllAdvicesCategoryesApiQuery } from "../../../../features/advicesCategoryesApi";
import Loading from "../../../../../loading";
import { useEffect, useState } from "react";
import { FormDataType } from "../../../../../../types/FormTypes.types";

const EditType = ({ params }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { data, error, isLoading } = useGetAdviceByIdQuery(
    params.consultationId,
  );
  const { data: filesData, isLoading: filesLoading } =
    useGetAllFilesApiQuery(null);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllAdvicesCategoryesApiQuery(null);
  const [updateAdvice, { isLoading: isUpdating }] = useUpdateAdviceMutation();

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
    requiredFiles: [],
  });
  //selection change
  const handleChange = event => {
    const value = event.target.value;
    setSelectedOption(value);
    setFormData(prevState => ({
      ...prevState,
      categoryId: value,
    }));
  };
  //input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //checkbox change
  const handleCheckboxChange = e => {
    const { value, checked } = e.target;
    setFormData(prevState => {
      const updatedRequiredFiles = checked
        ? [...prevState.requiredFiles, value]
        : prevState.requiredFiles.filter(fileId => fileId !== value);
      return {
        ...prevState,
        requiredFiles: updatedRequiredFiles,
      };
    });
  };
  //image change
  const handleFileChange = e => {
    const { files } = e.target;
    setFormData({
      ...formData,
      image: files[0],
    });
  };
  //Submit
  const handleSubmit = async e => {
    e.preventDefault();
    const id = params.consultationId;
    const filteredFiles = formData.requiredFiles.filter(
      file => typeof file === "string",
    );

    const form = new FormData();
    form.append("title", formData.title);
    form.append("categoryId", formData.categoryId || "");
    form.append("price", formData.price);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }
    filteredFiles.forEach(file => form.append("requiredFiles", file));

    await updateAdvice({ formData: form, id });
  };
  //fill form
  useEffect(() => {
    if (data) {
      const requiredFileIds = data.advice.requiredFiles.map(file => file._id);
      setFormData({
        title: data.advice.title,
        price: data.advice.price,
        description: data.advice.description,
        image: null,
        requiredFiles: requiredFileIds,
      });
      setSelectedOption(data.advice.categoryId || "");
    }
    if (error) {
      console.error("Error:", error);
    }
  }, [data, error]);

  if (isLoading || filesLoading || categoriesLoading || isUpdating) {
    return (
      <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
      <div className="grid rounded-md bg-[#1d3c58] px-16 py-10 text-white">
        <div className="mb-8 text-[20px]">
          <h1>تعديل نوع الاستشارة</h1>
        </div>
        <div>
          <form className="grid gap-[16px]" onSubmit={handleSubmit}>
            <label className="grid gap-2" htmlFor="title">
              نوع/اسم الاستشارة
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="بيع أملاك"
                className="rounded-sm bg-[#395875] px-[16px] py-[8px] outline-none"
              />
            </label>
            <label className="grid gap-2">
              قسم الاستشارة
              <select
                name="categoryId"
                id="categoryId"
                value={selectedOption}
                onChange={handleChange}
                className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
              >
                <option value="اختر قسم">اختر قسم</option>
                {categoriesData &&
                  categoriesData.categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="grid gap-2" htmlFor="price">
              السعر
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="1000"
                className="rounded-sm bg-[#395875] px-[16px] py-[8px] outline-none"
              />
            </label>
            <label className="grid gap-2" htmlFor="description">
              وصف الاستشارة
              <textarea
                name="description"
                placeholder="اكتب وصف الاستشارة"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
              ></textarea>
            </label>
            <label className="grid gap-2">
              إضافة صورة/أيقون/رمز تعبيري
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
              />
            </label>
            <label className="mt-3 grid gap-2">الملفات المطلوبة</label>
            <div className="grid grid-cols-2 justify-center gap-4">
              {filesData &&
                filesData.files.map(file => (
                  <div key={file._id}>
                    <input
                      type="checkbox"
                      id={file.name}
                      name={file.name}
                      value={file._id}
                      checked={formData.requiredFiles.includes(file._id)}
                      onChange={handleCheckboxChange}
                      className="ml-2"
                    />
                    <label htmlFor={file.name}>{file.name}</label>
                  </div>
                ))}
            </div>
            <div className="mt-3 flex justify-between gap-5">
              <button
                type="submit"
                className="w-full rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
              >
                تحديث
              </button>
              <button
                type="button"
                className="w-full rounded-sm border border-[#e4ac66] px-4 py-2 text-[#e4ac66]"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditType;
