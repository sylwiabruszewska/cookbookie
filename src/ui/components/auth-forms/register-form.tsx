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
  privacyPolicyAccepted: boolean;
}

const RegistrationForm = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacyPolicyAccepted: false,
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!privacyPolicyAccepted) {
      setGlobalError(t("privacy_policy_required"));
      actions.setSubmitting(false);
      return;
    }

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

  const handleGoogleSignIn = async () => {
    if (!privacyPolicyAccepted) {
      setGlobalError(t("privacy_policy_required"));
      return;
    }
    signIn("google");
  };

  return (
    <div className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-[--background] rounded-lg shadow-md flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={registrationValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form
            className="flex flex-col items-center gap-4 w-full py-4 px-4 md:px-8"
            autoComplete="off"
          >
            <h2 className="text-2xl font-semibold">{t("register")}</h2>

            <div className="relative w-full">
              <IconInput
                name="name"
                type="text"
                iconID="icon-user"
                label={t("name")}
                data-testid="register-username-input"
              />
              <CustomErrorMessage name="name" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="email"
                type="email"
                iconID="icon-mail"
                label="Email"
                data-testid="register-email-input"
              />
              <CustomErrorMessage name="email" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="password"
                type="password"
                iconID="icon-lock"
                label={t("password")}
                data-testid="register-password-input"
              />
              <CustomErrorMessage name="password" />
            </div>

            <div className="relative w-full">
              <IconInput
                name="confirmPassword"
                type="password"
                iconID="icon-lock"
                label={t("confirm_password")}
                data-testid="register-confirmpassword-input"
              />
              <CustomErrorMessage name="confirmPassword" />
            </div>

            <div className="relative w-full">
              <input
                type="checkbox"
                id="privacyPolicyAccepted"
                name="privacyPolicyAccepted"
                checked={values.privacyPolicyAccepted}
                onChange={(e) => {
                  setFieldValue("privacyPolicyAccepted", e.target.checked);
                  setPrivacyPolicyAccepted(e.target.checked);
                }}
                className="mr-2"
              />
              <label htmlFor="privacyPolicyAccepted">
                {t("privacy_policy_text")}
                <Link
                  className="underline hover-green"
                  href="/privacy-policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("privacy_policy")}
                </Link>
              </label>

              <CustomErrorMessage name="privacyPolicyAccepted" />
            </div>

            {globalError && <div className="error-text">{globalError}</div>}

            <Button
              data-testid="register-submit-button"
              type="submit"
              className="btn-green px-6 mt-4"
            >
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

      <GoogleButton onClick={handleGoogleSignIn} />

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
