"use client";

import Link from "next/link";
import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";
// import { useRouter } from "next/navigation";

import { Button } from "@ui/components/button";
import IconInput from "@ui/components/icon-input";
import { authenticate } from "@lib/actions";
import { loginValidationSchema } from "@utils/validationSchemas";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  // const router = useRouter();
  const [globalError, setGlobalError] = useState<string | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const error = await authenticate(values);

      if (error) {
        setGlobalError(error);
      } else {
        console.log("Login successful");
        actions.resetForm();
        // router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      setGlobalError("Login failed. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form
          className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
          autoComplete="off"
        >
          <h2 className="text-2xl font-semibold mb-8">Sign in</h2>
          <IconInput
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            iconID="icon-user"
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

          <Button
            type="submit"
            className="w-full mt-4 mb-4"
            variant="secondary"
          >
            Sign in
          </Button>

          <Link
            href="/register"
            className="underline hover:text-[--primary-color]"
          >
            Registration
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
