"use client";

import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Button } from "@/ui/components/button";
import IconInput from "@/ui/components/icon-input";

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
        <Form
          className="text-black flex flex-col md:flex-row md:items-center gap-4 lg:flex-col"
          autoComplete="off"
        >
          <IconInput
            id="newsletter"
            name="newsletter"
            type="email"
            placeholder="Enter your email address"
            required
            iconID="icon-mail"
            label="Email"
            className="mb-0"
          />

          <Button
            variant="border"
            type="submit"
            className="w-full md:px-10 md:w-auto"
          >
            Subscribe
          </Button>
        </Form>
      )}
    </Formik>
  );
}
