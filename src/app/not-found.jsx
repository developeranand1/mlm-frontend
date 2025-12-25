"use client";

import Link from "next/link";
import { IoHomeOutline, IoWarningOutline } from "react-icons/io5";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.section}>
      {/* <div className="container text-center"> */}
        <div className={styles.card}>
          <div className={styles.iconWrap}>
            <IoWarningOutline />
          </div>

          <h1 className={styles.code}>404</h1>
          <h2 className={styles.title}>Page Not Found</h2>

          <p className={styles.desc}>
            Oops! The page you’re looking for doesn’t exist or has been moved.
            Let’s get you back on track.
          </p>

          <div className={styles.actions}>
            <Link href="/" className={styles.btnPrimary}>
              <IoHomeOutline />
              Go to Home
            </Link>

            <Link href="/contact-us" className={styles.btnSecondary}>
              Contact Support
            </Link>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}
