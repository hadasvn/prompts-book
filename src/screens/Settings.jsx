import { useState } from "react";
import styles from "./Settings.module.css";
import { storage } from "../lib/storage.js";
import { getProfileStatus } from "../lib/profileStatus.js";
import ProfileStatusBanner from "../components/ProfileStatusBanner.jsx";
import { useToast } from "../lib/useToast.js";
import Toast from "../components/Toast.jsx";

export default function Settings() {
  const [settings, setSettings] = useState(() => storage.getSettings());
  const [profileStatus] = useState(() => getProfileStatus(storage.getProfile()));
  const { message, show } = useToast();

  function handleSaveDefaults() {
    storage.saveSettings({ defaultLanguage: settings.defaultLanguage, defaultTone: settings.defaultTone });
    show("ברירות המחדל נשמרו ✓");
  }

  function toggleAutoSuggest() {
    const next = { ...settings, autoSuggestEnabled: !settings.autoSuggestEnabled };
    setSettings(next);
    storage.saveSettings({ autoSuggestEnabled: next.autoSuggestEnabled });
  }

  return (
    <section>
      <h1 className={styles.title}>הגדרות</h1>
      <p className={styles.subtitle}>העדפות שחלות על כל הפרומפטים בספר.</p>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>סטטוס פרופיל</h2>
        <ProfileStatusBanner status={profileStatus} />
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>שמירת קבצים</h2>
        <p className={styles.cardHelp}>
          כפתורי "שמור כקובץ" באפליקציה מורידים את הקובץ לתיקיית ההורדות הרגילה של הדפדפן. כדי שקבצים יישמרו ישירות
          לתיקיית ה-Drive שלכם, אפשר להגדיר בדפדפן שתיקיית ההורדות שלו תהיה תיקיית ה-Drive (בהגדרות הדפדפן → הורדות).
        </p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>שפה וטון ברירת מחדל</h2>
        <p className={styles.cardHelp}>ישמשו למילוי אוטומטי כשפרופיל העסק עדיין לא כולל שפה/טון משלו.</p>

        <div className={styles.fieldRow}>
          <label className={styles.fieldLabel} htmlFor="default-language">
            שפה ברירת מחדל
          </label>
          <input
            id="default-language"
            className={styles.textInput}
            value={settings.defaultLanguage}
            onChange={(e) => setSettings((s) => ({ ...s, defaultLanguage: e.target.value }))}
          />
        </div>

        <div className={styles.fieldRow}>
          <label className={styles.fieldLabel} htmlFor="default-tone">
            טון ברירת מחדל
          </label>
          <input
            id="default-tone"
            className={styles.textInput}
            placeholder="לדוגמה: ידידותי ומקצועי"
            value={settings.defaultTone}
            onChange={(e) => setSettings((s) => ({ ...s, defaultTone: e.target.value }))}
          />
        </div>

        <button type="button" className={styles.primaryButton} onClick={handleSaveDefaults}>
          שמור ברירות מחדל
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.toggleRow}>
          <div className={styles.toggleText}>
            <span className={styles.toggleLabel}>הצעות אוטומטיות</span>
            <span className={styles.toggleHelp}>מילוי אוטומטי של placeholders מהפרופיל בעת פתיחת פרומפט</span>
          </div>
          <label className={styles.switch}>
            <input type="checkbox" checked={settings.autoSuggestEnabled} onChange={toggleAutoSuggest} />
            <span className={styles.switchTrack} />
          </label>
        </div>
      </div>

      <Toast message={message} />
    </section>
  );
}
