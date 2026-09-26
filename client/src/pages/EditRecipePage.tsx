import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RECIPE } from "../graphql/queries";
import { UPDATE_RECIPE } from "../graphql/mutations";
import type { Recipe, RecipeInput } from "../graphql/types";
import { RecipeForm } from "../components/RecipeForm";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";

function toInput(recipe: Recipe): RecipeInput {
  return {
    title: recipe.title,
    description: recipe.description,
    emoji: recipe.emoji,
    imageUrl: recipe.imageUrl,
    prepTimeMinutes: recipe.prepTimeMinutes,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
    steps: recipe.steps,
    ingredients: recipe.ingredients.map(({ name, quantity }) => ({ name, quantity })),
  };
}

export function EditRecipePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<{ recipe: Recipe | null }>(GET_RECIPE, {
    variables: { id },
  });

  // updateRecipe's response includes id + __typename matching the cached
  // Recipe, so Apollo merges the new field values into the existing cache
  // entry automatically — no refetchQueries or manual cache write needed.
  const [updateRecipe, { loading: saving, error: saveError }] = useMutation(UPDATE_RECIPE, {
    onCompleted: () => navigate(`/recipes/${id}`),
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.recipe) return <ErrorMessage message="Recipe not found." />;

  function handleSubmit(input: RecipeInput) {
    updateRecipe({ variables: { id, input } });
  }

  return (
    <div>
      <h1>Edit Recipe ✏️</h1>
      {saveError && <ErrorMessage message={saveError.message} />}
      <RecipeForm
        initialValue={toInput(data.recipe)}
        submitLabel="Save Changes"
        onSubmit={handleSubmit}
        isSubmitting={saving}
      />
    </div>
  );
}
