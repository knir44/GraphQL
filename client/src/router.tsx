import { Routes, Route } from "react-router-dom";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { NewRecipePage } from "./pages/NewRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      <Route path="/recipes/new" element={<NewRecipePage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route path="/recipes/:id/edit" element={<EditRecipePage />} />
    </Routes>
  );
}
