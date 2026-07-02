import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import styles from "./Profile.module.css";
import { PROFILE_FIELDS, emptyProfile } from "../data/profileFields.js";
import { storage } from "../lib/storage.js";
import { analyzeProfileCsv, analyzeProfileText } from "../lib/profileParser.js";
import ProfileField from "../components/ProfileField.jsx";
import Spinner from "../components/Spinner.jsx";
import { useToast } from "../lib/useToast.js";
import Toast from "../components/Toast.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => storage.getProfile() ?? emptyProfile());
  const [intakeText, setIntakeText] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const { message: toastMessage, show: showToast } = useToast();
  const fileInputRef = useRef(null);

  function applySuggestions(suggestions) {
    setProfile((prev) => {
      const nextFields = { ...prev.fields };
      for (const [key, suggestion] of Object.entries(suggestions)) {
        const current = nextFields[key];
        // לא דורסים שדה שכבר אושר ידנית — רק שדות מוצעים/נחזים/ריקים
        if (current?.status === "confirmed") continue;
        nextFields[key] = { value: suggestion.value, status: suggestion.status, source: "description" };
      }
      return { ...prev, fields: nextFields };
    });
  }

  function handleAnalyze() {
    if (!intakeText.trim()) return;
    const suggestions = analyzeProfileText(intakeText);
    applySuggestions(suggestions);
  }

  function handleFile(file) {
    if (!file) return;
    setFileName(file.name);
    setIsFileLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      setIntakeText(text);
      const suggestions = file.name.toLowerCase().endsWith(".csv") ? analyzeProfileCsv(text) : analyzeProfileText(text);
      applySuggestions(suggestions);
      setIsFileLoading(false);
    };
    reader.onerror = () => {
      setIsFileLoading(false);
      showToast("קריאת הקובץ נכשלה — נסו קובץ אחר");
    };
    reader.readAsText(file);
  }

  function handleFieldChange(key, value) {
    setProfile((prev) => ({
      ...prev,
      fields: { ...prev.fields, [key]: { value, status: "confirmed", source: "manual" } },
    }));
  }

  function handleConfirmAll() {
    setProfile((prev) => {
      const nextFields = {};
      for (const [key, state] of Object.entries(prev.fields)) {
        nextFields[key] =
          state.status === "suggested" || state.status === "predicted" ? { ...state, status: "confirmed" } : state;
      }
      return { ...prev, fields: nextFields };
    });
  }

  function showSaved(message) {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(""), 2500);
  }

  function handleSave() {
    storage.saveProfile(profile);
    showSaved("הפרופיל נשמר בהצלחה ✓");
  }

  function handleSaveAndGo() {
    storage.saveProfile(profile);
    navigate("/");
  }

  const hasSuggestions = Object.values(profile.fields).some(
    (f) => f.status === "suggested" || f.status === "predicted"
  );

  return (
    <section>
      <h1 className={styles.title}>פרופיל העסק שלך</h1>
      <p className={styles.subtitle}>
        מלאו פעם אחת — הפרטים ימשכו אוטומטית לכל הפרומפטים בספר.
      </p>

      <div className={styles.intakeCard}>
        <h2 className={styles.intakeHeading}>הדביקו תיאור עסק, או ייבאו קובץ</h2>
        <textarea
          className={styles.textarea}
          placeholder="הדביקו כאן תיאור חופשי של העסק שלכם — נזהה ממנו אוטומטית שדות כמו שם החברה, קהל היעד, הכאב המרכזי ועוד."
          value={intakeText}
          onChange={(e) => setIntakeText(e.target.value)}
        />

        <div
          className={isDragActive ? `${styles.dropzone} ${styles.dropzoneActive}` : styles.dropzone}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragActive(true);
          }}
          onDragLeave={() => setIsDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragActive(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
        >
          {isFileLoading ? (
            <Spinner label="קורא את הקובץ..." />
          ) : (
            <span>גררו לכאן קובץ .md או .csv, או לחצו לבחירה</span>
          )}
          {fileName && !isFileLoading && <span className={styles.fileName}>{fileName}</span>}
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.csv,text/markdown,text/csv"
            className="visually-hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <div className={styles.actionsRow}>
          <button type="button" className={styles.primaryButton} onClick={handleAnalyze} disabled={!intakeText.trim()}>
            נתח אוטומטית
          </button>
          {hasSuggestions && (
            <button type="button" className={styles.secondaryButton} onClick={handleConfirmAll}>
              אשר את כל ההצעות
            </button>
          )}
        </div>
      </div>

      <div className={styles.fieldsGrid}>
        {PROFILE_FIELDS.map((field) => (
          <ProfileField key={field.key} field={field} state={profile.fields[field.key]} onChange={handleFieldChange} />
        ))}
      </div>

      <div className={styles.footerActions}>
        <button type="button" className={styles.primaryButton} onClick={handleSaveAndGo}>
          שמור וגש לפרומפטים
        </button>
        <button type="button" className={styles.secondaryButton} onClick={handleSave}>
          שמור פרופיל
        </button>
        {savedMessage && <span className={styles.savedMessage}>{savedMessage}</span>}
      </div>
      <Toast message={toastMessage} />
    </section>
  );
}
