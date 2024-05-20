import * as Yup from "yup";

import { namePattern, passwordPattern } from "./patterns";

export const registrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(namePattern, "The name should contain only letters")
    .required("Name is required")
    .min(3, "Name should be at least 3 characters")
    .max(20, "Name should be at most 20 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      passwordPattern,
      "Password requires at least one: uppercase, special character, digit."
    )
    .required("Password is required")
    .min(6, "Password should be at least 6 characters")
    .max(20, "Password should be at most 20 characters"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      passwordPattern,
      "Password requires at least one: uppercase, special character, digit."
    )
    .required("Password is required")
    .min(6, "Password should be at least 6 characters")
    .max(20, "Password should be at most 20 characters"),
});
