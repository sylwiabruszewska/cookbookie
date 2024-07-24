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
  key: string;
};

export type Recipe = {
  id: string;
  images: string[];
  title: string;
  description: string;
  category_id: Category["id"];
  cooking_time: string;
  ingredients: Ingredient[];
  steps: Step[];
  is_public: boolean;
  owner_id?: User["id"];
};

export interface RecipeWithFavoriteStatus extends Recipe {
  is_favorite: boolean;
}

export interface Ingredient {
  id: string;
  ingredient: string;
  quantity: string;
}

export interface IngredientInShoppingList {
  id: string;
  recipe_id: string;
  recipe_title: string;
  ingredient: string;
  quantity: string;
}

export interface IngredientSelect {
  id: string;
  name: string;
}

export interface IngredientDb {
  id: string;
  name: string;
  key: string;
}

export interface Step {
  id: string;
  step: string;
}

export interface RecipeFormProps {
  images?: string[];
  title: string;
  description: string;
  category: string;
  cookingTime: string;
  ingredients: Ingredient[];
  steps: Step[];
  isPublic: boolean;
}
