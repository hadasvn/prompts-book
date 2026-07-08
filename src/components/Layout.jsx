import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import Footer from "./Footer.jsx";
import { BookIcon, UserIcon, ChartIcon, BookmarkIcon, SettingsIcon } from "./icons.jsx";
import { storage } from "../lib/storage.js";
import { PROFILE_FIELDS } from "../data/profileFields.js";

const NAV_ITEMS = [
  { to: "/", label: "ספר הפרומפטים", end: true, Icon: BookIcon },
  { to: "/profile", label: "העסק שלי", Icon: UserIcon },
  { to: "/analyze", label: "יבוא", Icon: ChartIcon },
  { to: "/library", label: "שמורים שלי", Icon: BookmarkIcon },
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
            <img src={`${import.meta.env.BASE_URL}assets/logo-robot-single.png`} alt="" />
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
              <span className={styles.badgeIcon}>
                <item.Icon size={18} />
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/profile" className={styles.profileWidget}>
          <div className={styles.ringWrap}>
            <svg width="46" height="46" viewBox="0 0 46 46">
              <circle className={styles.ringTrack} cx="23" cy="23" r="18.5" />
              <circle
                className={styles.ringFill}
                cx="23"
                cy="23"
                r="18.5"
                strokeDasharray={`${(percent / 100) * 116.2} 116.2`}
              />
            </svg>
            <span className={styles.ringPct}>{percent}%</span>
          </div>
          <div>
            <div className={styles.profileWidgetTitle}>ההתקדמות שלכם בפרופיל</div>
            <div className={styles.profileWidgetText}>פרופיל מוכן {percent < 100 ? "חלקית" : "במלואו"}.</div>
          </div>
        </Link>
      </aside>

      <main id="main-content" className={styles.main}>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
