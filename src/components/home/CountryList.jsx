"use client";

import React, { useMemo, useState } from "react";
import styles from "./CountryList.module.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

export default function CountryList() {
  // direction: 1 => left (normal), -1 => right (reverse)
  const [dir, setDir] = useState(1);

  // duration (seconds) for slow motion
  const [duration, setDuration] = useState(35);

  const countries = useMemo(
    () => [
    //   { id: 1, name: "India", img: "/countries/india.png", inr: 1 },
      { id: 2, name: "USA", img: "/images/country/us.png", inr: 83.25 },
      { id: 3, name: "UAE", img: "/images/country/us.png", inr: 22.65 },
      { id: 4, name: "UK", img: "/images/country/us.png", inr: 105.4 },
      { id: 5, name: "Canada", img: "/images/country/us.png", inr: 61.2 },
      { id: 6, name: "Australia", img: "/images/country/us.png", inr: 55.1 },
      { id: 7, name: "Japan", img: "/images/country/us.png", inr: 0.56 },
      { id: 8, name: "Germany", img: "/images/country/us.png", inr: 90.3 },
    ],
    []
  );

  // Boost speed for a moment when clicking arrows (feels like "next/prev")
  const boost = (nextDir) => {
    setDir(nextDir);
    setDuration(12); // fast for moment
    window.clearTimeout(boost._t);
    boost._t = window.setTimeout(() => setDuration(35), 900); // back to slow
  };

  return (
    <section className={`py-4 ${styles.section}`}>
      <div className="container-fluid">
        <div className={`d-flex align-items-center justify-content-between mb-3 ${styles.head}`}>
          <h3 className={`m-0 ${styles.title}`}>Country Rates</h3>

          <div className="d-none d-md-flex gap-2">
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => boost(-1)}
              aria-label="Previous"
            >
              <IoChevronBackOutline />
            </button>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => boost(1)}
              aria-label="Next"
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>

        <div className={styles.sliderFrame}>
          {/* Infinite marquee */}
          <div
            className={`${styles.marquee} ${dir === -1 ? styles.reverse : ""}`}
            style={{ ["--duration"]: `${duration}s` }}
            aria-label="Country slider"
          >
            {/* Copy 1 */}
            <div className={styles.marqueeGroup}>
              {countries.map((c) => (
                <article key={`a-${c.id}`} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <img
                      src={c.img}
                      alt={c.name}
                      className={styles.img}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>
                              <rect width='100%' height='100%' fill='#f1f3f5'/>
                              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6c757d' font-size='16'>No Image</text>
                            </svg>`
                          );
                      }}
                    />
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.countryName}>{c.name}</div>
                    <div className={styles.price}>
                      <span className={styles.rupee}>₹</span>
                      {Number(c.inr).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                      <span className={styles.per}> / 1 unit</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Copy 2 (same data) for seamless loop */}
            <div className={styles.marqueeGroup} aria-hidden="true">
              {countries.map((c) => (
                <article key={`b-${c.id}`} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <img
                      src={c.img}
                      alt={c.name}
                      className={styles.img}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'>
                              <rect width='100%' height='100%' fill='#f1f3f5'/>
                              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6c757d' font-size='16'>No Image</text>
                            </svg>`
                          );
                      }}
                    />
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.countryName}>{c.name}</div>
                    <div className={styles.price}>
                      <span className={styles.rupee}>₹</span>
                      {Number(c.inr).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                      <span className={styles.per}> / 1 unit</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* dots like screenshot */}
          <div className={styles.dots} aria-hidden="true">
            <span className={styles.dot} />
            <span className={styles.dotMuted} />
            <span className={styles.dotMuted} />
          </div>
        </div>

        {/* Mobile buttons */}
        <div className="d-flex d-md-none justify-content-center gap-2 mt-3">
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => boost(-1)}
            aria-label="Previous"
          >
            <IoChevronBackOutline />
          </button>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => boost(1)}
            aria-label="Next"
          >
            <IoChevronForwardOutline />
          </button>
        </div>
      </div>
    </section>
  );
}
