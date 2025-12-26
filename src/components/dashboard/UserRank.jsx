"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./UserRank.module.css";
import {
  FaTrophy,
  FaStar,
  FaCrown,
  FaUsers,
  FaCoins,
  FaGift,
} from "react-icons/fa";

import { userRankDetails } from "@/services/authService";

export default function UserRank() {
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRank = async () => {
      try {
        setError("");

        const rawAuth = localStorage.getItem("auth");
        const rawUser = localStorage.getItem("user");

        const authObj = rawAuth ? JSON.parse(rawAuth) : null;
        const userObj = rawUser ? JSON.parse(rawUser) : null;

        const id =
          authObj?.user?.id ||
          authObj?.user?._id ||
          userObj?.id ||
          userObj?._id;

        if (!id) {
          setError("Session expired. Please login again.");
          return;
        }

        const resp = await userRankDetails(id);

        // ✅ Handle different API shapes:
        // Case A: { ok: true, rank: {...} }
        // Case B: { ok: true, user: {...}, rank: {...} }
        // Case C: direct rank object
        const r = resp?.rank || resp?.user?.rank || resp;
        setRank(r || null);
      } catch (err) {
        setError(err?.message || "Failed to load rank details");
      } finally {
        setLoading(false);
      }
    };

    fetchRank();
  }, []);

  const cards = useMemo(() => {
    if (!rank) return [];

    const updated = rank?.updatedAt
      ? new Date(rank.updatedAt).toLocaleString()
      : "-";

    return [
      {
        title: "Current Rank",
        value: rank.rankName || "-",
        icon: <FaCrown />,
      },
      {
        title: "Position",
        value: rank.position ?? "-",
        icon: <FaStar />,
      },
      {
        title: "Pairs Required (per side)",
        value: rank.requiredPairsPerSide ?? "-",
        icon: <FaUsers />,
      },
      {
        title: "Bonus Cash",
        value:
          typeof rank.bonusCash === "number"
            ? `₹${rank.bonusCash.toLocaleString()}`
            : "₹0",
        icon: <FaCoins />,
      },
      {
        title: "Reward",
        value: rank.reward?.trim() ? rank.reward : "—",
        icon: <FaGift />,
      },
      {
        title: "Pair Count Snapshot",
        value: rank.pairCountAtUpdate ?? 0,
        icon: <FaTrophy />,
        // sub: `Updated: ${updated}`,
      },
    ];
  }, [rank]);

  if (loading) return <div className="p-3">Loading rank...</div>;
  if (error) return <div className="p-3 text-danger">{error}</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.title}>Rewards & Awards</h3>
          <p className={styles.subTitle}>
            Your current rank progress & rewards details.
          </p>
        </div>

        <span className={styles.badgeGreen}>
          {rank?.rankName || "No Rank"}
        </span>
      </div>

      {!rank ? (
        <div className="alert alert-warning mb-0">
          No rank achieved yet.
        </div>
      ) : (
        <div className="row g-3">
          {cards.map((c, idx) => (
            <div className="col-12 col-md-6 col-lg-4" key={idx}>
              <div className={styles.statCard}>
                <div className={styles.iconWrap}>{c.icon}</div>

                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>{c.title}</div>
                  <div className={styles.cardValue}>{c.value}</div>
                  {c.sub ? <div className={styles.cardSub}>{c.sub}</div> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
