"use client";

import React, { useState } from "react";
import styles from "./FaqSection.module.css";
import { IoChevronDownOutline } from "react-icons/io5";

export default function FaqSection() {
  const faqs = [
    {
      q: "What is Alkaline Water and why is it beneficial?",
      a: "Alkaline water typically has a higher pH than regular drinking water. Many people prefer it for taste and hydration. Benefits can vary by individual.",
    },
    {
      q: "What makes Old As Gold different from other brands?",
      a: "Old As Gold offers premium-quality products along with an innovative affiliate system—combining wellness and earning potential in one trusted brand.",
    },
    {
      q: "How do I place an order and track delivery?",
      a: "You can place an order from the website/app. After checkout, you’ll receive tracking details via your account/email/SMS once shipped.",
    },
    {
      q: "Do you offer returns or replacements?",
      a: "Yes, depending on the product category and policy. If your item arrives damaged or incorrect, request support within the allowed time window.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(1); // default open like screenshot

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? -1 : i));

  return (
    <section className={`py-5 ${styles.section}`}>
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className={styles.title}>
            Frequently Asked <span>Questions</span>
          </h2>
          <p className={styles.subtitle}>
            Got questions about Old As Gold’s products, membership, or delivery?
            Here are answers to the most common queries.
          </p>
        </div>

        {/* FAQ Card */}
        <div className={styles.faqWrap}>
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqBtn}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.qRow}>
                    <span className={styles.qNo}>{i + 1}.</span>
                    <span className={styles.qText}>{item.q}</span>
                  </div>

                  <span className={`${styles.chev} ${isOpen ? styles.chevOpen : ""}`}>
                    <IoChevronDownOutline />
                  </span>
                </button>

                <div className={`${styles.ans} ${isOpen ? styles.ansOpen : ""}`}>
                  <div className={styles.ansInner}>{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* small green dots (optional feel) */}
        <div className={styles.topDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
