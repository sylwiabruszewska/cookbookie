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

export const recipeValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(6, "Title should be at least 6 characters")
    .max(30, "Title should be at most 20 characters"),
  description: Yup.string().max(
    200,
    "Description should be at most 20 characters"
  ),
  category: Yup.string().required("Category is required"),
  cookingTime: Yup.string().required("Cooking time is required"),
  ingredients: Yup.array()
    .of(
      Yup.object().shape({
        ingredient: Yup.string().required("Ingredient name is required"),
        quantity: Yup.string().required("Quantity is required"),
        quantityUnit: Yup.string().required("Quantity unit is required"),
      })
    )
    .required("Ingredients are required"),
  steps: Yup.array().of(
    Yup.object().shape({
      step: Yup.string()
        .required("Step description is required")
        .min(1, "At least one step is required"),
    })
  ),
});
