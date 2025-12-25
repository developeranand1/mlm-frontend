"use client";

import {
  FaTint,
  FaLeaf,
  FaHandshake,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import styles from "./WhyChooseCard.module.css";

export default function WhyChooseCard() {
  const points = [
    {
      icon: <FaTint />,
      title: "Premium Alkaline Hydration",
      desc: "Premium-quality alkaline water bottles designed to support better hydration and balanced living.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly Products",
      desc: "Health-focused and environmentally responsible products for a cleaner, greener future.",
    },
    {
      icon: <FaHandshake />,
      title: "Transparent Business Model",
      desc: "Built on honesty, sustainability, and long-term value for everyone involved.",
    },
    {
      icon: <FaChartLine />,
      title: "Earn & Grow Opportunity",
      desc: "Opportunity to earn and grow through direct selling and ethical network marketing.",
    },
    {
      icon: <FaUsers />,
      title: "Strong Community Support",
      desc: "Dedicated support system and a community-driven approach to shared success.",
    },
  ];

  return (
    <section className={`${styles.section} py-5`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className={styles.title}>Why Choose Old As Gold</h2>
          <p className={styles.subtitle}>
            Some things, like good health and golden opportunities, never lose their value.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {points.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4">
              <div className={styles.card}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <h5 className={styles.cardTitle}>{item.title}</h5>
                <p className={styles.cardText}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className={styles.bottomNote}>
          At <b>Old As Gold</b>, we are committed to helping people live healthier,
          happier, and more successful lives — because some values never fade.
        </div>
      </div>
    </section>
  );
}
