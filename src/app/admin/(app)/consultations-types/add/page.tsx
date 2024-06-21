"use client";
import { useEffect, useState } from "react";
import { useGetAllFilesApiQuery } from "../../../features/filesApi";
import { useCreateAdviceMutation } from "../../../features/advicesApi";
import { useGetAllAdvicesCategoryesApiQuery } from "../../../features/advicesCategoryesApi";
import Loading from "../../../../loading";
import { FormDataType } from "../../../../../types/FormTypes.types";

const AddType = () => {
  const {
    data: filesData,
    error: filesError,
    isLoading: filesLoading,
  } = useGetAllFilesApiQuery(null);
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetAllAdvicesCategoryesApiQuery(null);
  const [createAdvice, { isLoading: isCreating }] = useCreateAdviceMutation();
  // formData
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    categoryId: "",
    price: "",
    description: "",
    image: null,
    requiredFiles: [],
  });
  // log the res
  useEffect(() => {
    if (filesData) {
      console.log("Response Data:", filesData);
    }
    if (filesError) {
      console.log("Error:", filesError);
    }
  }, [filesData, filesError]);

  useEffect(() => {
    if (categoriesData) {
      console.log("Response Data:", categoriesData);
    }
    if (categoriesError) {
      console.log("Error:", categoriesError);
    }
  }, [categoriesData, categoriesError]);
  //input change
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
  //checkbox change
  const handleCheckboxChange = e => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      requiredFiles: checked
        ? [...prevState.requiredFiles, value]
        : prevState.requiredFiles.filter(id => id !== value),
    }));
  };
  //submit fun.
  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", formData.title);
    form.append("categoryId", formData.categoryId || "");
    form.append("price", formData.price);
    form.append("description", formData.description);
    if (formData.image) {
      form.append("image", formData.image);
    }
    formData.requiredFiles.forEach(fileId =>
      form.append("requiredFiles", fileId),
    );

    try {
      await createAdvice(form).unwrap();
      console.log("Advice created successfully");
    } catch (err) {
      console.error("Failed to create the advice:", err);
    }
  };

  if (filesLoading || isCreating || categoriesLoading)
    return (
      <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
        <Loading />
      </div>
    );

  return (
    <div className="mt-[50px] px-4 py-12 md:px-8 lg:mr-[260px] lg:px-16">
      <div className="grid rounded-md bg-[#1d3c58] px-16 py-10 text-white">
        <div className="mb-8 text-[20px]">
          <h1>اضافة نوع الاستشارة</h1>
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
                value={formData.categoryId}
                onChange={handleInputChange}
                className="focus:ring-blue-500 w-full rounded-sm border border-[#436789] bg-[#395875] px-4 py-2 focus:outline-none focus:ring-2"
              >
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
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="اكتب وصف الاستشارة"
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
            <label className="grid gap-2">الملفات المطلوبة</label>
            <div className="grid grid-cols-2 justify-center gap-4">
              {filesData &&
                filesData.files.map(file => (
                  <div key={file._id}>
                    <input
                      type="checkbox"
                      id={file.name}
                      name={file.name}
                      value={file._id}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={file.name}> {file.name} </label>
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[200px] rounded-sm bg-[#e4ac66] px-4 py-2 text-[#092944]"
              >
                اضافة
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddType;
