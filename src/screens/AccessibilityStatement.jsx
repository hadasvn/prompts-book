import styles from "./AccessibilityStatement.module.css";

export default function AccessibilityStatement() {
  return (
    <section>
      <h1 className={styles.title}>הצהרת נגישות</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>מחויבות לנגישות</h2>
        <p className={styles.text}>
          אנו רואים חשיבות רבה במתן שירות שוויוני, מכבד ונגיש לכלל המשתמשים, כולל אנשים עם מוגבלות. האפליקציה
          פותחה מתוך כוונה לעמוד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013,
          ובהתבסס על המלצות התקן הישראלי (ת"י 5568) והנחיות WCAG 2.1 ברמה AA.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>התאמות הנגישות באפליקציה</h2>
        <ul className={styles.list}>
          <li>תמיכה מלאה בכיווניות מימין-לשמאל (RTL) ובשפה העברית</li>
          <li>ניגודיות צבעים שנבדקה מול הנחיות WCAG</li>
          <li>סרגל נגישות עצמאי: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים</li>
          <li>ניווט מלא באמצעות מקלדת, כולל קישור "דלג לתוכן הראשי"</li>
          <li>תמיכה בהעדפת "הפחתת תנועה" (prefers-reduced-motion) של מערכת ההפעלה</li>
          <li>תוויות טקסט (aria-label) לכפתורים ואלמנטים אינטראקטיביים</li>
          <li>טקסט חלופי (alt) לכל תמונה משמעותית</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>מגבלות ידועות</h2>
        <p className={styles.text}>
          אנו פועלים באופן שוטף לשיפור הנגישות באפליקציה. אם נתקלתם בבעיית נגישות או קושי בשימוש, נשמח לשמוע ולתקן.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>יצירת קשר בנושא נגישות</h2>
        <p className={styles.text}>לפניות בנושא נגישות ניתן לפנות אלינו בכתובת: accessibility@example.com</p>
      </div>
    </section>
  );
}
