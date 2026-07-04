import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import A11yToolbar from "./A11yToolbar.jsx";
import { BookIcon, UserIcon, ChartIcon, BookmarkIcon, SettingsIcon } from "./icons.jsx";
import { storage } from "../lib/storage.js";
import { PROFILE_FIELDS } from "../data/profileFields.js";

const NAV_ITEMS = [
  { to: "/", label: "ספר הפרומפטים", end: true, Icon: BookIcon },
  { to: "/profile", label: "פרופיל העסק", Icon: UserIcon },
  { to: "/analyze", label: "ניתוח וייבוא", Icon: ChartIcon },
  { to: "/library", label: "פרומפטים שמורים", Icon: BookmarkIcon },
  { to: "/settings", label: "הגדרות", Icon: SettingsIcon },
];

function useProfileCompletion() {
  const [percent] = useState(() => {
    const profile = storage.getProfile();
    const total = PROFILE_FIELDS.length;
    const filled = PROFILE_FIELDS.filter((f) => profile.fields[f.key]?.value?.trim()).length;
    return Math.round((filled / total) * 100);
  });
  return percent;
}

export default function Layout() {
  const percent = useProfileCompletion();

  return (
    <div className={styles.page}>
      <a href="#main-content" className="visually-hidden">
        דלג לתוכן הראשי
      </a>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/favicon.svg" alt="" />
          </div>
          <div className={styles.brandTitle}>
            ספר פרומפטים
            <br />
            חכם
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
              <item.Icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/profile" className={styles.profileWidget}>
          <div className={styles.profileWidgetTitle}>פרופיל מוכן {percent < 100 ? "חלקית" : "במלואו"}</div>
          <div className={styles.profileWidgetText}>השלימו אותו שהפרומפטים ימולאו אוטומטית.</div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${percent}%` }} />
          </div>
        </Link>
      </aside>

      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <A11yToolbar />
    </div>
  );
}
