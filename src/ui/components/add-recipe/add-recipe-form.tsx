"use client";

import Image from "next/image";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik, Form, FormikHelpers, FieldArray, ErrorMessage } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

export default function AddRecipeForm({ categories }: CategoriesProps) {
  const router = useRouter();

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
        images: ["/pancakes.png"],
        category: selectedCategory.id,
      };

      const response = await addRecipe(recipe);

      if (!response) {
        throw new Error("Failed to submit recipe");
      }

      toast.success("Recipe added successfully! Time to get cooking 👨‍🍳");
      router.push("/dashboard/my-recipes");
    } catch (error) {
      toast.error("Oops! Something went wrong. Please try again soon.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="heading-l">Add recipe</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={recipeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mb-8 flex flex-col gap-4">
            <FileUpload />

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

                        <Button variant="icon" onClick={() => remove(index)}>
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

                      <Button variant="icon" onClick={() => remove(index)}>
                        <FontAwesomeIcon
                          icon={faXmark}
                          aria-label="Remove"
                          className="h-4 w-4"
                        />
                      </Button>
                    </div>
                  ))}
                  <Button
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

            <Switch name="isPublic" />

            <Button
              variant="crazyRounded"
              className="mx-auto mt-10"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding recipe..." : "Add recipe"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
