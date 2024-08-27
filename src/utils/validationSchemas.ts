import * as z from "zod";
import * as Yup from "yup";

import { namePattern, passwordPattern } from "@/utils/patterns";
import { TFunction } from "i18next";

export const registrationValidationSchema = (t: TFunction) => {
  return Yup.object().shape({
    name: Yup.string()
      .matches(namePattern, t("vs_auth_name_type"))
      .required(t("vs_auth_name_required"))
      .min(3, t("vs_auth_name_min"))
      .max(20, t("vs_auth_name_max")),
    email: Yup.string()
      .email(t("vs_auth_email_type"))
      .required(t("vs_auth_email_required")),
    password: Yup.string()
      .matches(passwordPattern, t("vs_auth_password_type"))
      .required(t("vs_auth_password_required"))
      .min(6, t("vs_auth_password_min"))
      .max(20, t("vs_auth_password_max")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("vs_auth_confirm_type"))
      .required(t("vs_auth_confirm_required")),
    privacyPolicyAccepted: Yup.boolean().oneOf(
      [true],
      t("privacy_policy_required")
    ),
  });
};

export const loginValidationSchema = (t: TFunction) => {
  return Yup.object().shape({
    email: Yup.string()
      .email(t("vs_auth_email_type"))
      .required(t("vs_auth_email_required")),
    password: Yup.string()
      .matches(passwordPattern, t("vs_auth_password_type"))
      .required(t("vs_auth_password_required"))
      .min(6, t("vs_auth_password_min"))
      .max(20, t("vs_auth_password_max")),
  });
};

export const recipeValidationSchema = (t: TFunction) => {
  return Yup.object().shape({
    title: Yup.string()
      .required(t("vs_recipe_title_required"))
      .min(6, t("vs_recipe_title_min"))
      .max(60, t("vs_recipe_title_max")),
    description: Yup.string().max(300, t("vs_recipe_description_max")),
    category: Yup.string().required(t("vs_recipe_category_required")),
    cookingTime: Yup.string().required(t("vs_recipe_cookingtime_required")),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          ingredient: Yup.string().required(t("vs_recipe_ingredient_required")),
          quantity: Yup.string().required(t("vs_recipe_quantity_required")),
        })
      )
      .required(t("vs_recipe_ingredients_required"))
      .min(1, t("vs_recipe_ingredients_count")),
    steps: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          step: Yup.string()
            .required(t("vs_recipe_step_required"))
            .max(300, t("vs_recipe_step_max")),
        })
      )
      .min(1, t("vs_recipe_step_count")),
  });
};

export const shoppingListValidationSchema = (t: TFunction) => {
  return Yup.object().shape({
    ingredientName: Yup.string().required(t("vs_recipe_ingredient_required")),
    ingredientQuantity: Yup.string().required(t("vs_recipe_quantity_required")),
  });
};

export const newsletterValidationSchema = (t: TFunction) => {
  return Yup.object().shape({
    emailNewsletter: Yup.string()
      .email(t("vs_email_type"))
      .required(t("vs_email_required")),
  });
};

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
        id: z.string(),
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
        id: z.string(),
        step: z
          .string()
          .min(1, { message: "Step description is required" })
          .max(300, { message: "Step should be at most 300 characters" }),
      })
    )
    .nonempty({ message: "Steps are required" }),
  isPublic: z.boolean(),
});

export const shoppingListValidationSchemaBackend = z.object({
  ingredient: z.string(),
  quantity: z.string(),
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
