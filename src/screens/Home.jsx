import { useMemo, useState } from "react";
import styles from "./Home.module.css";
import { CATEGORIES, categoryLabel } from "../data/categories.js";
import { getAllPrompts } from "../lib/promptsRepo.js";
import PromptCard from "../components/PromptCard.jsx";
import ProfileStatusBanner from "../components/ProfileStatusBanner.jsx";
import { storage } from "../lib/storage.js";
import { getProfileStatus } from "../lib/profileStatus.js";
import { trackEvent } from "../lib/analytics.js";
import { SearchIcon } from "../components/icons.jsx";

export default function Home() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].key);
  const [query, setQuery] = useState("");
  const [profileStatus] = useState(() => getProfileStatus(storage.getProfile()));
  const [allPrompts] = useState(() => getAllPrompts());

  const trimmedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!trimmedQuery) {
      return allPrompts.filter((p) => p.category === activeTab);
    }
    return allPrompts.filter((p) =>
      [p.title, p.aiRole, p.requiredInput, p.businessOutput, p.helperText].some((field) =>
        field.toLowerCase().includes(trimmedQuery)
      )
    );
  }, [activeTab, trimmedQuery]);

  const groupedResults = useMemo(() => {
    if (!trimmedQuery) return null;
    const groups = new Map();
    for (const prompt of results) {
      if (!groups.has(prompt.category)) groups.set(prompt.category, []);
      groups.get(prompt.category).push(prompt);
    }
    return groups;
  }, [results, trimmedQuery]);

  return (
    <section>
      <div className={styles.intro}>
        <h1 className={styles.title}>ספר הפרומפטים</h1>
        <p className={styles.subtitle}>ספר פרומפטים חכם לעסק שלך</p>
      </div>

      <ProfileStatusBanner status={profileStatus} />

      <div className={styles.controls}>
        <div className={styles.tabs} role="tablist" aria-label="קטגוריות פרומפטים">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.key && !trimmedQuery;
            const count = allPrompts.filter((p) => p.category === cat.key).length;
            return (
              <button
                key={cat.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab}
                onClick={() => {
                  setActiveTab(cat.key);
                  setQuery("");
                  trackEvent("tab_view", { tab: cat.key });
                }}
              >
                <span className={styles.tabDot} style={{ background: cat.color }} aria-hidden="true" />
                {cat.label}
                <span className={styles.tabCount}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.searchWrap}>
          <label htmlFor="prompt-search" className="visually-hidden">
            חיפוש פרומפטים
          </label>
          <SearchIcon size={17} className={styles.searchIcon} />
          <input
            id="prompt-search"
            type="search"
            className={styles.searchInput}
            placeholder="חיפוש פרומפט לפי שם, תפקיד או תוצר..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {results.length === 0 && <p className={styles.empty}>לא נמצאו פרומפטים מתאימים.</p>}

      {groupedResults
        ? Array.from(groupedResults.entries()).map(([category, prompts]) => (
            <div key={category}>
              <div className={styles.sectionHeading}>
                <h2>{categoryLabel(category)}</h2>
                <span>{prompts.length} פרומפטים</span>
              </div>
              <div className={styles.grid}>
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </div>
          ))
        : (
            <>
              {results.length > 0 && (
                <div className={styles.sectionHeading}>
                  <h2>{categoryLabel(activeTab)}</h2>
                  <span>{results.length} פרומפטים</span>
                </div>
              )}
              <div className={styles.grid}>
                {results.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </>
          )}
    </section>
  );
}
