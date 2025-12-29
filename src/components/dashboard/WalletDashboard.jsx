"use client";

import { useEffect, useState } from "react";
import styles from "./WalletDashboard.module.css";
import { FaWallet, FaCoins } from "react-icons/fa";
import { userWalletDetails } from "@/services/authService";

export default function WalletDashboard() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatINR = (n) =>
    Number(n || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        setError("");

        const rawAuth = localStorage.getItem("auth");
        const rawUser = localStorage.getItem("user");

        const authObj = rawAuth ? JSON.parse(rawAuth) : null;
        const userObj = rawUser ? JSON.parse(rawUser) : null;

        const id =
          authObj?.user?.id ||
          authObj?.user?._id ||
          authObj?.userId ||
          userObj?.id ||
          userObj?._id;

        if (!id) {
          setError("Session expired. Please login again.");
          return;
        }

        const resp = await userWalletDetails(id);
        setWallet(resp?.wallet || null);
      } catch (err) {
        setError(err?.message || "Failed to load wallet details");
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  const balance = wallet?.balance ?? 0;
  const locked = wallet?.locked ?? 0;

  return (
    <div className="container py-4">
      <div className={styles.wrapper}>
        <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
          <div>
            <h2 className={styles.title}>Wallet Overview</h2>
            <p className={styles.subTitle}>
              View your available balances in your wallets.
            </p>
          </div>

          {/* optional action */}
          <button className={`btn ${styles.btnGreen}`} type="button">
            <FaCoins className="me-2" />
           Withdrawal
          </button>
        </div>

        {loading && (
          <div className="mt-3 alert alert-secondary mb-0">Loading...</div>
        )}

        {!loading && error && (
          <div className="mt-3 alert alert-danger mb-0">{error}</div>
        )}

        {!loading && !error && (
          <div className="row g-3 mt-1">
            {/* Main Wallet */}
            <div className="col-12 col-md-6">
              <div className={styles.card}>
                <div className="d-flex align-items-center gap-3">
                  <div className={styles.iconBox}>
                    <FaWallet className={styles.icon} />
                  </div>

                  <div className="flex-grow-1">
                    <div className={styles.cardTitle}>Main Wallet</div>
                    <div className={styles.cardMeta}>Available Balance</div>
                  </div>
                </div>

                <div className={styles.amount}>{formatINR(balance)}</div>

                <div className="d-flex justify-content-between mt-2">
                  <div className={styles.smallText}>Locked</div>
                  <div className={styles.smallTextStrong}>{formatINR(locked)}</div>
                </div>
              </div>
            </div>

            {/* Fund Wallet (demo card) */}
            <div className="col-12 col-md-6">
              <div className={styles.card}>
                <div className="d-flex align-items-center gap-3">
                  <div className={`${styles.iconBox} ${styles.iconBoxPurple}`}>
                    <FaCoins className={styles.icon} />
                  </div>

                  <div className="flex-grow-1">
                    <div className={styles.cardTitle}>Fund Wallet</div>
                    <div className={styles.cardMeta}>Available Balance</div>
                  </div>
                </div>

                {/* If you have another wallet field, replace this */}
                <div className={styles.amount}>{formatINR(0)}</div>

                <div className="d-flex justify-content-between mt-2">
                  <div className={styles.smallText}>Last Updated</div>
                  <div className={styles.smallTextStrong}>
                    {wallet?.updatedAt
                      ? new Date(wallet.updatedAt).toLocaleString("en-IN")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
