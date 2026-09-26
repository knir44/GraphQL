import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_RECIPES } from "../graphql/queries";
import { TOGGLE_FAVORITE } from "../graphql/mutations";
import type { Difficulty, Recipe } from "../graphql/types";
import { RecipeList } from "../components/RecipeList";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import styles from "./RecipesPage.module.css";

export function RecipesPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty | "">("");

  const { data, loading, error } = useQuery<{ recipes: Recipe[] }>(GET_RECIPES, {
    variables: {
      search: search || undefined,
      difficulty: difficulty || undefined,
    },
  });

  // toggleFavorite returns the same RecipeFields shape as the list query,
  // including id + __typename, so Apollo's normalized cache merges the
  // updated isFavorite value automatically — no manual cache code needed.
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE);

  return (
    <div>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="🔍 Search recipes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty | "")}>
          <option value="">All difficulties</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>

        <Link to="/recipes/new" className={styles.newButton}>
          + New Recipe
        </Link>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <RecipeList
          recipes={data.recipes}
          onToggleFavorite={(id) => toggleFavorite({ variables: { id } })}
        />
      )}
    </div>
  );
}
