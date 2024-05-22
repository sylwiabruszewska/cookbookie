export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  image: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Recipe = {
  id: string;
  images: string[];
  title: string;
  description: string;
  category: Category;
  cookingTime: string;
  ingredients: Ingredient[];
  steps: Step[];
  isPublic: boolean;
  owner: User["id"];
};

export interface Ingredient {
  id: string;
  ingredient: string;
  quantity: string;
  quantityUnit: string;
}

export interface Step {
  id: string;
  step: string;
}

export interface CategoriesProps {
  categories: Category[];
}
