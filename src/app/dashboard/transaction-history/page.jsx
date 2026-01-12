"use client";

import React, { useEffect, useState } from "react";
import styles from "./TransactionHistory.module.css";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

export default function TransactionHistory() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";

  // 1) Read user from localStorage once
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const parsed = JSON.parse(raw);
        // expect shape: { id, name, username, email, phone, referralCode, pairCount }
        setUser(parsed);
      } else {
        console.warn("No user found in localStorage under key 'user'");
      }
    } catch (err) {
      console.error("Error reading user from localStorage:", err);
    }
  }, []);

  // 2) Fetch payouts when user loaded
  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const url = `${baseURL}weekly-payouts/user/${user.id}`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.success) {
          throw new Error(json.message || "Failed to load transactions");
        }

        setTransactions(json.data || []);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch transaction history");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, baseURL]);

  const getStatusChipClass = (status) => {
    if (status === "APPROVED") return styles.statusApproved;
    if (status === "REJECTED") return styles.statusRejected;
    return styles.statusPending;
  };

  const getStatusIcon = (status) => {
    if (status === "APPROVED") return <FaCheckCircle />;
    if (status === "REJECTED") return <FaTimesCircle />;
    return <FaClock />;
  };

  if (!user) {
    return (
      <div className={`container ${styles.page}`}>
        <div className={styles.center}>
          <p className="mb-0">User not found in localStorage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      {/* HEADER */}
      <div className="row">
        <div className="col-12">
          <div className={styles.headerCard}>
            <div>
              <h1 className={styles.title}>
                <FaMoneyBillWave className={styles.titleIcon} />
                Transaction History
              </h1>
              <p className={styles.subtitle}>
                Weekly payout details for your account
              </p>
            </div>

            {/* USER INFO CARD */}
            <div className={styles.userCard}>
              <div className={styles.userMain}>
                <div className={styles.userAvatar}>
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <div className={styles.userName}>{user.name}</div>
                  <div className={styles.userUsername}>@{user.username}</div>
                </div>
              </div>
              <div className={styles.userMeta}>
                <div>
                  <span className={styles.metaLabel}>Email</span>
                  <div className={styles.metaValue}>{user.email}</div>
                </div>
                <div>
                  <span className={styles.metaLabel}>Phone</span>
                  <div className={styles.metaValue}>{user.phone || "-"}</div>
                </div>
                <div>
                  <span className={styles.metaLabel}>Referral Code</span>
                  <div className={styles.metaValue}>
                    {user.referralCode || "-"}
                  </div>
                </div>
                <div>
                  <span className={styles.metaLabel}>Total Pairs</span>
                  <div className={styles.metaValue}>
                    {user.pairCount ?? 0}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="row mt-4">
        <div className="col-12">
          {loading && (
            <div className={styles.center}>
              <div className="spinner-border text-success" role="status" />
              <p className="mt-2 mb-0">Loading your transactions...</p>
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger">{error}</div>
          )}

          {!loading && !error && transactions.length === 0 && (
            <div className={styles.center}>
              <p className="mb-0">No transactions found yet.</p>
            </div>
          )}

          {!loading && !error && transactions.length > 0 && (
            <div className={styles.cardsGrid}>
              {transactions.map((tx) => (
                <div key={tx._id} className={`card ${styles.txCard}`}>
                  <div className="card-body">
                    <div className={styles.txHeader}>
                      <div>
                        <div className={styles.txAmount}>
                          ₹ {tx.payoutAmount}
                        </div>
                        <div className={styles.txSubAmount}>
                          Pair: {tx.pairAmount} | Bonus: {tx.bonusCash}
                        </div>
                      </div>
                      <div
                        className={`${styles.statusChip} ${getStatusChipClass(
                          tx.status
                        )}`}
                      >
                        <span className={styles.statusIcon}>
                          {getStatusIcon(tx.status)}
                        </span>
                        {tx.status || "PENDING"}
                      </div>
                    </div>

                    <div className={styles.txDates}>
                      <span>
                        <FaCalendarAlt className="me-1" />
                        Week:{" "}
                        {new Date(tx.weekStart).toLocaleDateString()} →{" "}
                        {new Date(tx.weekEnd).toLocaleDateString()}
                      </span>
                    </div>

                    <div className={styles.txMetaRow}>
                      <div>
                        <span className={styles.metaLabel}>Payment Type</span>
                        <div className={styles.metaValue}>
                          {tx.paymentType || "-"}
                        </div>
                      </div>
                      <div>
                        <span className={styles.metaLabel}>Transaction ID</span>
                        <div className={styles.metaValue}>
                          {tx.transactionId || "-"}
                        </div>
                      </div>
                    </div>

                    {tx.adminRemark && (
                      <div className={styles.remarkBox}>
                        <span className={styles.metaLabel}>Remark</span>
                        <p className={styles.remarkText}>
                          {tx.adminRemark.trim()}
                        </p>
                      </div>
                    )}

                    {tx.proofFileUrl && (
                      <div className="mt-2">
                        <a
                          href={tx.proofFileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.proofLink}
                        >
                          View Payment Proof
                        </a>
                      </div>
                    )}

                    <div className={styles.txFooter}>
                      <span>
                        Created:{" "}
                        {new Date(tx.createdAt).toLocaleString("en-IN")}
                      </span>
                      <span>
                        Updated:{" "}
                        {new Date(tx.updatedAt).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
