import { gql } from "@apollo/client";

// Shared field selection so the list and detail queries always ask for the
// same shape — this also matters for Apollo's cache: create/update mutations
// return this same shape, letting the cache auto-merge without extra code.
export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    title
    description
    emoji
    imageUrl
    prepTimeMinutes
    difficulty
    tags
    isFavorite
    ingredients {
      id
      name
      quantity
    }
    steps
    createdAt
    updatedAt
  }
`;

export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query GetRecipes($search: String, $tag: String, $difficulty: Difficulty) {
    recipes(search: $search, tag: $tag, difficulty: $difficulty) {
      ...RecipeFields
    }
  }
`;

export const GET_RECIPE = gql`
  ${RECIPE_FIELDS}
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      ...RecipeFields
    }
  }
`;
