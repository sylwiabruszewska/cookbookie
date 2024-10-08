"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";

import useModal from "@/hooks/useModal";
import { addEmailToSubscribersTable } from "@/lib/actions";
import { newsletterValidationSchema } from "@/utils/validationSchemas";

import { Button } from "@/ui/components/common/button";
import { Modal } from "@/ui/components/dashboard/modal";
import { IconInput } from "@/ui/components/common/icon-input";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";

interface FormValues {
  emailNewsletter: string;
}

export function NewsletterForm() {
  const { isOpen, openModal, closeModal, modalRef } = useModal();
  const [modalContent, setModalContent] = useState<string>("");
  const { t } = useTranslation(["dashboard"]);

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
        validationSchema={newsletterValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form
            className="text-black flex flex-col gap-4 md:flex-row md:items-start lg:flex-col lg:items-center"
            autoComplete="off"
          >
            <div className="relative w-full">
              <IconInput
                name="emailNewsletter"
                type="email"
                iconID="icon-mail"
                label="Email"
                className="mb-0"
              />

              <CustomErrorMessage name="emailNewsletter" className="absolute" />
            </div>

            <Button
              type="submit"
              className="btn-bordered w-full md:px-10 md:w-auto dark:bg-[--gray-dark]"
            >
              {t("subscribe_b")}
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
                ariaLabel={t("close")}
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
