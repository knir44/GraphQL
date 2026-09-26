import type { IngredientInput } from "../graphql/types";
import styles from "./IngredientListEditor.module.css";

interface IngredientListEditorProps {
  ingredients: IngredientInput[];
  onChange: (ingredients: IngredientInput[]) => void;
}

export function IngredientListEditor({ ingredients, onChange }: IngredientListEditorProps) {
  function updateRow(index: number, field: keyof IngredientInput, value: string) {
    onChange(ingredients.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  }

  function removeRow(index: number) {
    onChange(ingredients.filter((_, i) => i !== index));
  }

  function addRow() {
    onChange([...ingredients, { name: "", quantity: "" }]);
  }

  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={index} className={styles.row}>
          <input
            placeholder="Ingredient (e.g. Flour)"
            value={ingredient.name}
            onChange={(e) => updateRow(index, "name", e.target.value)}
          />
          <input
            placeholder="Quantity (e.g. 2 cups)"
            value={ingredient.quantity}
            onChange={(e) => updateRow(index, "quantity", e.target.value)}
          />
          <button type="button" className={styles.removeButton} onClick={() => removeRow(index)} aria-label="Remove ingredient">
            ✕
          </button>
        </div>
      ))}
      <button type="button" className={styles.addButton} onClick={addRow}>
        + Add ingredient
      </button>
    </div>
  );
}
