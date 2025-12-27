// app/utils/formValidation.ts

/* ================= REGEX ================= */
export const NAME_REGEX = /^[A-Za-z ]{2,50}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_REGEX = /^[0-9]{10}$/;

/* ================= VALIDATION ================= */
export function validateLeadForm(data: {
  name: string;
  email: string;
  phone: string;
}) {
  const errors: {
    name?: string;
    email?: string;
    phone?: string;
  } = {};

  if (!NAME_REGEX.test(data.name)) {
    errors.name = "Only alphabets are allowed";
  }

  if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!PHONE_REGEX.test(data.phone)) {
    errors.phone = "Phone must be 14 digits (0–14)";
  }

  return errors;
}
