// Hand-written types mirroring server/src/schema/schema.graphql.
// (A later exercise: generate these automatically with GraphQL Code Generator.)

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  emoji: string | null;
  imageUrl: string | null;
  ingredients: Ingredient[];
  steps: string[];
  prepTimeMinutes: number;
  difficulty: Difficulty;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IngredientInput {
  name: string;
  quantity: string;
}

export interface RecipeInput {
  title: string;
  description?: string | null;
  emoji?: string | null;
  imageUrl?: string | null;
  ingredients: IngredientInput[];
  steps: string[];
  prepTimeMinutes: number;
  difficulty: Difficulty;
  tags: string[];
}
