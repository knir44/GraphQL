import { Link } from "react-router-dom";
import type { Recipe } from "../graphql/types";
import styles from "./RecipeCard.module.css";

const DIFFICULTY_LABEL: Record<Recipe["difficulty"], string> = {
  EASY: "🟢 Easy",
  MEDIUM: "🟡 Medium",
  HARD: "🔴 Hard",
};

interface RecipeCardProps {
  recipe: Recipe;
  onToggleFavorite: (id: string) => void;
}

export function RecipeCard({ recipe, onToggleFavorite }: RecipeCardProps) {
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.favoriteButton}
        aria-label={recipe.isFavorite ? "Unfavorite" : "Favorite"}
        onClick={() => onToggleFavorite(recipe.id)}
      >
        {recipe.isFavorite ? "❤️" : "🤍"}
      </button>

      <Link to={`/recipes/${recipe.id}`} className={styles.link}>
        <div className={styles.emoji}>{recipe.emoji ?? "🍽️"}</div>
        <h3 className={styles.title}>{recipe.title}</h3>
        {recipe.description && <p className={styles.description}>{recipe.description}</p>}

        <div className={styles.meta}>
          <span>{DIFFICULTY_LABEL[recipe.difficulty]}</span>
          <span>⏱️ {recipe.prepTimeMinutes} min</span>
        </div>

        {recipe.tags.length > 0 && (
          <div className={styles.tags}>
            {recipe.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
