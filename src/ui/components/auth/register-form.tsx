"use client";

import Link from "next/link";
import { Formik, Form, FormikHelpers } from "formik";

import { Button } from "../button";
import IconInput from "../icon-input";
import { registrationValidationSchema } from "@utils/validationSchemas";
import { register } from "@lib/actions";

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm = () => {
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
      const error = await register(values);

      if (error) {
        actions.setFieldError("password", error);
      } else {
        console.log("Registration successful");
        actions.resetForm();
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form
          className="z-10 max-w-md w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col items-center"
          autoComplete="off"
        >
          <h2 className="text-2xl font-semibold mb-8">Registration</h2>

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

          <Button
            type="submit"
            className="w-full mt-4 mb-4"
            variant="secondary"
          >
            Register
          </Button>

          <Link
            href="/login"
            className="underline hover:text-[--primary-color]"
          >
            Sign in
          </Link>
        </Form>
      )}
    </Formik>
  );
};
export default RegistrationForm;
