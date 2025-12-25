"use client";

import React, { useMemo, useState, useEffect } from "react";
import styles from "./CountryList.module.css";
import {
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";

export default function CountryList() {
  const [dir, setDir] = useState(1);
  const [duration, setDuration] = useState(30); // smoother default

  const countries = useMemo(
    () => [
      { id: 1, name: "USA", img: "/images/country/us.png", inr: 83.25 },
      { id: 2, name: "UAE", img: "/images/country/us.png", inr: 22.65 },
      { id: 3, name: "UK", img: "/images/country/us.png", inr: 105.4 },
      { id: 4, name: "Canada", img: "/images/country/us.png", inr: 61.2 },
      { id: 5, name: "Australia", img: "/images/country/us.png", inr: 55.1 },
      { id: 6, name: "Japan", img: "/images/country/us.png", inr: 0.56 },
      { id: 7, name: "Germany", img: "/images/country/us.png", inr: 90.3 },
    ],
    []
  );

  // 🔁 Auto direction switch (subtle life)
  useEffect(() => {
    const t = setInterval(() => {
      setDir((d) => d * -1);
    }, 15000);
    return () => clearInterval(t);
  }, []);

  // arrow boost
  const boost = (nextDir) => {
    setDir(nextDir);
    setDuration(12);
    clearTimeout(boost._t);
    boost._t = setTimeout(() => setDuration(30), 800);
  };

  return (
    <section className={styles.section}>
      <div className="container-fluid">
        {/* Header */}
        <div className={styles.head}>
          <h3 className={styles.title}>Global Country Rates</h3>

          <div className={styles.controls}>
            <button onClick={() => boost(-1)} className={styles.ctrlBtn}>
              <IoChevronBackOutline />
            </button>
            <button onClick={() => boost(1)} className={styles.ctrlBtn}>
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className={styles.sliderFrame}>
          <div
            className={`${styles.marquee} ${
              dir === -1 ? styles.reverse : ""
            }`}
            style={{ ["--duration"]: `${duration}s` }}
          >
            {[1, 2].map((loop) => (
              <div key={loop} className={styles.marqueeGroup}>
                {countries.map((c) => (
                  <div key={`${loop}-${c.id}`} className={styles.card}>
                    <div className={styles.flagWrap}>
                      <img src={c.img} alt={c.name} />
                    </div>

                    <div className={styles.meta}>
                      <span className={styles.country}>{c.name}</span>
                      <span className={styles.price}>
                        ₹{c.inr.toLocaleString("en-IN")} / unit
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
