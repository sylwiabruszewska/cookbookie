"use client";

import { Formik, Form, FormikHelpers } from "formik";
import { useState } from "react";

import { Button } from "@/ui/components/button";
import IconInput from "@/ui/components/icon-input";
import useModal from "@hooks/useModal";
import Modal from "@/ui/components/modal";
import { addEmailToSubscribersTable } from "@lib/actions";
import { newsletterValidationSchema } from "@utils/validationSchemas";

interface FormValues {
  emailNewsletter: string;
}

export default function NewsletterForm() {
  const { isOpen, openModal, closeModal, modalRef } = useModal();
  const [modalContent, setModalContent] = useState<string>("");

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const { emailNewsletter } = values;

      const isNewEmail = await addEmailToSubscribersTable(emailNewsletter);
      setModalContent(
        isNewEmail
          ? "Thank you for subscribing our newsletter!"
          : "Email already exists in subscribers list!"
      );

      openModal();
      resetForm();
    } catch (error) {
      console.error("Fail to subscribe the newsletter", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ emailNewsletter: "" }}
        validationSchema={newsletterValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            className="text-black flex flex-col gap-0 md:flex-row md:items-start md:gap-4 lg:flex-col lg:gap-0 lg:items-center"
            autoComplete="off"
          >
            <IconInput
              id="emailNewsletter"
              name="emailNewsletter"
              type="email"
              placeholder="Enter your email address"
              required
              iconID="icon-mail"
              label="Email"
              className="mb-0"
            />

            <Button
              type="submit"
              className="btn-bordered w-full md:px-10 md:w-auto dark:bg-[--gray-dark]"
            >
              Subscribe
            </Button>
          </Form>
        )}
      </Formik>

      {isOpen && (
        <Modal onClose={closeModal} modalRef={modalRef}>
          <div className="flex flex-col gap-8 justify-center items-center text-[--font]">
            <span className="text-center">{modalContent}</span>
            <div className="flex gap-8">
              <Button
                onClick={closeModal}
                className="btn-green bg-[--gray-medium]"
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
