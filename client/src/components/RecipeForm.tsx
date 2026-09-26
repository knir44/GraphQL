import { useState, type FormEvent } from "react";
import type { Difficulty, RecipeInput } from "../graphql/types";
import { IngredientListEditor } from "./IngredientListEditor";
import styles from "./RecipeForm.module.css";

const EMPTY_FORM: RecipeInput = {
  title: "",
  description: "",
  emoji: "🍽️",
  prepTimeMinutes: 30,
  difficulty: "EASY",
  tags: [],
  ingredients: [{ name: "", quantity: "" }],
  steps: [""],
};

interface RecipeFormProps {
  initialValue?: RecipeInput;
  submitLabel: string;
  onSubmit: (input: RecipeInput) => void;
  isSubmitting?: boolean;
}

export function RecipeForm({ initialValue, submitLabel, onSubmit, isSubmitting }: RecipeFormProps) {
  const [form, setForm] = useState<RecipeInput>(initialValue ?? EMPTY_FORM);
  const [tagsText, setTagsText] = useState((initialValue?.tags ?? []).join(", "));
  const [stepsText, setStepsText] = useState((initialValue?.steps ?? [""]).join("\n"));

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    onSubmit({
      ...form,
      tags: tagsText
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      steps: stepsText
        .split("\n")
        .map((step) => step.trim())
        .filter(Boolean),
      ingredients: form.ingredients.filter((ing) => ing.name.trim() && ing.quantity.trim()),
    });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.emojiField}>
          Emoji
          <input
            value={form.emoji ?? ""}
            onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            maxLength={4}
          />
        </label>

        <label className={styles.grow}>
          Title
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Grandma's Chicken Soup"
          />
        </label>
      </div>

      <label>
        Description
        <textarea
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
          placeholder="A short, comforting description…"
        />
      </label>

      <div className={styles.row}>
        <label>
          Prep time (minutes)
          <input
            type="number"
            min={1}
            required
            value={form.prepTimeMinutes}
            onChange={(e) => setForm({ ...form, prepTimeMinutes: Number(e.target.value) })}
          />
        </label>

        <label>
          Difficulty
          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value as Difficulty })}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
        </label>
      </div>

      <label>
        Tags (comma-separated)
        <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="dinner, quick, vegetarian" />
      </label>

      <label>
        Ingredients
        <IngredientListEditor
          ingredients={form.ingredients}
          onChange={(ingredients) => setForm({ ...form, ingredients })}
        />
      </label>

      <label>
        Steps (one per line)
        <textarea
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          rows={5}
          placeholder={"Chop the vegetables.\nSimmer for 20 minutes.\n..."}
        />
      </label>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
