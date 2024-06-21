import { z } from "zod";

export const stepOneSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, { message: "برجاء إدخال اسم أول بالتنسيق الصحيح!" }),
  lastName: z
    .string()
    .trim()
    .min(3, { message: "برجاء إدخال اسم عائلة بالتنسيق الصحيح!" }),
  nationalId: z
    .string()
    .trim()
    .regex(/^[0-9]{14}$/, { message: "برجاء إدخال رقم هوية صالح!" }),
  city: z.string().trim().min(2, { message: "برجاء إدخال اسم مدينة صالح!" }),
});

export const stepTwoSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{9}$/, {
      message: "برجاء إدخال رقم هاتف صالح!",
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "برجاء إدخال بريد إلكتروني صالح!" }),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, {
      message: "لا تقل عن 8 حروف وتحتوي: حرف كبير وصغير-رمز-رقم",
    }),
});

export const stepThreeSchema = z.object({
  nationalIdImage: z.custom<FileList>().refine(files => {
    return files.length > 0;
  }, "يرجى إرفاق صورة لهويتك!"),
  certificate: z.custom<FileList>().refine(files => {
    return files.length > 0;
  }, "يرجى إرفاق صورة المؤهل!"),
  lawLicense: z.custom<FileList>().refine(files => {
    return files.length > 0;
  }, "يرجى إرفاق صورة رخصة المحاماه!"),
  specialization: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .nonempty({ message: "يرجى اختيار تخصص!" }),
});

export const stepFourSchema = z.object({
  slotsConfirmed: z
    .boolean()
    .refine(val => val, "يرجى اختيار موعد واحد في الأسبوع على الأقل!"),
});

export const basicInfoSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "برجاء إدخال اسم أول بالتنسيق الصحيح!" })
    .optional()
    .or(z.literal("")),
  lastName: z
    .string()
    .min(3, { message: "برجاء إدخال اسم عائلة بالتنسيق الصحيح!" })
    .optional()
    .or(z.literal("")),
  nationalId: z
    .string()
    .regex(/^[0-9]{14}$/, { message: "برجاء إدخال رقم هوية صالح!" })
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(2, { message: "برجاء إدخال اسم مدينة صالح!" })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .regex(/^[0-9]{9}$/, { message: "برجاء إدخال رقم هاتف صالح!" })
    .optional()
    .or(z.literal("")),
});

export const contactInfoSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: "برجاء إدخال بريد إلكتروني صالح!" }),
  password: z
    .string()
    .trim()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/, {
      message: "لا تقل عن 8 حروف وتحتوي: حرف كبير وصغير-رمز-رقم",
    }),
});
