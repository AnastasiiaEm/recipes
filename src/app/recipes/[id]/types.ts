type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: { original: string }[];
  readyInMinutes: number;
  servings: number;
};
