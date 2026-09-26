import styles from "./Loading.module.css";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.spinner} role="img" aria-label="loading">
        🍳
      </span>
      <p>Cooking up your recipes…</p>
    </div>
  );
}
