"use client";

import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaIdBadge,
  FaMoneyCheckAlt,
  FaUserShield,
  FaLink,
  FaUsers,
} from "react-icons/fa";
import { userProfile } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ localStorage safe read
        const raw = localStorage.getItem("user");
        const localUser = raw ? JSON.parse(raw) : null;

        // ✅ normalize id (_id / id)
        const userId = localUser?.id || localUser?._id;

        if (!userId) {
          setError("Session expired. Please login again.");
          // optional redirect
          // router.push("/login");
          return;
        }

        const res = await userProfile(userId);

        // ✅ your API shape: { success: true, data: {...user} }
        setUser(res?.data || null);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <div className={styles.state}>Loading profile...</div>;
  if (error) return <div className={`${styles.state} ${styles.stateErr}`}>{error}</div>;
  if (!user) return <div className={styles.state}>No user data found</div>;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>My Profile</h2>
            <p className={styles.subTitle}>Your account details in one place</p>
          </div>

          <div className={`${styles.statusChip} ${styles.approved}`}>
            <span className={styles.statusIcon}><FaUserShield /></span>
            <span className={styles.statusText}>{user.role || "User"}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardHeadLeft}>
              <div className={styles.cardIcon}><FaUserCircle /></div>
              <h5 className={styles.cardTitle}>Account Info</h5>
            </div>
          </div>

          <div className={styles.grid}>
            <Info label="Username" value={user.username} icon={<FaIdBadge />} mono />
            <Info label="Full Name" value={user.name} icon={<FaUserCircle />} />
            <Info label="Email" value={user.email} icon={<FaEnvelope />} />
            <Info label="Phone" value={user.phone} icon={<FaPhoneAlt />} />
            <Info label="Earnings" value={`₹ ${user.earnings ?? 0}`} icon={<FaMoneyCheckAlt />} />
            <Info label="Downline Count" value={`${user.downlineCount ?? 0}`} icon={<FaUsers />} />
            <Info label="Referral Code" value={user.referralCode} icon={<FaLink />} mono full />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, icon, mono, full }) {
  return (
    <div className={full ? styles.itemFull : styles.item}>
      <div className={styles.label}>
        {icon} <span>{label}</span>
      </div>
      <div className={mono ? styles.valueMono : styles.value}>
        {value || "-"}
      </div>
    </div>
  );
}
