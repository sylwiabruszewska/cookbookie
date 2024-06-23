"use client";

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";

import { Button } from "@ui/components/common/button";
import { IconInput } from "@ui/components/common/icon-input";
import { loginValidationSchema } from "@utils/validationSchemas";

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
      setGlobalError(t("vs_global_error_register"));
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
          <Form className="flex flex-col items-center" autoComplete="off">
            <h2 className="heading-l">{t("login")}</h2>
            <IconInput
              id="email"
              name="email"
              type="email"
              required
              iconID="icon-user"
              label="Email"
            />

            <IconInput
              id="password"
              name="password"
              type="password"
              required
              iconID="icon-lock"
              label={t("password")}
            />

            {globalError && <div className="error-text">{globalError}</div>}

            <Button type="submit" className="btn-green w-full mt-6 mb-4">
              {isSubmitting ? t("action_in_progress_login") : t("action_login")}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center w-full items-center gap-3 py-4">
        <div className="border-b border-[--gray] w-full" />
        <div>{t("or")}</div>
        <div className="border-b border-[--gray] w-full" />
      </div>

      <button onClick={() => signIn("google")}>
        <Image
          src="/google/google_signin.svg"
          alt="Google Logo"
          width={175}
          height={40}
          priority
        />
      </button>

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