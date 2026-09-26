import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE } from "../graphql/mutations";
import { GET_RECIPES } from "../graphql/queries";
import type { Recipe, RecipeInput } from "../graphql/types";
import { RecipeForm } from "../components/RecipeForm";
import { ErrorMessage } from "../components/ErrorMessage";

export function NewRecipePage() {
  const navigate = useNavigate();

  // refetchQueries is the simplest way to keep the list in sync after a
  // create — it re-runs GET_RECIPES rather than surgically inserting the
  // new recipe into the cache. See RecipeDetailPage's delete flow for the
  // more surgical `cache.evict` approach.
  const [createRecipe, { loading, error }] = useMutation<{ createRecipe: Recipe }>(CREATE_RECIPE, {
    refetchQueries: [{ query: GET_RECIPES }],
    onCompleted: (data) => navigate(`/recipes/${data.createRecipe.id}`),
  });

  function handleSubmit(input: RecipeInput) {
    createRecipe({ variables: { input } });
  }

  return (
    <div>
      <h1>New Recipe 🍳</h1>
      {error && <ErrorMessage message={error.message} />}
      <RecipeForm submitLabel="Create Recipe" onSubmit={handleSubmit} isSubmitting={loading} />
    </div>
  );
}
