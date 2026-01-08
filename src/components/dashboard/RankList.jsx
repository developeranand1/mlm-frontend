"use client";

import { FaCrown, FaStar, FaTrophy, FaGem } from "react-icons/fa";
import styles from "./RankList.module.css"; // 👈 CSS Module import

export default function RankList() {
  const RANKS = [
    { position: 1, rankName: "Achiever", requiredPairsPerSide: 1, bonusCash: 500, reward: "" },
    { position: 2, rankName: "Golden Achiever", requiredPairsPerSide: 3, bonusCash: 1000, reward: "" },
    { position: 3, rankName: "Leader", requiredPairsPerSide: 10, bonusCash: 4000, reward: "" },
    { position: 4, rankName: "Star", requiredPairsPerSide: 25, bonusCash: 10000, reward: "Android Phone" },
    { position: 5, rankName: "Silver Star", requiredPairsPerSide: 60, bonusCash: 25000, reward: "Electric Scooty" },

    { position: 6, rankName: "Gold Star", requiredPairsPerSide: 130, bonusCash: 100000, reward: "Pulsar Bike" },
    { position: 7, rankName: "Platinum", requiredPairsPerSide: 250, bonusCash: 170000, reward: "Bullet Bike" },
    { position: 8, rankName: "Diamond", requiredPairsPerSide: 525, bonusCash: 330000, reward: "World Tour (Singapore) + 3L Cash" },
    { position: 9, rankName: "Great Player", requiredPairsPerSide: 1100, bonusCash: 450000, reward: "Alto Car" },
    { position: 10, rankName: "Big Dreamer", requiredPairsPerSide: 2200, bonusCash: 1000000, reward: "Tata Nexon" },

    { position: 11, rankName: "Big Boss", requiredPairsPerSide: 4400, bonusCash: 2100000, reward: "Thar + 10 Lakh" },
    { position: 12, rankName: "Legend", requiredPairsPerSide: 8800, bonusCash: 4100000, reward: "Fortuner Legender" },
    { position: 13, rankName: "Legendary Icon", requiredPairsPerSide: 17600, bonusCash: 7000000, reward: "Range Rover" },
    { position: 14, rankName: "National Leader", requiredPairsPerSide: 30000, bonusCash: 10000000, reward: "Villa" },
    { position: 15, rankName: "World Leader", requiredPairsPerSide: 43000, bonusCash: 20000000, reward: "Family Tour + 1Cr + Defender" },
  ];

  const getIconForRank = (position) => {
    if (position === 1) return <FaStar />;
    if (position <= 3) return <FaCrown />;
    if (position <= 7) return <FaTrophy />;
    return <FaGem />;
  };

  return (
    <div className="container my-5">
      <h2 className={`text-center mb-4 ${styles.title}`}>
        Rank <span>List</span>
      </h2>

      <div className="row g-4">
        {RANKS.map((rank) => (
          <div className="col-md-6 col-lg-4" key={rank.position}>
            <div className={styles.card}>
              <div className="d-flex align-items-center mb-3">
                <div className={styles.iconWrapper}>
                  <span className={styles.icon}>{getIconForRank(rank.position)}</span>
                </div>

                <div className="ms-3">
                  <div className={styles.badge}>#{rank.position}</div>
                  <h5 className={styles.rankName}>{rank.rankName}</h5>
                </div>
              </div>

              <ul className={styles.details}>
                <li>
                  <strong>Pairs per side:</strong> {rank.requiredPairsPerSide} + {rank.requiredPairsPerSide}
                </li>
                <li>
                  <strong>Bonus Cash:</strong> ₹{rank.bonusCash.toLocaleString("en-IN")}
                </li>
                {rank.reward && (
                  <li>
                    <strong>Reward:</strong> <span className={styles.reward}>{rank.reward}</span>
                  </li>
                )}
              </ul>

              <div className="text-end">
                <span className={styles.bottomPill}>Rank {rank.position}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
