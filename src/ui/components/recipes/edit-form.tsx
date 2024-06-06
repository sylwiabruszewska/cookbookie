"use client";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import { notFound, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

import { Input } from "@ui/components/add-recipe/input";
import { Select } from "@ui/components/add-recipe/select";
import { TextArea } from "@ui/components/add-recipe/textarea";
import { TimePicker } from "@ui/components/add-recipe/time-picker";
import { Switch } from "@ui/components/add-recipe/switch";
import { FileUpload } from "@ui/components/add-recipe/file-upload";
import { Button } from "@/ui/components/button";
import {
  Category,
  Ingredient,
  RecipeFormProps,
  RecipeWithFavoriteStatus,
  Step,
} from "@/lib/definitions";
import { recipeValidationSchema } from "@utils/validationSchemas";
import { updateRecipe } from "@lib/actions";
import { useEdgeStore } from "@lib/edgestore";

export default function EditForm({
  categories,
  recipe,
}: {
  categories: Category[];
  recipe: RecipeWithFavoriteStatus;
}) {
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
    images: recipe.images.length > 0 ? [recipe.images[0]] : [],
    description: `${recipe.description}`,
    category: `${selectedCategoryName}`,
    cookingTime: `${recipe.cooking_time}`,
    ingredients: recipe.ingredients.map((ingredient) => ({
      id: ingredient.id,
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
      quantityUnit: ingredient.quantityUnit,
    })),
    steps: recipe.steps.map((step) => ({
      id: step.id,
      step: step.step,
    })),
    isPublic: recipe.is_public,
  };

  const confirmUploads = async (fileUrls: string[]) => {
    try {
      for (const urlToConfirm of fileUrls) {
        await edgestore.publicFiles.confirmUpload({ url: urlToConfirm });
        console.log(`Confirmed upload for ${urlToConfirm}`);
      }
      console.log("All uploads confirmed successfully.");
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

      let recipeImages;

      if (fileUrls.length > 0) {
        confirmUploads(fileUrls);
        recipeImages = fileUrls;
      } else {
        recipeImages = ["/placeholder.png"];
      }

      const recipe = {
        images: recipeImages,
        title: values.title,
        description: values.description,
        category: selectedCategory.id,
        cookingTime: values.cookingTime,
        ingredients: values.ingredients,
        steps: values.steps,
        isPublic: values.isPublic,
      };

      const response = await updateRecipe(recipeId, recipe);

      if (!response) {
        throw new Error("Failed to submit recipe");
      }

      toast.success("Recipe updated successfully! Time to get cooking 👨‍🍳");
      router.push(`/dashboard/recipes/${recipeId}`);
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="heading-l">Edit recipe</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form className="mb-8 flex flex-col gap-4">
            <FileUpload
              onFilesUploaded={handleFilesUploaded}
              initialImages={recipe.images}
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
              <TextArea
                id="description"
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
                        className="flex justify-between space-x-2 mb-2 align-center"
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
                          className="btn-icon"
                          onClick={() => remove(index)}
                        >
                          <FontAwesomeIcon
                            icon={faXmark}
                            aria-label="Remove"
                            className="h-4 w-4 mt-0"
                          />
                        </Button>
                      </div>
                    )
                  )}
                  <Button
                    className="btn-green mb-4 ml-auto h-10 w-10"
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
                        className="btn-icon"
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
                    className="btn-green mb-4 ml-auto h-10 w-10"
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

            <Switch name="isPublic" />

            <Button
              className="mx-auto mt-10 btn-rounded"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating recipe..." : "Edit recipe"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
