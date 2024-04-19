"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Button } from "./button";
import IconInput from "./icon-input";

interface FormValues {
  email: string;
}

export default function NewsletterForm() {
  const validationSchema = Yup.object().shape({
    newsletter: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const { email } = values;

      console.log("newsletter");
      resetForm();
    } catch (error) {
      console.error("Login fail:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-2 text-black" autoComplete="off">
          <IconInput
            id="newsletter"
            name="newsletter"
            type="email"
            placeholder="Enter your email address"
            required
            iconID="icon-mail"
            label="Email"
          />

          <Button type="submit" className="w-full">
            Subscribe
          </Button>
        </Form>
      )}
    </Formik>
  );
}
