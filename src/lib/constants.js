export const SITE = {
  name: "MentorLagbe",
  tagline:
    "Find a verified tutor, join the right batch, and keep learning with confidence.",
  email: "contact.jubumax@gmail.com",
  phone: "+880 1600-017019",
  phoneHref: "+8801600017019",
  location: "Dhaka, Bangladesh",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
export const ENABLE_GOOGLE_LOGIN = process.env.NEXT_PUBLIC_GOOGLE_AUTH === "true";

export const ROLES = {
  STUDENT: "student",
  TUTOR: "tutor",
  ADMIN: "admin",
};
