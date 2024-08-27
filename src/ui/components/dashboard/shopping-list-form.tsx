"use client";

import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { Formik, Form, FormikHelpers } from "formik";

import { addNewIngredientToShoppingList } from "@lib/actions";
import { shoppingListValidationSchema } from "@utils/validationSchemas";

import { Button } from "@ui/components/common/button";
import { Input } from "@ui/components/recipe-forms-components/input";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";

interface FormValues {
  ingredientName: string;
  ingredientQuantity: string;
}

const initialValues = {
  ingredientName: "",
  ingredientQuantity: "",
};

export function ShoppingListForm() {
  const { t } = useTranslation(["dashboard"]);

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const { ingredientName, ingredientQuantity } = values;

      const ingredientId = uuidv4();

      await addNewIngredientToShoppingList(
        ingredientId,
        ingredientName,
        ingredientQuantity
      );

      resetForm();
    } catch (error) {
      console.error("Fail to add new ingredient to shopping list", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={shoppingListValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex flex-col gap-4 items-center" autoComplete="off">
            <div className="flex justify-between gap-2">
              <div>
                <Input
                  id="ingredientName"
                  name="ingredientName"
                  type="text"
                  label={t("ingredient")}
                />

                <CustomErrorMessage name="ingredientName" />
              </div>

              <div>
                <Input
                  id="ingredientQuantity"
                  name="ingredientQuantity"
                  type="text"
                  label={t("quantity")}
                />

                <CustomErrorMessage name="ingredientName" />
              </div>
            </div>

            <Button type="submit" className="btn-green">
              {t("add_to_shopping_list")}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
