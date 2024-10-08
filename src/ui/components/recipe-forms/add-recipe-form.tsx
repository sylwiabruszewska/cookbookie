"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray } from "formik";

import {
  addRecipe,
  addNewIngredient,
  getExistingIngredient,
} from "@/lib/actions";
import { useEdgeStore } from "@/ui/components/providers/edgestore";
import { recipeValidationSchema } from "@/utils/validationSchemas";

import {
  Step,
  Category,
  Ingredient,
  IngredientSelect,
  RecipeFormProps,
} from "@/lib/definitions";
import { Button } from "@/ui/components/common/button";
import { Input } from "@/ui/components/recipe-forms-components/input";
import { Switch } from "@/ui/components/recipe-forms-components/switch";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";
import { TextArea } from "@/ui/components/recipe-forms-components/textarea";
import { TimePicker } from "@/ui/components/recipe-forms-components/time-picker";
import { FileUpload } from "@/ui/components/recipe-forms-components/file-upload";
import { ReactSelect } from "@/ui/components/recipe-forms-components/react-select";

interface AddRecipeFormProps {
  categories: Category[];
  ingredientsFromDb: IngredientSelect[];
}

export function AddRecipeForm({
  categories,
  ingredientsFromDb,
}: AddRecipeFormProps) {
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
    ingredients: [{ id: "", ingredient: "", quantity: "" }],
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
    { setSubmitting }: FormikHelpers<RecipeFormProps>
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

      await addRecipe(recipe);

      if (fileUrls.length > 0) {
        await confirmUploads(fileUrls);
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
    <div data-testid="add-recipe-form">
      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema(t)}
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
                    data-testid="add-recipe-form-title-input"
                  />

                  <CustomErrorMessage name="title" />
                </div>

                <div>
                  <TextArea
                    id="description"
                    label={t("description")}
                    data-testid="add-recipe-form-title-description"
                  />

                  <CustomErrorMessage name="description" />
                </div>

                <div>
                  {categories && (
                    <ReactSelect
                      data-testid="category-select"
                      id="category"
                      name="category"
                      label={t("category")}
                      options={categories.map((category: Category) => ({
                        value: category.name,
                        label: category.name,
                      }))}
                    />
                  )}

                  <CustomErrorMessage name="category" />
                </div>

                <div>
                  <TimePicker
                    id="cookingTime"
                    name="cookingTime"
                    label={t("cookingTime")}
                  />

                  <CustomErrorMessage name="cookingTime" />
                </div>
              </div>
            </div>

            <div className="space-y-4" data-testid="ingredients-select">
              <h3 className="text-l font-semibold mb-2">{t("ingredients")}</h3>
              <FieldArray name="ingredients">
                {({ push, remove, form }) => (
                  <div className="space-y-4">
                    {form.values.ingredients.map(
                      (ingredient: Ingredient, index: number) => (
                        <div
                          className="flex justify-between space-x-2 mb-2 align-center w-full"
                          key={ingredient.id}
                        >
                          <div className="w-full">
                            <div className="flex justify-between space-x-2 align-center">
                              <div className="w-2/3">
                                {ingredientsFromDb && (
                                  <ReactSelect
                                    data-testid={`ingredients.${index}.ingredient`}
                                    isCreatable={true}
                                    id={`ingredients.${index}.ingredient`}
                                    name={`ingredients.${index}.ingredient`}
                                    label={t("ingredient")}
                                    options={ingredientsFromDb.map(
                                      (ingredient: IngredientSelect) => ({
                                        value: ingredient.name,
                                        label: ingredient.name,
                                      })
                                    )}
                                    onChange={async (selectedOption) => {
                                      if (selectedOption) {
                                        const ingredient =
                                          await getExistingIngredient(
                                            selectedOption.value
                                          );
                                        form.setFieldValue(
                                          `ingredients.${index}.id`,
                                          ingredient.id
                                        );
                                        form.setFieldValue(
                                          `ingredients.${index}.ingredient`,
                                          selectedOption.value
                                        );
                                      }
                                    }}
                                    onCreateOption={async (inputValue) => {
                                      const ingredient = await addNewIngredient(
                                        inputValue
                                      );
                                      form.setFieldValue(
                                        `ingredients.${index}.id`,
                                        ingredient.id
                                      );
                                      form.setFieldValue(
                                        `ingredients.${index}.ingredient`,
                                        inputValue
                                      );
                                    }}
                                    value={
                                      ingredient.ingredient
                                        ? {
                                            value: ingredient.ingredient,
                                            label: ingredient.ingredient,
                                          }
                                        : null
                                    }
                                  />
                                )}
                              </div>

                              <div className="w-1/3 flex items-center space-x-2">
                                <Input
                                  id={`ingredients.${index}.quantity`}
                                  name={`ingredients.${index}.quantity`}
                                  type="text"
                                  label={t("quantity")}
                                  data-testid={`ingredients.${index}.quantity`}
                                />
                              </div>
                            </div>

                            <div className="error-text">
                              <CustomErrorMessage
                                name={`ingredients.${index}.ingredient`}
                              />
                              <CustomErrorMessage
                                name={`ingredients.${index}.quantity`}
                              />
                            </div>
                          </div>

                          <Button
                            className="btn-icon"
                            onClick={() => remove(index)}
                            ariaLabel={t("remove")}
                          >
                            <FontAwesomeIcon icon="xmark" className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    )}
                    <Button
                      data-testid="add-ingredient-btn"
                      className="btn-green mb-4 ml-auto h-10 w-10"
                      ariaLabel={t("add_ingredient")}
                      onClick={() =>
                        push({
                          id: "",
                          ingredient: "",
                          quantity: "",
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
              <h3 className="text-l font-semibold mb-2">
                {t("recipe_preparation")}
              </h3>

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
                            data-testid={`steps.${index}.step`}
                            id={`steps.${index}.step`}
                            label={t("step", { stepNumber: index + 1 })}
                          />

                          <CustomErrorMessage name={`steps.${index}.step`} />
                        </div>

                        <Button
                          className="btn-icon"
                          onClick={() => remove(index)}
                          ariaLabel={t("remove")}
                        >
                          <FontAwesomeIcon icon="xmark" className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      data-testid="add-step-btn"
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
              data-testid="add-recipe-submit-btn"
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
