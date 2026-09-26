import styles from "./ConfirmDeleteModal.module.css";

interface ConfirmDeleteModalProps {
  recipeTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({ recipeTitle, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.icon}>🗑️</div>
        <h2>Delete "{recipeTitle}"?</h2>
        <p>This can't be undone.</p>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className={styles.deleteButton} onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
