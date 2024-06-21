import { FieldValues } from "react-hook-form";

export interface UserSignUpData extends FieldValues {
  firstName: string;
  lastName: string;
  nationalId: string;
  city: string;
  phone: string;
  email: string;
  password: string;
}

export interface StepData extends FieldValues {
  firstName: string;
  lastName: string;
  nationalId: string;
  city: string;
  phone: string;
  email: string;
  password: string;
  specialization: { value: string; label: string };
  nationalIdImage: string;
  certificate: string;
  lawLicense: string;
  slotsConfirmed: boolean;
  uploadedFileNames: {
    nationalIdImage: string;
    certificate: string;
    lawLicense: string;
  };
  selectedOptions: {
    specialization: string | null;
  };
}

export interface Time {
  hour: string;
  minute: string;
  period: string;
}

export interface TimeSlot {
  from: Time;
  to: Time;
  confirmed: boolean;
}

export interface ReservedPeriod {
  from: Time;
  to: Time;
}

export interface Time {
  hour: string;
  minute: string;
  period: string;
}

export interface TimeSlot {
  from: Time;
  to: Time;
  confirmed: boolean;
}

export interface ReservedPeriod {
  from: Time;
  to: Time;
}

export type FormDataType = {
  title: string;
  categoryId?: string;
  price: string;
  description: string;
  image: File | null;
  requiredFiles: string[];
};
