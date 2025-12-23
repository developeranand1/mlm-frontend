"use client";

import React from "react";
import styles from "./WhyChoose.module.css";
import { FaTruck, FaLock, FaCheckCircle, FaHeadset, FaMedal, FaLink } from "react-icons/fa";

export default function WhyChoose() {
  const features = [
    {
      icon: <FaTruck />,
      title: "Free shipping in Pan India",
      desc: "Fast, tracked delivery across India. 30-day easy returns.",
    },
    {
      icon: <FaLock />,
      title: "Secure payments",
      desc: "UPI, cards & wallets — encrypted end-to-end.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Quality assurance",
      desc: "Every product hand-checked and ethically sourced.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 customer support",
      desc: "Support on chat, email & WhatsApp.",
    },
    {
      icon: <FaMedal />,
      title: "100% genuine and quality-tested products",
      desc: "Authenticity guaranteed with every order.",
    },
    {
      icon: <FaLink />,
      title: "Simple and rewarding affiliate structure",
      desc: "Earn commission by sharing your unique referral link.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Why Choose Old as Gold?</h2>

        <div className="row g-4">
          {features.map((f, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className={styles.card}>
                <div className={styles.iconBox}>{f.icon}</div>
                <div>
                  <div className={styles.title}>{f.title}</div>
                  <div className={styles.desc}>{f.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.greenGlow} aria-hidden="true" />
      </div>
    </section>
  );
}
