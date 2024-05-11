"use client";

import Link from "next/link";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Button } from "../button";
import IconInput from "../icon-input";
import { authenticate } from "@lib/actions";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=[\]{}'"\\|,.<>/?~])/;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        passwordPattern,
        "The password should contain at least one: uppercase letter, special character and digit"
      )
      .required("Password is required")
      .min(6, "Password should be at least 6 characters")
      .max(20, "Password should be at most 20 characters"),
  });

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const error = await authenticate(values);
      if (error) {
        actions.setFieldError("password", error);
      } else {
        console.log("Login successful");
        actions.resetForm();
      }
    } catch (error) {
      console.error("Login fail:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
