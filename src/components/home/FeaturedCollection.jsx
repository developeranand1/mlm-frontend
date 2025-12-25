"use client"

import styles from "./FeaturedCollection.module.css";
import { IoStar, IoCheckmarkCircle, IoArrowForward } from "react-icons/io5";

export default function FeaturedCollection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`row align-items-center ${styles.rowGap}`}>
          {/* LEFT */}
          <div className="col-12 col-lg-6">
            <div className={styles.pill}>
              <IoStar className={styles.pillIcon} />
              <span>Featured Collection</span>
            </div>

            <h2 className={styles.title}>
              Premium <br />
              <span>Wellness Range</span>
            </h2>

            <div className={styles.underlineRow}>
              <span className={styles.line} />
              <span className={styles.dot} />
              <span className={styles.dotSoft} />
            </div>

            <p className={styles.desc}>
              Discover our most popular products combining traditional wisdom
              with modern science for optimal wellness results.
            </p>

            <ul className={styles.list}>
              <li>
                <IoCheckmarkCircle className={styles.checkIcon} />
                <span>100% Natural Ingredients</span>
              </li>
              <li>
                <IoCheckmarkCircle className={styles.checkIcon} />
                <span>Lab Tested &amp; Certified</span>
              </li>
              <li>
                <IoCheckmarkCircle className={styles.checkIcon} />
                <span>Money Back Guarantee</span>
              </li>
            </ul>

            <button className={styles.cta} type="button">
              Explore Collection <IoArrowForward className={styles.arrow} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-6">
            <div className={styles.imageCard}>
              <div className={styles.imageGlow} />
              <img
                src="/images/about/product.avif"
                alt="Featured product"
                className={styles.image}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "data:image/svg+xml;charset=UTF-8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600'>
                        <defs>
                          <linearGradient id='g' x1='0' x2='1'>
                            <stop offset='0' stop-color='#e9f7ef'/>
                            <stop offset='1' stop-color='#f4fff8'/>
                          </linearGradient>
                        </defs>
                        <rect width='100%' height='100%' fill='url(#g)'/>
                        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                          fill='#166534' font-size='22' font-family='Arial'>Image Missing</text>
                      </svg>`
                    );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
