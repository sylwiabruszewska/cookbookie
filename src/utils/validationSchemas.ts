import * as Yup from "yup";
import * as z from "zod";

import { namePattern, passwordPattern } from "@/utils/patterns";

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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
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

export const recipeValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title should be at least 6 characters")
    .max(60, "Title should be at most 60 characters"),
  description: Yup.string().max(
    300,
    "Description should be at most 300 characters"
  ),
  category: Yup.string().required("Category is required"),
  cookingTime: Yup.string().required("Cooking time is required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        ingredient: Yup.string().required("Ingredient name is required"),
        quantity: Yup.string().required("Quantity is required"),
      })
    )
    .required("Ingredients are required")
    .min(1, "At least one ingredient is required"),
  steps: Yup.array()
    .of(
      Yup.object().shape({
        step: Yup.string()
          .required("Step description is required")
          .max(300, "Step should be at most 300 characters"),
      })
    )
    .min(1, "At least one step is required"),
});

export const newsletterValidationSchema = Yup.object().shape({
  emailNewsletter: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

// BACKEND USING ZOD
export const recipeValidationSchemaBackend = z.object({
  images: z.array(z.string()),
  title: z
    .string()
    .min(6, { message: "Title should be at least 6 characters" })
    .max(60, { message: "Title should be at most 60 characters" }),
  description: z
    .string()
    .max(300, { message: "Description should be at most 300 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  cookingTime: z.string().min(1, { message: "Cooking time is required" }),
  ingredients: z
    .array(
      z.object({
        ingredient: z
          .string()
          .min(1, { message: "Ingredient name is required" }),
        quantity: z.string().min(1, { message: "Quantity is required" }),
      })
    )
    .nonempty({ message: "Ingredients are required" }),
  steps: z
    .array(
      z.object({
        step: z
          .string()
          .min(1, { message: "Step description is required" })
          .max(300, { message: "Step should be at most 300 characters" }),
      })
    )
    .nonempty({ message: "Steps are required" }),
  isPublic: z.boolean(),
});

export const newsletterValidationSchemaBackend = z.object({
  emailNewsletter: z.string().email(),
});

export const loginValidationSchemaBackend = z.object({
  email: z.string().email(),
  password: z.string().regex(passwordPattern).min(6).max(20),
});

export const registrationValidationSchemaBackend = z
  .object({
    name: z.string().regex(namePattern).min(3).max(20),
    email: z.string().email(),
    password: z.string().regex(passwordPattern).min(6).max(20),
    confirmPassword: z.string().regex(passwordPattern).min(6).max(20),
  })
  .refine((data) => data.confirmPassword === data.password);
