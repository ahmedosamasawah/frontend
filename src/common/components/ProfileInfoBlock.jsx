import ProfileInputField from "./ProfileInputField";
import Image from "next/image";

const testUser = {
  firstName: "راشد بن عبدالله",
  lastName: "النوفلي",
  country: "السعودية",
  userId: "1328455521",
  userPhone: "05005200",
  email: "rashed@test.com",
};

const ProfileInfoBlock = ({
  type,
  fields,
  editState,
  onToggleEdit,
  onSave,
  initialValues,
}) => {
  let fieldDefinitions = [];
  let title = "";

  switch (type) {
    case "basic":
      title = "المعلومات الأساسية";
      fieldDefinitions = [
        {
          id: "firstName",
          label: "الإسم الأول",
          placeholder: testUser.firstName,
          ...fields.firstName,
        },
        {
          id: "lastName",
          label: "الإسم الأخير",
          placeholder: testUser.lastName,
          ...fields.lastName,
        },
        {
          id: "country",
          label: "المدينة",
          placeholder: testUser.country,
          ...fields.country,
        },
      ];
      break;
    case "contact":
      title = "معلومات الاتصال";
      fieldDefinitions = [
        {
          id: "userId",
          label: "رقم الهوية",
          placeholder: testUser.userId,
          ...fields.userId,
        },
        {
          id: "userPhone",
          label: "رقم الهاتف",
          placeholder: testUser.userPhone,
          ...fields.userPhone,
        },
        {
          id: "email",
          type: "email",
          label: "البريد الإلكتروني",
          placeholder: testUser.email,
          ...fields.email,
        },
      ];
      break;
  }

  const isAnyInputInvalid = Object.values(fields).some(
    field => field?.error !== null,
  );

  const isAnyFieldChanged = Object.keys(fields).some(key => {
    return fields[key]?.value !== initialValues[key];
  });

  const isSaveDisabled = isAnyInputInvalid || !isAnyFieldChanged;

  return (
    <>
      {/* Edit, Save Buttons */}
      <div className="flex justify-between">
        <h3 className="self-center text-[0.65rem] sm:text-md">{title}</h3>

        {!editState ? (
          <button
            type="button"
            className="flex items-center justify-center gap-1 px-4 py-2 text-[0.65rem] sm:gap-3 sm:text-md"
            onClick={onToggleEdit}
          >
            <Image
              src="/icons/edit.svg"
              alt="Edit Icon"
              // className="w-3 sm:w-auto"
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
              onClick={onToggleEdit}
            >
              <Image
                src="/icons/cancel.svg"
                alt="Cancel Icon"
                // className="w-2 sm:w-auto"
                width={8}
                height={8}
              />
              <p>إلغاء</p>
            </button>
            <button
              type="button"
              className="flex items-center justify-center rounded-sm bg-secondary-normal px-2 py-0 text-[0.65rem] text-primary-darker hover:bg-secondary-normal-hover sm:px-4 sm:py-2 sm:text-md"
              disabled={isSaveDisabled}
              onClick={onSave}
            >
              حفظ
            </button>
          </div>
        )}
      </div>

      {/* Info Blocks */}
      <form className="flex flex-col justify-center gap-6">
        {fieldDefinitions.map(field => (
          <ProfileInputField key={field.id} {...field} disabled={!editState} />
        ))}
      </form>
    </>
  );
};

export default ProfileInfoBlock;
