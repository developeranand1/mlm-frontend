
// "use client";

// import { useEffect, useState } from "react";
// import styles from "./Profile.module.css";
// import {
//   FaUserCircle,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaIdBadge,
//   FaMoneyCheckAlt,
//   FaUserShield,
//   FaLink,
//   FaUsers,
// } from "react-icons/fa";
// import { userDetails } from "@/services/authService";
// import { useRouter } from "next/navigation";

// export default function Profile() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setError("");

//         // ✅ localStorage safe read
//         const raw = localStorage.getItem("user");
//         const localUser = raw ? JSON.parse(raw) : null;

//         // ✅ normalize id (_id / id)
//         const userId = localUser?.id || localUser?._id;

//         if (!userId) {
//           setError("Session expired. Please login again.");
//           return;
//         }

//         const resUser = await userDetails(userId);

//         // ✅ because service returns direct user object
//         setUser(resUser || null);
//       } catch (err) {
//         setError(
//           err?.response?.data?.error ||
//             err?.message ||
//             "Failed to load profile details"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [router]);

//   if (loading) return <div className={styles.state}>Loading profile...</div>;
//   if (error) return <div className={`${styles.state} ${styles.stateErr}`}>{error}</div>;
//   if (!user) return <div className={styles.state}>No user data found</div>;

//   return (
//     <div className={styles.page}>
//       <div className={`container ${styles.containerFix}`}>
//         <div className={styles.header}>
//           <div>
//             <h2 className={styles.title}>My Profile</h2>
//             <p className={styles.subTitle}>Your account details in one place</p>
//           </div>

//           <div className={`${styles.statusChip} ${styles.approved}`}>
//             <span className={styles.statusIcon}><FaUserShield /></span>
//             <span className={styles.statusText}>{user.role || "User"}</span>
//           </div>
//         </div>

//         <div className={styles.card}>
//           <div className={styles.cardHead}>
//             <div className={styles.cardHeadLeft}>
//               <div className={styles.cardIcon}><FaUserCircle /></div>
//               <h5 className={styles.cardTitle}>Account Info</h5>
//             </div>
//           </div>

//           <div className={styles.grid}>
//             <Info label="Username" value={user.username} icon={<FaIdBadge />} mono />
//             <Info label="Full Name" value={user.name} icon={<FaUserCircle />} />
//             <Info label="Email" value={user.email} icon={<FaEnvelope />} />
//             <Info label="Phone" value={user.phone} icon={<FaPhoneAlt />} />
//             <Info label="Pairs" value={`${user.pairCount ?? 0}`} icon={<FaUsers />} />
//             <Info label="Left Count" value={`${user.leftCount ?? 0}`} icon={<FaUsers />} />
//             <Info label="Right Count" value={`${user.rightCount ?? 0}`} icon={<FaUsers />} />
//             <Info label="Referral Code" value={user.referralCode} icon={<FaLink />} mono full />
//             <Info label="Created" value={user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"} icon={<FaMoneyCheckAlt />} full />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Info({ label, value, icon, mono, full }) {
//   return (
//     <div className={full ? styles.itemFull : styles.item}>
//       <div className={styles.label}>
//         {icon} <span>{label}</span>
//       </div>
//       <div className={mono ? styles.valueMono : styles.value}>
//         {value || "-"}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useMemo, useState } from "react";
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
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { userDetails } from "@/services/authService";
import { updateUserProfile } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // edit states
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editErr, setEditErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const userId = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      const localUser = raw ? JSON.parse(raw) : null;
      return localUser?.id || localUser?._id || null;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setError("");

        if (!userId) {
          setError("Session expired. Please login again.");
          return;
        }

        const resUser = await userDetails(userId);
        setUser(resUser || null);

        // init form
        setForm({
          name: resUser?.name || "",
          email: resUser?.email || "",
          phone: resUser?.phone || "",
        });
      } catch (err) {
        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to load profile details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router, userId]);

  const startEdit = () => {
    if (!user) return;
    setEditErr("");
    setIsEditing(true);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  };

  const cancelEdit = () => {
    setEditErr("");
    setIsEditing(false);
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  };

  const onChange = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
  };

  const saveEdit = async () => {
    try {
      setSaving(true);
      setEditErr("");

      if (!userId) throw new Error("UserId missing");

      // basic validation
      if (!form.name.trim()) throw new Error("Name is required");
      if (!form.email.trim()) throw new Error("Email is required");
      if (!form.phone.trim()) throw new Error("Phone is required");

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      };

      const updated = await updateUserProfile(userId, payload);

      setUser((prev) => ({ ...(prev || {}), ...updated }));

      // localStorage also update (so other pages get latest)
      try {
        const raw = localStorage.getItem("user");
        const localUser = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          "user",
          JSON.stringify({ ...localUser, ...updated })
        );
      } catch {}

      setIsEditing(false);
    } catch (e) {
      setEditErr(e.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className={styles.state}>Loading profile...</div>;
  if (error)
    return (
      <div className={`${styles.state} ${styles.stateErr}`}>{error}</div>
    );
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
            <span className={styles.statusIcon}>
              <FaUserShield />
            </span>
            <span className={styles.statusText}>{user.role || "User"}</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHead}>
            <div className={styles.cardHeadLeft}>
              <div className={styles.cardIcon}>
                <FaUserCircle />
              </div>
              <h5 className={styles.cardTitle}>Account Info</h5>
            </div>

            {/* EDIT BUTTONS */}
            {!isEditing ? (
              <button className={styles.btnEdit} onClick={startEdit}>
                <FaEdit /> Edit
              </button>
            ) : (
              <div className={styles.btnRow}>
                <button
                  className={styles.btnGhost}
                  onClick={cancelEdit}
                  disabled={saving}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  className={styles.btnSave}
                  onClick={saveEdit}
                  disabled={saving}
                >
                  <FaSave /> {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          {isEditing && editErr ? (
            <div className={styles.editError}>{editErr}</div>
          ) : null}

          <div className={styles.grid}>
            <Info label="Username" value={user.username} icon={<FaIdBadge />} mono />

            {/* EDITABLE FIELDS */}
            <InfoEditable
              isEditing={isEditing}
              label="Full Name"
              icon={<FaUserCircle />}
              value={user.name}
              inputValue={form.name}
              onChange={(v) => onChange("name", v)}
            />

            <InfoEditable
              isEditing={isEditing}
              label="Email"
              icon={<FaEnvelope />}
              value={user.email}
              inputValue={form.email}
              onChange={(v) => onChange("email", v)}
            />

            <InfoEditable
              isEditing={isEditing}
              label="Phone"
              icon={<FaPhoneAlt />}
              value={user.phone}
              inputValue={form.phone}
              onChange={(v) => onChange("phone", v)}
            />

            <Info label="Pairs" value={`${user.pairCount ?? 0}`} icon={<FaUsers />} />
            <Info label="Left Count" value={`${user.leftCount ?? 0}`} icon={<FaUsers />} />
            <Info label="Right Count" value={`${user.rightCount ?? 0}`} icon={<FaUsers />} />

            <Info label="Referral Code" value={user.referralCode} icon={<FaLink />} mono full />
            <Info
              label="Created"
              value={user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
              icon={<FaMoneyCheckAlt />}
              full
            />
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
      <div className={mono ? styles.valueMono : styles.value}>{value || "-"}</div>
    </div>
  );
}

function InfoEditable({
  label,
  value,
  icon,
  isEditing,
  inputValue,
  onChange,
}) {
  return (
    <div className={styles.item}>
      <div className={styles.label}>
        {icon} <span>{label}</span>
      </div>

      {!isEditing ? (
        <div className={styles.value}>{value || "-"}</div>
      ) : (
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          placeholder={label}
        />
      )}
    </div>
  );
}


