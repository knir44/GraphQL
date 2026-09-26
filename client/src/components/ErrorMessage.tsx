import styles from "./ErrorMessage.module.css";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className={styles.wrapper} role="alert">
      <span aria-hidden="true">😕</span> {message}
    </div>
  );
}
