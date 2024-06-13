"use client";

import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Input } from "@ui/components/add-recipe/input";
import { Select } from "@ui/components/add-recipe/select";
import { TextArea } from "@ui/components/add-recipe/textarea";
import { TimePicker } from "@ui/components/add-recipe/time-picker";
import { Switch } from "@ui/components/add-recipe/switch";
import { FileUpload } from "@ui/components/add-recipe/file-upload";
import { Button } from "@/ui/components/button";
import {
  CategoriesProps,
  Category,
  Ingredient,
  RecipeFormProps,
  Step,
} from "@/lib/definitions";
import { recipeValidationSchema } from "@utils/validationSchemas";
import { addRecipe } from "@lib/actions";
import { useEdgeStore } from "@lib/edgestore";

export default function AddRecipeForm({ categories }: CategoriesProps) {
  const { t } = useTranslation(["dashboard"]);
  const router = useRouter();

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  const handleFilesUploaded = (urls: string[]) => {
    setFileUrls(urls);
  };

  const initialValues: RecipeFormProps = {
    title: "",
    description: "",
    category: "",
    cookingTime: "",
    ingredients: [
      { id: uuidv4(), ingredient: "", quantity: "", quantityUnit: "" },
    ],
    steps: [{ id: uuidv4(), step: "" }],
    isPublic: true,
  };

  const confirmUploads = async (fileUrls: string[]) => {
    try {
      for (const urlToConfirm of fileUrls) {
        await edgestore.publicFiles.confirmUpload({ url: urlToConfirm });
      }
    } catch (error) {
      console.error("Error confirming uploads:", error);
    }
  };

  const handleSubmit = async (
    values: RecipeFormProps,
    { setSubmitting, resetForm }: FormikHelpers<RecipeFormProps>
  ) => {
    try {
      const selectedCategory = categories.find(
        (cat) => cat.name === values.category
      );

      if (!selectedCategory) {
        throw new Error("Selected category not found.");
      }

      const recipe = {
        ...values,
        images: fileUrls.length > 0 ? fileUrls : [],
        category: selectedCategory.id,
      };

      const response = await addRecipe(recipe);

      if (fileUrls.length > 0) {
        await confirmUploads(fileUrls);
      }

      if (!response) {
        throw new Error("Failed to submit recipe");
      }

      toast.success(t("toast_add_recipe"));
      router.push("/dashboard/my-recipes");
    } catch (error) {
      toast.error(t("toast_error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-8 flex flex-col gap-4 lg:w-2/3 mx-auto">
            <div className="lg:flex lg:gap-12 lg:items-center lg:mb-12">
              <div className="flex justify-center lg:w-auto mb-12 lg:mb-0">
                <FileUpload onFilesUploaded={handleFilesUploaded} />
              </div>

              <div className="flex flex-col gap-4 lg:flex-grow">
                <div>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    label={t("title")}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error-text"
                  />
                </div>

                <div>
                  <TextArea id="description" label={t("description")} />
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
                      label={t("category")}
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
                    label={t("cookingTime")}
                  />
                  <ErrorMessage
                    name="cookingTime"
                    component="div"
                    className="error-text"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-l font-semibold mb-2">Ingredients</h3>
              <FieldArray name="ingredients">
                {({ push, remove, form }) => (
                  <div className="space-y-4">
                    {form.values.ingredients.map(
                      (ingredient: Ingredient, index: number) => (
                        <div
                          className="flex justify-between space-x-2 mb-2 align-center w-full"
                          key={index}
                        >
                          <div className="w-full">
                            <div className="flex justify-between space-x-2 align-center">
                              <div className="w-1/2 lg:w-2/3">
                                <Input
                                  id={`ingredients.${index}.ingredient`}
                                  name={`ingredients.${index}.ingredient`}
                                  type="text"
                                  label={t("ingredient")}
                                />
                              </div>

                              <div className="w-1/2 lg:w-1/3 flex items-center space-x-2">
                                <Input
                                  id={`ingredients.${index}.quantity`}
                                  name={`ingredients.${index}.quantity`}
                                  type="number"
                                  label={t("quantity")}
                                />

                                <Select
                                  id={`ingredients.${index}.quantityUnit`}
                                  name={`ingredients.${index}.quantityUnit`}
                                  label={t("unit")}
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
                            className="btn-icon"
                            onClick={() => remove(index)}
                            ariaLabel={t("remove")}
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="h-4 w-4"
                            />
                          </Button>
                        </div>
                      )
                    )}
                    <Button
                      className="btn-green mb-4 ml-auto h-10 w-10"
                      ariaLabel={t("add_ingredient")}
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
            </div>

            <div className="space-y-4">
              <h3 className="text-l font-semibold mb-2">Recipe Preparation</h3>

              <FieldArray name="steps">
                {({ push, remove, form }) => (
                  <div className="space-y-4">
                    {form.values.steps.map((step: Step, index: number) => (
                      <div
                        className="flex justify-between space-x-2 items-start"
                        key={index}
                      >
                        <div className="w-full">
                          <TextArea
                            id={`steps.${index}.step`}
                            label={t("step_label", { stepNumber: index + 1 })}
                          />

                          <ErrorMessage
                            name={`steps.${index}.step`}
                            component="div"
                            className="error-text"
                          />
                        </div>

                        <Button
                          className="btn-icon"
                          onClick={() => remove(index)}
                          ariaLabel={t("remove")}
                        >
                          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      className="btn-green mb-4 ml-auto h-10 w-10"
                      ariaLabel={t("add_step")}
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
            </div>

            <div className="self-start">
              <Switch name="isPublic" />
            </div>

            <Button
              className="mx-auto mt-10 btn-rounded"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("action_in_progress_add_recipe")
                : t("add_recipe")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
