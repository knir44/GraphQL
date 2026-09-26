import { Link } from "react-router-dom";
import { AppRoutes } from "./router";
import styles from "./App.module.css";

export function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          🍲 Recipe Box
        </Link>
      </header>
      <main className={styles.main}>
        <AppRoutes />
      </main>
    </div>
  );
}
