import type { Recipe } from "../graphql/types";
import { RecipeCard } from "./RecipeCard";
import styles from "./RecipeList.module.css";

interface RecipeListProps {
  recipes: Recipe[];
  onToggleFavorite: (id: string) => void;
}

export function RecipeList({ recipes, onToggleFavorite }: RecipeListProps) {
  if (recipes.length === 0) {
    return <p className={styles.empty}>No recipes found. Try a different search, or add one! 🍲</p>;
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={onToggleFavorite} />
      ))}
    </div>
  );
}
