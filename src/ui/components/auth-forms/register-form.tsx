"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";

import { Button } from "@/ui/components/common/button";
import { IconInput } from "@/ui/components/common/icon-input";
import { GoogleButton } from "@/ui/components/auth-forms/google-btn";
import { registrationValidationSchema } from "@/utils/validationSchemas";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await axios.post("/api/register", values);

      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setGlobalError(error.response.data.error.toString());
      } else {
        setGlobalError(t("vs_global_error_register"));
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-[--background] rounded-lg shadow-md flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registrationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            className="flex flex-col items-center gap-8 w-full py-4 px-4 md:px-8"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold">{t("register")}</h2>

            <div className="relative w-full">
              <IconInput
                name="name"
                type="text"
                iconID="icon-user"
                label={t("name")}
              />
              <CustomErrorMessage name="name" className="absolute" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="email"
                type="email"
                iconID="icon-mail"
                label="Email"
              />
              <CustomErrorMessage name="email" className="absolute" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="password"
                type="password"
                iconID="icon-lock"
                label={t("password")}
              />
              <CustomErrorMessage name="password" className="absolute" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="confirmPassword"
                type="password"
                iconID="icon-lock"
                label={t("confirm_password")}
              />
              <CustomErrorMessage name="confirmPassword" className="absolute" />
            </div>

            {globalError && <div className="error-text">{globalError}</div>}

            <Button type="submit" className="btn-green px-6">
              {isSubmitting
                ? t("action_in_progress_register")
                : t("action_register")}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center w-full items-center gap-3 py-4 mb-4">
        <div className="border-b border-[--gray] w-full" />
        <div className="text-xs">{t("or")}</div>
        <div className="border-b border-[--gray] w-full" />
      </div>

      <GoogleButton onClick={() => signIn("google")} />

      <div className="mt-10">
        <span>{t("account_exists")} </span>
        <Link href="/login" className="underline hover-green">
          {t("action_login")}
        </Link>
      </div>
    </div>
  );
};
export default RegistrationForm;
