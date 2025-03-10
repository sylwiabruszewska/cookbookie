"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { notFound, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray } from "formik";

import {
  addNewIngredient,
  updateRecipe,
  getExistingIngredient,
} from "@/lib/actions";
import {
  Category,
  Ingredient,
  IngredientSelect,
  RecipeFormProps,
  RecipeWithFavoriteStatus,
  Step,
} from "@/lib/definitions";
import { recipeValidationSchema } from "@/utils/validationSchemas";
import { useEdgeStore } from "@/ui/components/providers/edgestore";

import { Button } from "@/ui/components/common/button";
import { Input } from "@/ui/components/recipe-forms-components/input";
import { Switch } from "@/ui/components/recipe-forms-components/switch";
import { CustomErrorMessage } from "@/ui/components/common/custom-error";
import { TextArea } from "@/ui/components/recipe-forms-components/textarea";
import { TimePicker } from "@/ui/components/recipe-forms-components/time-picker";
import { FileUpload } from "@/ui/components/recipe-forms-components/file-upload";
import { ReactSelect } from "@/ui/components/recipe-forms-components/react-select";

interface EditRecipeFormProps {
  categories: Category[];
  ingredientsFromDb: IngredientSelect[];
  recipe: RecipeWithFavoriteStatus;
}

export function EditForm({
  categories,
  recipe,
  ingredientsFromDb,
}: EditRecipeFormProps) {
  const { t } = useTranslation(["dashboard"]);
  const router = useRouter();

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  const handleFilesUploaded = (urls: string[]) => {
    setFileUrls(urls);
  };

  const recipeId = recipe.id;

  if (!recipeId) {
    notFound();
  }

  const selectedCategoryName =
    categories.find((category: Category) => category.id === recipe.category_id)
      ?.name || "";

  const initialValues: RecipeFormProps = {
    title: `${recipe.title}`,
    images: recipe.images.length > 0 ? recipe.images : [],
    description: `${recipe.description}`,
    category: `${selectedCategoryName}`,
    cookingTime: `${recipe.cooking_time}`,
    ingredients: recipe.ingredients.map((ingredient) => ({
      id: ingredient.id,
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
    })),
    steps: recipe.steps.map((step) => ({
      id: step.id,
      step: step.step,
    })),
    isPublic: recipe.is_public,
  };

  const confirmUploads = async () => {
    let recipeImages;

    if (fileUrls.length === 0) {
      recipeImages = recipe.images;

      return recipeImages;
    }

    try {
      const newUrls = fileUrls.filter((url) => !recipe.images.includes(url));
      if (newUrls.length > 0) {
        await Promise.all(
          newUrls.map(async (urlToConfirm) => {
            await edgestore.publicFiles.confirmUpload({ url: urlToConfirm });
          })
        );
      }

      const urlsToDelete = recipe.images.filter(
        (url) => !fileUrls.includes(url)
      );
      if (urlsToDelete.length > 0) {
        await Promise.all(
          urlsToDelete.map(async (urlToDelete) => {
            await edgestore.publicFiles.delete({ url: urlToDelete });
          })
        );
      }

      const existingUrls = recipe.images.filter((url) =>
        fileUrls.includes(url)
      );

      recipeImages = [...existingUrls, ...newUrls];
      return recipeImages;
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

      const recipeImages = await confirmUploads();

      const recipe = {
        ...values,
        images: recipeImages ? recipeImages : [],
        category: selectedCategory.id,
      };

      await updateRecipe(recipeId, recipe);

      toast.success(t("toast_update_recipe"));
      router.push(`/dashboard/recipes/${values.title}/${recipeId}`);
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
        validationSchema={recipeValidationSchema(t)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="mb-8 flex flex-col gap-4 lg:w-2/3 mx-auto">
            <div className="lg:flex lg:gap-12 lg:items-center lg:mb-12">
              <div className="flex justify-center lg:w-auto mb-12 lg:mb-0">
                <FileUpload
                  onFilesUploaded={handleFilesUploaded}
                  initialImages={recipe.images}
                />
              </div>

              <div className="flex flex-col gap-4 lg:flex-grow">
                <div>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    label={t("title")}
                  />
                  <CustomErrorMessage name="title" />
                </div>

                <div>
                  <TextArea id="description" label={t("description")} />

                  <CustomErrorMessage name="description" />
                </div>

                <div>
                  {categories && (
                    <ReactSelect
                      id="category"
                      name="category"
                      label={t("category")}
                      options={categories.map((category: Category) => ({
                        value: category.name,
                        label: category.name,
                      }))}
                      initialState={
                        selectedCategoryName
                          ? {
                              value: selectedCategoryName,
                              label: selectedCategoryName,
                            }
                          : null
                      }
                    />
                  )}

                  <CustomErrorMessage name="category" />
                </div>

                <div>
                  <TimePicker
                    id="cookingTime"
                    name="cookingTime"
                    label={t("cookingTime")}
                    initialTime={recipe.cooking_time}
                  />

                  <CustomErrorMessage name="cookingTime" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
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
                              <div className="w-1/2 lg:w-2/3">
                                {ingredientsFromDb && (
                                  <ReactSelect
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
                                    initialState={
                                      ingredient.ingredient
                                        ? {
                                            value: ingredient.ingredient,
                                            label: ingredient.ingredient,
                                          }
                                        : null
                                    }
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
                                  />
                                )}
                              </div>

                              <div className="w-1/2 lg:w-1/3 flex items-center space-x-2">
                                <Input
                                  id={`ingredients.${index}.quantity`}
                                  name={`ingredients.${index}.quantity`}
                                  type="text"
                                  label={t("quantity")}
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
                            <FontAwesomeIcon icon="trash" className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    )}
                    <Button
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
                        key={step.id}
                      >
                        <div className="w-full">
                          <TextArea
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
                          <FontAwesomeIcon icon="trash" className="h-4 w-4" />
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
                ? t("action_in_progress_edit_recipe")
                : t("edit_recipe")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
