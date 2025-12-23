"use client";

import styles from "./Achievements.module.css";
import {
  FiUserCheck,
  FiDownload,
  FiSmile,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

export default function Achievements() {
  const data = [
    {
      icon: <FiUserCheck />,
      value: "7000+",
      label: "Professionals",
    },
    {
      icon: <FiDownload />,
      value: "6M+",
      label: "App Download",
    },
    {
      icon: <FiSmile />,
      value: "8M+",
      label: "Bookings Completed",
    },
    {
      icon: <FiMapPin />,
      value: "50+",
      label: "Cities in India",
    },
    {
      icon: <FiStar />,
      value: "4.8 ★",
      label: "India's Top Rated Beauty App",
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Achievements so far</h2>

        <div className="row justify-content-center">
          {data.map((item, index) => (
            <div
              key={index}
              className="col-6 col-md-4 col-lg-2 text-center"
            >
              <div className={styles.card}>
                <div className={styles.iconWrap}>{item.icon}</div>
                <h3 className={styles.value}>{item.value}</h3>
                <p className={styles.label}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
