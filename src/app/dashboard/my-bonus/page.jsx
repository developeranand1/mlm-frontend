"use client";

import { userRankDetails, userWalletDetails } from "@/services/authService";
import { useEffect, useState } from "react";
import { FaWallet, FaGift, FaCoins, FaCheckCircle } from "react-icons/fa";

export default function MyBonus() {
  const [wallet, setWallet] = useState(null);
  const [rank, setRank] = useState(null);

  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ read token + userId once on mount
  useEffect(() => {
    try {
      // Most common: login ke baad "auth" me token store hota hai
      const rawAuth = localStorage.getItem("auth");
      const rawUser = localStorage.getItem("user");

      const authObj = rawAuth ? JSON.parse(rawAuth) : null;
      const userObj = rawUser ? JSON.parse(rawUser) : null;

      // token where?
      const t =
        authObj?.token ||
        authObj?.jwt ||
        localStorage.getItem("token") || // if token directly stored as string
        null;

      // userId where?
      const id =
        authObj?.user?.id ||
        authObj?.user?._id ||
        userObj?.id ||
        userObj?._id ||
        null;

      setToken(t);
      setUserId(id);
    } catch {
      setToken(null);
      setUserId(null);
    }
  }, []);

  async function fetchWalletAndRank(uid) {
    setLoading(true);
    setErr("");
    setMsg("");

    try {
      if (!uid) {
        setErr("Session expired. Please login again.");
        return;
      }

      // ✅ Rank details
      const rankRes = await userRankDetails(uid);
      // rankRes could be {ok:true, rank:{...}} OR direct rank object
      const rankObj = rankRes?.rank ?? rankRes ?? null;
      setRank(rankObj);

      // ✅ Wallet details
      const walletRes = await userWalletDetails(uid);
      // walletRes could be {ok:true, wallet:{...}} OR direct wallet object
      const walletObj = walletRes?.wallet ?? walletRes ?? null;
      setWallet(walletObj);

      // debug
      console.log("RANK =>", rankObj);
      console.log("WALLET =>", walletObj);
    } catch (e) {
      setErr(e?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function claimBonus() {
    setClaiming(true);
    setErr("");
    setMsg("");

    try {
      if (!token) {
        setErr("Token missing. Please login again.");
        return;
      }

      const res = await fetch("http://localhost:5000/api/wallet/claim-rank-bonus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();

      if (!json.ok) {
        setErr(json.error || "Claim failed");
        return;
      }

      setMsg(`✅ Claimed ₹${json.transferredAmount}. New balance: ₹${json.walletBalance}`);

      // ✅ refresh
      await fetchWalletAndRank(userId);
    } catch (e) {
      setErr(e?.message || "Claim failed");
    } finally {
      setClaiming(false);
    }
  }

  // ✅ fetch once we have userId
  useEffect(() => {
    if (userId) fetchWalletAndRank(userId);
  }, [userId]);

  const balance = Number(wallet?.balance || 0);
  const bonusCash = Number(rank?.bonusCash || 0);

  return (
    <div className="container py-4">
      <div className="p-4 rounded-4 shadow-sm border bg-white">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-4 d-flex align-items-center justify-content-center"
            style={{ width: 52, height: 52, background: "#e9f7ef" }}
          >
            <FaWallet size={22} color="#0a7d2e" />
          </div>
          <div>
            <h3 className="m-0" style={{ color: "#0a7d2e", fontWeight: 800 }}>
              Wallet Overview
            </h3>
            <div className="text-muted">Available balance & rank bonus</div>
          </div>
        </div>

        {loading ? (
          <div className="mt-3 text-muted">Loading...</div>
        ) : (
          <>
            {(err || msg) && (
              <div className="mt-3">
                {err && <div className="alert alert-danger mb-2">{err}</div>}
                {msg && <div className="alert alert-success mb-0">{msg}</div>}
              </div>
            )}

            <div className="row g-3 mt-1">
              {/* Wallet */}
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-4 border h-100" style={{ background: "#f6fbf8" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <FaCoins color="#0a7d2e" />
                      <div style={{ fontWeight: 700 }}>Main Wallet</div>
                    </div>
                    <span className="badge text-bg-light border">Balance</span>
                  </div>

                  <div style={{ fontSize: 34, fontWeight: 900, color: "#0a7d2e" }} className="mt-3">
                    ₹{balance.toFixed(2)}
                  </div>

                  <div className="text-muted small">
                    Updated: {wallet?.updatedAt ? new Date(wallet.updatedAt).toLocaleString() : "-"}
                  </div>
                </div>
              </div>

              {/* Rank Bonus */}
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-4 border h-100" style={{ background: "#f7fff8" }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <FaGift color="#0a7d2e" />
                      <div style={{ fontWeight: 700 }}>Rank Bonus</div>
                    </div>

                    {rank?.rankName ? (
                      <span className="badge text-bg-success">{rank.rankName}</span>
                    ) : (
                      <span className="badge text-bg-secondary">No Rank</span>
                    )}
                  </div>

                  <div style={{ fontSize: 34, fontWeight: 900, color: "#0a7d2e" }} className="mt-3">
                    ₹{bonusCash.toFixed(2)}
                  </div>

                  <button
                    className="btn btn-success w-100 mt-3 rounded-3"
                    onClick={claimBonus}
                    disabled={claiming || bonusCash <= 0}
                  >
                    {claiming ? "Claiming..." : "Claim Bonus to Wallet"}
                  </button>

                  {bonusCash <= 0 && (
                    <div className="text-muted small mt-2 d-flex align-items-center gap-2">
                      <FaCheckCircle />
                      No bonus available right now.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
