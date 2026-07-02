import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import A11yToolbar from "./A11yToolbar.jsx";

const NAV_ITEMS = [
  { to: "/", label: "ספר הפרומפטים", end: true },
  { to: "/profile", label: "פרופיל העסק" },
  { to: "/analyze", label: "ניתוח וייבוא" },
  { to: "/library", label: "פרומפטים שמורים" },
  { to: "/settings", label: "הגדרות" },
];

export default function Layout() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="visually-hidden">
        דלג לתוכן הראשי
      </a>
      <header className={styles.header}>
        <div className={styles.brand}>
          <div>
            <div className={styles.brandTitle}>ספר פרומפטים חכם</div>
            <div className={styles.brandSubtitle}>ספר פרומפטים חכם לעסק שלך</div>
          </div>
        </div>
        <nav className={styles.nav} aria-label="ניווט ראשי">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <A11yToolbar />
    </div>
  );
}
