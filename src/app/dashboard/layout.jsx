"use client";

import React, { useState } from "react";
import styles from "./DashboardLayout.module.css";
import {
  FaBars,
  FaTachometerAlt,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaTags,
  FaCog,
  FaSignOutAlt,
  FaSearch,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { href: "/dashboard/profile", label: "Profile", icon: <FaBox /> },
    // {
    //   href: "/dashboard/my-bonus",
    //   label: "My Bouns",
    //   icon: <FaShoppingCart />,
    // },
    // { href: "/dashboard/orders", label: "Orders", icon: <FaShoppingCart /> },
    { href: "/dashboard/kyc", label: "KYC", icon: <FaUsers /> },
    { href: "/dashboard/level", label: "Level", icon: <FaTags /> },
    {
      href: "/dashboard/transaction-history",
      label: "Transaction History",
      icon: <FaCog />,
    },
    { href: "/dashboard/support", label: "Support", icon: <FaCog /> },
  ];

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <div className={styles.logoDot} />
          <div>
            <div className={styles.brandTitle}>MyStore</div>
            <div className={styles.brandSub}>User Panel</div>
          </div>

          <button
            className={`${styles.iconBtn} ${styles.closeBtn}`}
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            type="button"
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname?.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.active : ""}`}
                onClick={() => setOpen(false)}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} type="button">
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
          <div className={styles.footerHint}>
            © {new Date().getFullYear()} MyStore
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      <div
        className={`${styles.backdrop} ${open ? styles.backdropShow : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Main */}
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button
            className={styles.iconBtn}
            onClick={() => setOpen(true)}
            aria-label="Open sidebar"
            type="button"
          >
            <FaBars />
          </button>

          <div className={styles.topbarRight}>
            <button
              className={styles.iconBtn}
              type="button"
              aria-label="Notifications"
            >
              <FaBell />
              <span className={styles.dot} />
            </button>

            <div className={styles.userChip}>
              <div className={styles.avatar}>A</div>
              <div className={styles.userText}>
                <div className={styles.userName}>User Name</div>
                <div className={styles.userRole}>User</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className={styles.content}>
          <div className="container-fluid">{children}</div>
        </main>
      </div>
    </div>
  );
}
