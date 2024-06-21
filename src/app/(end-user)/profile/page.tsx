"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../common/components/Feedback/Loading";
import { basicInfoSchema } from "../../../common/utils/validationsSchemas";
import { useUpdateUserMutation } from "../../../features/Auth/authApi.ts";
import { setCredentials } from "../../../features/Auth/authSlice.ts";

type UserData = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  nationalId?: string;
};

const UserProfile = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { user: userData } = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      city: "",
      nationalId: "",
    },
  });

  useEffect(() => {
    if (userData) {
      reset(userData.user);
    }
  }, [reset, userData]);

  const handleToggleEdit = () => {
    setEditMode(!editMode);
    clearErrors();
  };

  const dispatch = useDispatch();

  const handleSave = async (data: UserData) => {
    const updatedData = {
      firstName: data.firstName || userData?.user?.firstName,
      lastName: data.lastName || userData?.user?.lastName,
      phone: data.phone || userData?.user?.phone,
      city: data.city || userData?.user?.city,
      nationalId: data.nationalId || userData?.user?.nationalId,
    };

    try {
      const response = await updateUser(updatedData).unwrap();
      alert("تم تحديث بيناتك بنجاح");
      dispatch(setCredentials({ user: response.user }));
      window.location.reload();
    } catch (error) {
      console.error("Failed to update user: ", error);
    }

    handleToggleEdit();
  };

  const photoSrc = "/assets/images/default-avatar.png";

  const isSaveDisabled = () => {
    const watchedValues = watch();
    const hasChanges = Object.keys(watchedValues).some(
      key => watchedValues[key] !== userData?.user?.[key],
    );
    return !hasChanges || !isValid;
  };

  return (
    <div className="container mx-auto flex flex-col gap-10 px-4 text-primary-light lg:px-8">
      {/* Profile Picture Block */}
      <div className="flex flex-col items-center justify-center rounded-md bg-background p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <button
                  className="absolute left-0 top-0 rounded-full bg-input-strock bg-opacity-70 p-2"
                  onClick={() => {
                    // TODO: Implement the image upload logic...
                    const fileInput = document.getElementById("fileInput");
                    if (fileInput) fileInput.click();
                  }}
                >
                  <Image
                    src="/assets/icons/camera.svg"
                    width={20}
                    height={20}
                    alt="Camera Icon"
                  />
                </button>
                <Image
                  width={150}
                  height={150}
                  src={photoSrc}
                  alt="User Photo"
                  className="h-28 w-28 rounded-full object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    if (e.target.files && e.target.files.length > 0) {
                      console.log("File uploaded:", e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  id="fileInput"
                />
              </>
            )}
          </div>
          <p>{isLoading ? "" : userData?.user?.firstName}</p>
        </div>
      </div>

      {/* Basic Info Block */}
      <div className="flex flex-col justify-center gap-8 rounded-md bg-background px-6 py-10 lg:px-16">
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="mb-8 flex justify-between">
            <h3 className="self-center text-[0.65rem] sm:text-md">
              المعلومات الأساسية
            </h3>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            {error && <p className="text-error">{error.data?.msg}</p>}
            {!editMode ? (
              <button
                type="button"
                className="flex items-center justify-center gap-1 px-4 py-2 text-[0.65rem] text-secondary-normal sm:gap-3 sm:text-md"
                onClick={handleToggleEdit}
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="Edit Icon"
                  className="w-3 sm:w-auto"
                  width={12}
                  height={12}
                />
                <p>تعديل</p>
              </button>
            ) : (
              <div className="flex lg:gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-1 px-4 py-2 text-[0.65rem] sm:gap-3 sm:text-md"
                  onClick={handleToggleEdit}
                >
                  <Image
                    src="/assets/icons/cancel.svg"
                    alt="Cancel Icon"
                    className="w-2 sm:w-auto"
                    width={8}
                    height={8}
                  />
                  <p>إلغاء</p>
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center rounded-sm bg-secondary-normal px-2 py-0 text-[0.65rem] text-primary-darker hover:bg-secondary-normal-hover sm:px-4 sm:py-2 sm:text-md"
                  disabled={isSaveDisabled()}
                >
                  حفظ
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <label htmlFor="firstName" className="text-md text-text-light">
                الإسم الأول
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full rounded-sm border-[1.5px] border-input-strock bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4"
                disabled={!editMode}
                placeholder={userData?.user?.firstName ?? ""}
                {...register("firstName")}
              />
              {errors.firstName && (
                <small className="-mt-2 text-sm text-error">
                  {errors.firstName.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="lastName" className="text-md text-text-light">
                الإسم الأخير
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full rounded-sm border-[1.5px] border-input-strock bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4"
                disabled={!editMode}
                placeholder={userData?.user?.lastName ?? ""}
                {...register("lastName")}
              />
              {errors.lastName && (
                <small className="-mt-2 text-sm text-error">
                  {errors.lastName.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="phone" className="text-md text-text-light">
                رقم الهاتف
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full rounded-sm border-[1.5px] border-input-strock bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4"
                disabled={!editMode}
                placeholder={userData?.user?.phone ?? ""}
                {...register("phone")}
              />
              {errors.phone && (
                <small className="-mt-2 text-sm text-error">
                  {errors.phone.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="city" className="text-md text-text-light">
                المدينة
              </label>
              <input
                type="text"
                id="city"
                className="w-full rounded-sm border-[1.5px] border-input-strock bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4"
                disabled={!editMode}
                placeholder={userData?.user?.city ?? ""}
                {...register("city")}
              />
              {errors.city && (
                <small className="-mt-2 text-sm text-error">
                  {errors.city.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="nationalId" className="text-md text-text-light">
                رقم الهوية
              </label>
              <input
                type="text"
                id="nationalId"
                className="w-full rounded-sm border-[1.5px] border-input-strock bg-[#395875] px-4 py-2 text-base text-text-light outline-0 lg:p-4"
                disabled={!editMode}
                placeholder={userData?.user?.nationalId ?? ""}
                {...register("nationalId")}
              />
              {errors.nationalId && (
                <small className="-mt-2 text-sm text-error">
                  {errors.nationalId.message}
                </small>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
