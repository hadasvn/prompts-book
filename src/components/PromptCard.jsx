import { useNavigate } from "react-router-dom";
import styles from "./PromptCard.module.css";
import { categoryLabel } from "../data/categories.js";
import { extractPlaceholders } from "../data/promptsCatalog.js";

export default function PromptCard({ prompt }) {
  const navigate = useNavigate();
  const fieldsCount = extractPlaceholders(prompt.template).length;

  function open() {
    navigate(`/prompt/${prompt.id}`);
  }

  return (
    <article
      className={styles.card}
      onClick={open}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className={styles.topRow}>
        <h3 className={styles.title}>{prompt.title}</h3>
        <span className={styles.categoryTag}>{categoryLabel(prompt.category)}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.rowLabel}>תפקיד ה-AI</span>
        <span className={styles.rowValue}>{prompt.aiRole}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.rowLabel}>קלט נדרש</span>
        <span className={styles.rowValue}>{prompt.requiredInput}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.rowLabel}>תוצר עסקי</span>
        <span className={styles.rowValue}>{prompt.businessOutput}</span>
      </div>

      <div className={styles.footer}>
        <span className={styles.fieldsCount}>{fieldsCount} שדות למילוי</span>
        <button type="button" className={styles.openButton} onClick={open}>
          פתח
        </button>
      </div>
    </article>
  );
}
