import { gql } from "@apollo/client";
import { RECIPE_FIELDS } from "./queries";

export const CREATE_RECIPE = gql`
  ${RECIPE_FIELDS}
  mutation CreateRecipe($input: RecipeInput!) {
    createRecipe(input: $input) {
      ...RecipeFields
    }
  }
`;

export const UPDATE_RECIPE = gql`
  ${RECIPE_FIELDS}
  mutation UpdateRecipe($id: ID!, $input: RecipeInput!) {
    updateRecipe(id: $id, input: $input) {
      ...RecipeFields
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

export const TOGGLE_FAVORITE = gql`
  ${RECIPE_FIELDS}
  mutation ToggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      ...RecipeFields
    }
  }
`;
