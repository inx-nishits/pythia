import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from "zod";

const alphabeticOnly = (val: string) => {
  const t = val.trim();
  return t.length > 0 && /^[a-zA-Z\s]+$/.test(t);
};
const alphabeticMessage = "Must contain only letters and spaces";

export const ProfileSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .refine(alphabeticOnly, { message: `First name ${alphabeticMessage}.` }),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .refine(alphabeticOnly, { message: `Last name ${alphabeticMessage}.` }),
  email: z.string().email("Invalid email address"),
  store_name: z.string().min(1, "Store name is required"),
  phone_number: z
    .string()
    .refine((val) => {
      const phoneNumber = parsePhoneNumberFromString(val);
      return phoneNumber?.isValid() ?? false;
    }, {
      message: "Invalid phone number.",
    }),
  number_of_stores: z
    .number()
    .min(1, "Number of stores must be at least 1")
    .nullable(),
  type_of_industry: z.string().min(1, "Type of industry is required"),
  message: z.string().optional(),
  demo_requested: z.boolean().optional(),
  emails_accepted: z.boolean(),
});
