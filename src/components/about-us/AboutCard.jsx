"use client";

import { FaGem, FaHandshake, FaLeaf, FaRocket } from "react-icons/fa";
import styles from "./AboutCard.module.css";

export default function AboutCard() {
  const values = [
    {
      title: "Quality Assurance",
      icon: <FaGem />,
      desc: "Delivering premium-quality alkaline products with the highest safety and performance standards.",
    },
    {
      title: "Customer Satisfaction",
      icon: <FaHandshake />,
      desc: "Ensuring every experience with Old As Gold builds long-lasting trust and happiness.",
    },
    {
      title: "Health Awareness",
      icon: <FaLeaf />,
      desc: "Promoting healthy living through alkaline hydration and eco-friendly lifestyle choices.",
    },
    {
      title: "Ethical Business Growth",
      icon: <FaRocket />,
      desc: "Empowering individuals through fair, transparent, and sustainable growth opportunities.",
    },
  ];

  return (
    <section className={`${styles.wrap} py-5`}>
      <div className="container">
        <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
          <div>
            <h2 className={styles.title}>Our Values</h2>
            <p className={styles.sub}>
              What makes Old As Gold trusted — quality, care, wellness, and ethical growth.
            </p>
          </div>
          <a href="/affiliate" className="btn btn-success rounded-3 fw-bold">
            Join Affiliate
          </a>
        </div>

        <div className="row g-4">
          {values.map((v, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-3">
              <div className={styles.card}>
                <div className={styles.icon}>{v.icon}</div>
                <h5 className={styles.h5}>{v.title}</h5>
                <p className={styles.p}>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
