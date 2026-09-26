import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RECIPE } from "../graphql/queries";
import { DELETE_RECIPE, TOGGLE_FAVORITE } from "../graphql/mutations";
import type { Recipe } from "../graphql/types";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import styles from "./RecipeDetailPage.module.css";

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, loading, error } = useQuery<{ recipe: Recipe | null }>(GET_RECIPE, {
    variables: { id },
  });

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

  // Deleting isn't covered by an automatic cache merge (there's no updated
  // object to merge in) — it needs an explicit eviction so the recipes list
  // query doesn't keep showing a stale, now-deleted entry.
  const [deleteRecipe, { loading: deleting }] = useMutation(DELETE_RECIPE, {
    variables: { id },
    update(cache) {
      const normalizedId = cache.identify({ __typename: "Recipe", id });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
    onCompleted: () => navigate("/"),
  });

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data?.recipe) return <ErrorMessage message="Recipe not found." />;

  const recipe = data.recipe;

  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.backLink}>
        ← Back to all recipes
      </Link>

      <div className={styles.header}>
        <span className={styles.emoji}>{recipe.emoji ?? "🍽️"}</span>
        <div>
          <h1>{recipe.title}</h1>
          {recipe.description && <p className={styles.description}>{recipe.description}</p>}
        </div>
        <button
          type="button"
          className={styles.favoriteButton}
          onClick={() => toggleFavorite({ variables: { id: recipe.id } })}
          aria-label={recipe.isFavorite ? "Unfavorite" : "Favorite"}
        >
          {recipe.isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className={styles.meta}>
        <span>⏱️ {recipe.prepTimeMinutes} min</span>
        <span>{recipe.difficulty}</span>
        {recipe.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      <section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.quantity} {ingredient.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Steps</h2>
        <ol>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <div className={styles.actions}>
        <Link to={`/recipes/${recipe.id}/edit`} className={styles.editButton}>
          Edit
        </Link>
        <button type="button" className={styles.deleteButton} onClick={() => setShowDeleteModal(true)}>
          Delete
        </button>
      </div>

      {showDeleteModal && (
        <ConfirmDeleteModal
          recipeTitle={recipe.title}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={() => deleteRecipe()}
        />
      )}
      {deleting && <Loading />}
    </div>
  );
}
