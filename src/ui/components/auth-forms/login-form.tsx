"use client";

import Link from "next/link";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";

import { Button } from "@ui/components/common/button";
import { IconInput } from "@ui/components/common/icon-input";
import { loginValidationSchema } from "@utils/validationSchemas";
import { GoogleButton } from "@/ui/components/auth-forms/google-btn";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setGlobalError(t("vs_invalid_credentials"));
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-[--background] rounded-lg shadow-md flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            className="flex flex-col items-center gap-8 w-full py-4 px-4 md:px-8"
            autoComplete="on"
          >
            <h2 className="text-2xl font-semibold">{t("login")}</h2>

            <div className="relative w-full">
              <IconInput
                name="email"
                type="email"
                iconID="icon-user"
                label="Email"
                autocomplete="on"
              />

              <CustomErrorMessage name="email" className="absolute" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="password"
                type="password"
                iconID="icon-lock"
                label={t("password")}
                autocomplete="on"
              />
              <CustomErrorMessage name="password" className="absolute" />
            </div>

            {globalError && (
              <div className="error-text mt-4 self-start">{globalError}</div>
            )}

            <Button type="submit" className="btn-green px-6">
              {isSubmitting ? t("action_in_progress_login") : t("action_login")}
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
        <span>{t("account_not_exists")} </span>
        <Link href="/register" className="underline hover-green">
          {t("action_register")}
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
