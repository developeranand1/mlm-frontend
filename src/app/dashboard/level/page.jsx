"use client";

import { useEffect, useState } from "react";
import styles from "./Level.module.css";
import {
  FaCrown,
  FaUserCircle,
  FaMedal,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
  FaGift,
} from "react-icons/fa";

export default function LevelPage() {
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchRank = async () => {
      try {
        setMsg({ type: "", text: "" });

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
          setMsg({
            type: "danger",
            text: "User not found. Please login again.",
          });
          setLoading(false);
          return;
        }

        const apiURL = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${apiURL}user-rank/ranks/${user.id}`);
        const data = await res.json();

        if (!data.success) {
          setMsg({
            type: "danger",
            text: data.message || "Failed to fetch level details.",
          });
        } else if (data.total === 0 || !data.data?.length) {
          setMsg({
            type: "info",
            text: "No rank/level found for this user yet.",
          });
        } else {
          setRank(data.data[0]); // because your API returns array with total:1
        }
      } catch (err) {
        setMsg({
          type: "danger",
          text: err?.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRank();
  }, []);

  if (loading) {
    return <div className={styles.state}>Loading level details...</div>;
  }

  const bonusChip =
    rank?.bonusClaimed === true ? (
      <span className={`${styles.chip} ${styles.chipSuccess}`}>
        <FaCheckCircle className="me-1" />
        Bonus Claimed
      </span>
    ) : (
      <span className={`${styles.chip} ${styles.chipWarning}`}>
        <FaTimesCircle className="me-1" />
        Bonus Not Claimed
      </span>
    );

  return (
    <div className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              <FaCrown className={styles.titleIcon} /> My Level
            </h1>
            <p className={styles.subTitle}>
              Check your current achievement level and bonus details.
            </p>
          </div>

          {rank && (
            <div className={styles.rankPill}>
              <FaMedal className={styles.rankPillIcon} />
              <span>{rank.rankName}</span>
            </div>
          )}
        </div>

        {/* Message */}
        {msg.text && (
          <div
            className={`${styles.alert} ${
              msg.type === "danger"
                ? styles.alertErr
                : msg.type === "success"
                ? styles.alertOk
                : styles.alertInfo
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* If no rank, just show msg */}
        {!rank ? null : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              {/* Main Rank Card */}
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardHeadLeft}>
                    <span className={styles.cardIcon}>
                      <FaMedal />
                    </span>
                    <div>
                      <h4 className={styles.cardTitle}>
                        {rank.rankName || "Level"}
                      </h4>
                      <div className={styles.cardSubtitle}>
                        Position #{rank.position} • Required Pairs Per Side:{" "}
                        <strong>{rank.requiredPairsPerSide}</strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.cardHeadRight}>{bonusChip}</div>
                </div>

                {/* Body grid */}
                <div className={styles.grid}>
                  <div className={styles.item}>
                    <div className={styles.label}>
                      <FaUserCircle className="me-1" /> User
                    </div>
                    <div className={styles.value}>
                      {rank.user?.name}{" "}
                      <span className={styles.muted}>
                        ({rank.user?.username})
                      </span>
                    </div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>{rank.user?.email}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Phone</div>
                    <div className={styles.value}>{rank.user?.phone}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>User Status</div>
                    <div className={styles.value}>{rank.user?.status}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Required Pairs per Side</div>
                    <div className={styles.value}>
                      {rank.requiredPairsPerSide}
                    </div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Pair Count at Update</div>
                    <div className={styles.value}>{rank.pairCountAtUpdate}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>Pair Amount</div>
                    <div className={styles.value}>{rank.pairAmount}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>
                      <FaRupeeSign className="me-1" />
                      Bonus Cash
                    </div>
                    <div className={styles.value}>₹ {rank.bonusCash || 0}</div>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.label}>
                      <FaGift className="me-1" />
                      Reward
                    </div>
                    <div className={styles.value}>
                      {rank.reward || "No reward specified"}
                    </div>
                  </div>
                </div>

                {/* Footer small info */}
                <div className={styles.footerInfo}>
                  <span>
                    Updated At:{" "}
                    {rank.updatedAt
                      ? new Date(rank.updatedAt).toLocaleString()
                      : "-"}
                  </span>
                  {rank.bonusClaimed && (
                    <span>
                      Bonus Claimed At:{" "}
                      {rank.bonusClaimedAt
                        ? new Date(rank.bonusClaimedAt).toLocaleString()
                        : "-"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right side small summary card */}
            <div className="col-12 col-lg-4">
              <div className={styles.sideCard}>
                <h5 className={styles.sideTitle}>Quick Summary</h5>

                <div className={styles.sideRow}>
                  <span>Rank</span>
                  <span className={styles.sideValue}>{rank.rankName}</span>
                </div>

                <div className={styles.sideRow}>
                  <span>Position</span>
                  <span className={styles.sideValue}>#{rank.position}</span>
                </div>

                <div className={styles.sideRow}>
                  <span>Required Pairs / Side</span>
                  <span className={styles.sideValue}>
                    {rank.requiredPairsPerSide}
                  </span>
                </div>

                <div className={styles.sideRow}>
                  <span>Bonus Cash</span>
                  <span className={styles.sideValue}>
                    ₹ {rank.bonusCash || 0}
                  </span>
                </div>

                <div className={styles.sideRow}>
                  <span>Bonus Claimed</span>
                  <span className={styles.sideValue}>
                    {rank.bonusClaimed ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
