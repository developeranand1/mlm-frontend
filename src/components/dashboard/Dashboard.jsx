"use client";

import { useEffect, useMemo, useState } from "react";
import { userDetails } from "@/services/authService";
import styles from "./dashboard.module.css";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaUsers,
  FaUserPlus,
  FaBalanceScale,
  FaSitemap,
  FaCopy,
  FaShareAlt,
  FaLink,
  FaUserTie,
  FaIdBadge,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copyMsg, setCopyMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError("");
        setCopyMsg("");

        const rawAuth = localStorage.getItem("auth"); // {token, user}
        const rawUser = localStorage.getItem("user"); // user only

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

        const resp = await userDetails(id);

        // ✅ FIX: API returns { ok, user }
        const u = resp?.user || resp;
        setUser(u || null);
      } catch (err) {
        setError(err?.message || "Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const baseRegisterUrl = useMemo(() => {
    
    return (
      process.env.NEXT_PUBLIC_REGISTER_URL || "https://oldasgold.com/signup"
    );
  }, []);

  const leftLink = useMemo(() => {
    if (!user?.referralCode) return "";
    return `${baseRegisterUrl}?ref=${encodeURIComponent(
      user.referralCode
    )}&side=L`;
  }, [user?.referralCode, baseRegisterUrl]);

  const rightLink = useMemo(() => {
    if (!user?.referralCode) return "";
    return `${baseRegisterUrl}?ref=${encodeURIComponent(
      user.referralCode
    )}&side=R`;
  }, [user?.referralCode, baseRegisterUrl]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMsg("Copied ✅");
      setTimeout(() => setCopyMsg(""), 1500);
    } catch (e) {
      setCopyMsg("Copy failed ❌");
      setTimeout(() => setCopyMsg(""), 1500);
    }
  };

  const shareLink = async (text) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Referral Link",
          text: "Join using my referral link:",
          url: text,
        });
      } else {
        await copyToClipboard(text);
      }
    } catch (e) {
      // ignore
    }
  };

  if (loading) return <div className="container py-4">Loading...</div>;
  if (error) return <div className="container py-4 text-danger">{error}</div>;
  if (!user) return <div className="container py-4">No user found.</div>;

  const teamTotal = Array.isArray(user.downline) ? user.downline.length : 0;

  return (
    <div className={`container py-4 ${styles.page}`}>
      <div className="row g-4">
        {/* LEFT: Team Overview */}
        <div className="col-lg-8">
          <div className={`card border-0 shadow-sm ${styles.panel}`}>
            <div className={`card-body p-4 ${styles.panelBody}`}>
              <div className="d-flex align-items-start justify-content-between">
                <div>
                  <h3 className={`mb-1 ${styles.title}`}>Team Overview</h3>
                  <div className="text-muted">
                    Track your team performance and business volume metrics.
                  </div>
                </div>

                <div className={styles.badgeGreen}>
                  <FaUserTie className="me-2" />
                  {user.role || "User"}
                </div>
              </div>

              {/* Cards grid */}
              <div className="row g-3 mt-3">
                <StatCard
                  icon={<FaUsers />}
                  label="Team Members"
                  title="Teams"
                  value={teamTotal}
                />
                <StatCard
                  icon={<FaUserPlus />}
                  label="Direct Referrals"
                  title="Total Directs"
                  value={teamTotal}
                />
                <StatCard
                  icon={<FaSitemap />}
                  label="Left Count"
                  title="Left Team"
                  value={user.leftCount || 0}
                />
                <StatCard
                  icon={<FaSitemap />}
                  label="Right Count"
                  title="Right Team"
                  value={user.rightCount || 0}
                />
                <StatCard
                  icon={<FaBalanceScale />}
                  label="Total Pairs"
                  title="Matched BV"
                  value={user.pairCount || 0}
                />
                <StatCard
                  icon={<FaBalanceScale />}
                  label="Pairs Paid"
                  title="Pair Paid"
                  value={user.pairPaid || 0}
                />
              </div>

              {/* Profile strip */}
              <div className={`mt-4 ${styles.profileStrip}`}>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className={styles.profileItem}>
                      <FaIdBadge className={styles.piIcon} />
                      <div>
                        <div className={styles.piLabel}>Username</div>
                        <div className={styles.piValue}>
                          {user.username || "-"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className={styles.profileItem}>
                      <FaEnvelope className={styles.piIcon} />
                      <div>
                        <div className={styles.piLabel}>Email</div>
                        <div className={styles.piValue}>{user.email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className={styles.profileItem}>
                      <FaPhoneAlt className={styles.piIcon} />
                      <div>
                        <div className={styles.piLabel}>Phone</div>
                        <div className={styles.piValue}>{user.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`mt-3 ${styles.refCodeRow}`}>
                  <span className={styles.refLabel}>Referral Code:</span>
                  <span className={styles.refCode}>{user.referralCode}</span>
                </div>
              </div>

              {/* Left/Right user mini */}
              <div className="row g-3 mt-3">
                <MiniUserCard title="Left Referral" u={user.leftReferral} />
                <MiniUserCard title="Right Referral" u={user.rightReferral} />
              </div>
              <div className="text-center mt-3">
                <Link href={"/dashboard/tree"} className="btn btn-success ">See Tree <IoIosArrowDown></IoIosArrowDown></Link>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT: Referral Links */}
        <div className="col-lg-4">
          <div className={`card border-0 shadow-sm ${styles.panel}`}>
            <div className={`card-body p-4 ${styles.panelBody}`}>
              <h3 className={`mb-1 ${styles.title}`}>Referral Links</h3>
              <div className="text-muted">
                Share your referral links and earn rewards.
              </div>

              {copyMsg ? (
                <div className="alert alert-success py-2 mt-3 mb-0">
                  {copyMsg}
                </div>
              ) : null}

              <div className={`mt-3 ${styles.linkBox} ${styles.leftBox}`}>
                <div className="d-flex align-items-center gap-2">
                  <div className={styles.linkIconWrap}>
                    <FaLink />
                  </div>
                  <div>
                    <div className={styles.linkTitle}>Left Referral Link</div>
                    <div className={styles.linkSub}>
                      Share this link to earn from left team
                    </div>
                  </div>
                </div>

                <div className={styles.linkInput}>{leftLink}</div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => copyToClipboard(leftLink)}
                    type="button"
                  >
                    <FaCopy className="me-2" /> Copy Link
                  </button>
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={() => shareLink(leftLink)}
                    type="button"
                  >
                    <FaShareAlt className="me-2" /> Share
                  </button>
                </div>
              </div>

              <div className={`mt-3 ${styles.linkBox} ${styles.rightBox}`}>
                <div className="d-flex align-items-center gap-2">
                  <div className={styles.linkIconWrapAlt}>
                    <FaLink />
                  </div>
                  <div>
                    <div className={styles.linkTitle}>Right Referral Link</div>
                    <div className={styles.linkSub}>
                      Share this link to earn from right team
                    </div>
                  </div>
                </div>

                <div className={styles.linkInput}>{rightLink}</div>

                <div className="d-flex gap-2 mt-2">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => copyToClipboard(rightLink)}
                    type="button"
                  >
                    <FaCopy className="me-2" /> Copy Link
                  </button>
                  <button
                    className="btn btn-outline-success w-100"
                    onClick={() => shareLink(rightLink)}
                    type="button"
                  >
                    <FaShareAlt className="me-2" /> Share
                  </button>
                </div>
              </div>

              <div className={`mt-3 ${styles.note}`}>
                Tip: Signup page pe query se auto-fill karwa sakte ho:{" "}
                <b>?ref=RCxxx&side=L</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Raw JSON (optional) */}
      {/* <div className="mt-4">
        <div className={`card border-0 shadow-sm ${styles.panel}`}>
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className={styles.jsonTitle}>API Response Preview</div>
              <button
                className="btn btn-outline-success btn-sm"
                type="button"
                onClick={() =>
                  copyToClipboard(JSON.stringify({ ok: true, user }, null, 2))
                }
              >
                <FaCopy className="me-2" /> Copy JSON
              </button>
            </div>
            <pre className={styles.jsonBox}>
              {JSON.stringify({ ok: true, user }, null, 2)}
            </pre>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function StatCard({ icon, title, label, value }) {
  return (
    <div className="col-md-4">
      <div className={`p-3 ${styles.statCard}`}>
        <div className="d-flex align-items-center gap-3">
          <div className={styles.statIcon}>{icon}</div>
          <div>
            <div className={styles.statTitle}>{title}</div>
            <div className={styles.statLabel}>{label}</div>
          </div>
        </div>
        <div className={styles.statValue}>{value}</div>
      </div>
    </div>
  );
}

function MiniUserCard({ title, u }) {
  return (
    <div className="col-md-6">
      <div className={`p-3 ${styles.miniCard}`}>
        <div className={styles.miniTitle}>{title}</div>
        {u?._id ? (
          <>
            <div className={styles.miniName}>{u.name}</div>
            <div className={styles.miniUser}>@{u.username}</div>
            <div className={styles.miniId}>{u._id}</div>
          </>
        ) : (
          <div className="text-muted">No user</div>
        )}
      </div>
    </div>
  );
}
