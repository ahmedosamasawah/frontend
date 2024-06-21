import TextInput from "./Form/TextInput";

const ProfileInputField = ({
  id,
  type,
  value,
  label,
  placeholder,
  error,
  onChange,
  disabled,
}) => {
  return (
    <TextInput
      key={id}
      name={id}
      type={type}
      error={error}
      value={value}
      labelText={label}
      changeHandler={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default ProfileInputField;
