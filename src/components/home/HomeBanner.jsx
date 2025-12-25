"use client";

import { FaArrowRight, FaShoppingBag, FaShieldAlt, FaLeaf } from "react-icons/fa";
import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={`row align-items-center ${styles.rowGap}`}>
          {/* LEFT */}
          <div className="col-12 col-lg-7">
            <div className={styles.badgeRow}>
              <span className={styles.badgePill}>
                <FaShieldAlt /> Trusted Quality
              </span>
              <span className={styles.badgePill}>
                <FaLeaf /> Eco Friendly
              </span>
            </div>

            <h1 className={styles.title}>
              Turn Every Purchase
              <br />
              Into <span>Earning</span> &amp; <span>Opportunity</span>
            </h1>

            <p className={styles.subTitle}>
              Premium alkaline wellness products + transparent affiliate model.
              Shop smart, share easy, and grow your income.
            </p>

            <div className={styles.btnRow}>
              <a href="/products" className={styles.ctaBtn}>
                <FaShoppingBag /> Explore Products <FaArrowRight />
              </a>

              <a href="/affiliate" className={styles.secondaryBtn}>
                Become Affiliate
              </a>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statBox}>
                <div className={styles.statNum}>4.8★</div>
                <div className={styles.statText}>Customer Rating</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNum}>Fast</div>
                <div className={styles.statText}>Support & Tracking</div>
              </div>
              <div className={styles.statBox}>
                <div className={styles.statNum}>100%</div>
                <div className={styles.statText}>Transparent Model</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-5">
            <div className={styles.imageCard}>
              <div className={styles.glow} />
              <img
                src="/images/bottles.png"
                alt="Old As Gold bottles"
                className={styles.image}
              />

              <div className={styles.floatingCard}>
                <div className={styles.floatTitle}>Alkaline Wellness</div>
                <div className={styles.floatText}>
                  Better hydration • Better lifestyle
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
