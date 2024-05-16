"use client";

import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { Category } from "@/lib/definitions";
import { Button } from "@/ui/components/button";

import { Input } from "./input";
import { Select } from "./select";
import { TextArea } from "./textarea";
import { TimePicker } from "./time-picker";

interface CategoriesProps {
  categories: Category[];
}

interface Ingredient {
  id: string;
  ingredient: string;
  quantity: string;
  quantityUnit: string;
}

interface Step {
  id: string;
  step: string;
}

interface FormValues {
  title: string;
  description: string;
  category: string;
  cookingTime: string;
  ingredients: Ingredient[];
  steps: Step[];
}

export default function AddRecipeForm({ categories }: CategoriesProps) {
  const initialValues: FormValues = {
    title: "",
    description: "",
    category: "",
    cookingTime: "",
    ingredients: [
      { id: uuidv4(), ingredient: "", quantity: "", quantityUnit: "" },
    ],
    steps: [{ id: uuidv4(), step: "" }],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(6, "Title should be at least 6 characters")
      .max(30, "Title should be at most 20 characters"),
    description: Yup.string().max(
      200,
      "Description should be at most 20 characters"
    ),
    category: Yup.string().required("Category is required"),
    cookingTime: Yup.string().required("Cooking time is required"),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          ingredient: Yup.string().required("Ingredient name is required"),
          quantity: Yup.string().required("Quantity is required"),
          quantityUnit: Yup.string().required("Quantity unit is required"),
        })
      )
      .required("Ingredients are required"),
    steps: Yup.array().of(
      Yup.object().shape({
        step: Yup.string()
          .required("Step description is required")
          .min(1, "At least one step is required"),
      })
    ),
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    try {
      resetForm();
    } catch (error) {
      console.error("fail", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-8">Add recipe</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-8 space-y-4">
            <Image
              src="/add.png"
              alt="Add recipe"
              className="dark:invert mx-auto rounded-lg mb-8"
              width={279}
              height={268}
              priority
            />

            <div>
              <Input
                id="title"
                name="title"
                type="text"
                label="Enter item title"
                placeholder="Enter item title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-text"
              />
            </div>

            <div>
              <Input
                id="description"
                name="description"
                type="text"
                label="Enter about recipe"
                placeholder="Enter about recipe"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error-text"
              />
            </div>

            <div>
              {categories && (
                <Select
                  id="category"
                  name="category"
                  label="Category"
                  options={categories.map((category: Category) => ({
                    value: category.name,
                    label: category.name,
                  }))}
                />
              )}
              <ErrorMessage
                name="category"
                component="div"
                className="error-text"
              />
            </div>

            <div>
              <TimePicker
                id="cookingTime"
                name="cookingTime"
                label="Cooking Time"
                placeholder="Cooking Time"
              />
              <ErrorMessage
                name="cookingTime"
                component="div"
                className="error-text"
              />
            </div>

            <h3 className="text-l font-semibold mb-2">Ingredients</h3>

            <FieldArray name="ingredients">
              {({ push, remove, form }) => (
                <div>
                  {form.values.ingredients.map(
                    (ingredient: Ingredient, index: number) => (
                      <div
                        className="flex justify-between space-x-2 space-y-2 align-center"
                        key={index}
                      >
                        <div>
                          <div className="flex justify-between space-x-2 align-center">
                            <div className="w-1/2">
                              <Input
                                id={`ingredients.${index}.ingredient`}
                                name={`ingredients.${index}.ingredient`}
                                type="text"
                                label="Ingredient"
                                placeholder="Ingredient"
                              />
                            </div>

                            <div className="w-1/2 flex items-center space-x-2">
                              <Input
                                id={`ingredients.${index}.quantity`}
                                name={`ingredients.${index}.quantity`}
                                type="number"
                                label="Quantity"
                                placeholder="Quantity"
                              />

                              <Select
                                id={`ingredients.${index}.quantityUnit`}
                                name={`ingredients.${index}.quantityUnit`}
                                label="Unit"
                                options={[
                                  { value: "tbs", label: "tbs" },
                                  { value: "tsp", label: "tsp" },
                                  { value: "kg", label: "kg" },
                                  { value: "g", label: "g" },
                                  { value: "piece", label: "piece" },
                                ]}
                              />
                            </div>
                          </div>

                          <div className="error-text">
                            <ErrorMessage
                              name={`ingredients.${index}.ingredient`}
                              component="div"
                            />
                            <ErrorMessage
                              name={`ingredients.${index}.quantity`}
                              component="div"
                            />
                            <ErrorMessage
                              name={`ingredients.${index}.quantityUnit`}
                              component="div"
                            />
                          </div>
                        </div>

                        <Button
                          variant="icon"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            aria-label="Remove"
                            className="h-4 w-4"
                          />
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    variant="green"
                    className="mb-4 ml-auto h-10 w-10"
                    onClick={() =>
                      push({
                        id: uuidv4(),
                        ingredient: "",
                        quantity: "",
                        quantityUnit: "",
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              )}
            </FieldArray>

            <h3 className="text-l font-semibold mb-2">Recipe Preparation</h3>

            <FieldArray name="steps">
              {({ push, remove, form }) => (
                <div>
                  {form.values.steps.map((step: Step, index: number) => (
                    <div
                      className="flex justify-between space-x-2 space-y-2 align-center"
                      key={index}
                    >
                      <div className="w-full">
                        <TextArea
                          id={`steps.${index}.step`}
                          label={`Step ${index + 1}`}
                          placeholder={`Step ${index + 1}`}
                        />

                        <ErrorMessage
                          name={`steps.${index}.step`}
                          component="div"
                          className="error-text"
                        />
                      </div>

                      <Button
                        variant="icon"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          aria-label="Remove"
                          className="h-4 w-4"
                        />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    className="mb-4 ml-auto h-10 w-10"
                    onClick={() =>
                      push({
                        id: uuidv4(),
                        step: "",
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              )}
            </FieldArray>

            <Button
              className="mx-auto px-4"
              type="submit"
              disabled={isSubmitting}
            >
              Add recipe
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
