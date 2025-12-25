"use client";

import styles from "./AboutDetail.module.css";
import { FaLeaf, FaShieldAlt, FaTint, FaUsers, FaChartLine, FaHandHoldingUsd } from "react-icons/fa";

export default function AboutDetail() {
  return (
    <section className={styles.page}>
      <div className="container py-5">
        <div className="row align-items-center g-5">
          
          {/* LEFT CONTENT */}
          <div className="col-lg-6">
            <span className={styles.badge}>About Old As Gold</span>

            <h1 className={styles.title}>
              Premium Wellness Products, <br />
              <span>Pure as Gold</span>
            </h1>

            <p className={styles.text}>
              Welcome to <strong>Old As Gold</strong>, your trusted destination for
              premium-quality wellness products designed to enhance your lifestyle
              and overall well-being. Our mission is to bring health, purity, and
              prosperity together under one brand — where every product delivers
              lasting value, reliability, and satisfaction.
            </p>

            <p className={styles.text}>
              At Old As Gold, we believe that good health is the foundation of a
              happy life. That’s why we specialize in{" "}
              <strong>alkaline water bottles</strong> and other health & wellness
              products that help restore your body’s natural pH balance, improve
              hydration, and boost energy levels.
            </p>

            <p className={styles.text}>
              Our bottles are crafted using <strong>advanced technology</strong>{" "}
              and <strong>eco-friendly materials</strong>, ensuring that every sip
              supports your well-being and a cleaner planet.
            </p>

            <div className={styles.highlight}>
              By choosing Old As Gold, you’re not just choosing a product —
              you’re joining a movement towards better health, eco-conscious
              living, and pH-balanced hydration.
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="col-lg-6">
            <div className={styles.imageWrap}>
              <img
                src="/images/about/product.avif"
                alt="Old As Gold Alkaline Water Bottle"
                className={styles.image}
              />

              {/* <div className={styles.floatingCard}>
                <h5>Trusted Wellness Brand</h5>
                <p>Premium alkaline water products crafted for daily health.</p>
              </div> */}
            </div>
          </div>

        </div>
      
        {/* OUR BUSINESS MODEL */}
        <div className="mt-5">
          <div className={styles.sectionHead}>
            <h2>Our Business Model</h2>
            <p>
              Old As Gold is more than a product-selling brand — it’s a growth opportunity. Through our
              direct selling and network marketing system, we empower individuals to earn, build teams,
              and create financial freedom while promoting wellness.
            </p>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-6 col-lg-4">
              <div className={styles.modelCard}>
                <FaChartLine className={styles.mIcon} />
                <h5>Earn with Sales</h5>
                <p>Promote wellness products and earn income through successful purchases.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.modelCard}>
                <FaUsers className={styles.mIcon} />
                <h5>Build Your Team</h5>
                <p>Create a network of health-conscious entrepreneurs and grow together.</p>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <div className={styles.modelCard}>
                <FaHandHoldingUsd className={styles.mIcon} />
                <h5>Reward System</h5>
                <p>Transparent tracking, bonuses, and performance-based incentives.</p>
              </div>
            </div>
          </div>

          <div className={styles.bottomNote}>
            We aim to create a community of health-conscious entrepreneurs who believe in sharing{" "}
            <b>wellness, wealth, and wisdom.</b>
          </div>
        </div></div>
    
    </section>
  );
}
