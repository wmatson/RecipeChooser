

export interface Ingredient {
  amount:string;
  name:string;
}

export interface IngredientCategory {
  category: string;
  ingredients: Ingredient[];
}

export interface Recipe {
  name: string;
  ingredients: IngredientCategory[];
  link: string;
}
