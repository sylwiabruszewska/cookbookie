"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Form, FormikHelpers } from "formik";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslation } from "react-i18next";

import { Button } from "@ui/components/button";
import IconInput from "@ui/components/icon-input";
import { registrationValidationSchema } from "@utils/validationSchemas";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await axios.post("/api/register", values);
      // console.log(res.data);
      console.log("Registration successful");
      actions.resetForm();
      router.push("/login");
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        setGlobalError(error.response.data.error.toString());
      } else {
        setGlobalError("Registration failed. Please try again.");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-[--background] rounded-lg shadow-md flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registrationValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center" autoComplete="off">
            <h2 className="heading-l">{t("register")}</h2>

            <IconInput
              id="text"
              name="name"
              type="text"
              placeholder="Name"
              required
              iconID="icon-user"
              label="Name"
            />

            <IconInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              required
              iconID="icon-mail"
              label="Email"
            />

            <IconInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              iconID="icon-lock"
              label="Password"
            />

            {globalError && <div className="error-text">{globalError}</div>}

            <Button type="submit" className="btn-green w-full mt-4 mb-4">
              {isSubmitting
                ? t("action_in_progress_register")
                : t("action_register")}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex justify-center w-full items-center gap-3 py-4">
        <div className="border-b border-[--gray] w-full" />
        <div>or</div>
        <div className="border-b border-[--gray] w-full" />
      </div>

      <button onClick={() => signIn("google")}>
        <Image
          src="/google/google_signup.svg"
          alt="Google Logo"
          width={179}
          height={40}
          priority
        />
      </button>

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
