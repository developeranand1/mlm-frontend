"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./Kyc.module.css";
import Swal from "sweetalert2";
import { kycDetail, kycUpdate } from "@/services/authService";

import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaIdBadge,
  FaUniversity,
  FaMoneyCheckAlt,
  FaRegIdCard,
  FaRegCreditCard,
  FaFileImage,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSave,
  FaUpload,
  FaImage,
} from "react-icons/fa";

export default function Kyc() {
  const [kyc, setKyc] = useState(null);

  // text fields
  const [form, setForm] = useState({
    accountHolderName: "",
    bankAccountNumber: "",
    bankName: "",
    bankType: "",
    ifscCode: "",
    aadharNumber: "",
    panNumber: "",
  });

  // existing image urls from server (for initial preview)
  const [imgUrl, setImgUrl] = useState({
    aadharImage: "",
    panImage: "",
    passbookImage: "",
  });

  // new files selected by user
  const [files, setFiles] = useState({
    aadharImage: null,
    panImage: null,
    passbookImage: null,
  });

  // local preview for selected files
  const [preview, setPreview] = useState({
    aadharImage: "",
    panImage: "",
    passbookImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchKyc = async () => {
      try {
        setMsg({ type: "", text: "" });
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.id) {
          setMsg({
            type: "danger",
            text: "User not found. Please login again.",
          });
          return;
        }

        const resp = await kycDetail(user.id); // {success, data}
        const data = resp?.data || null;
        setKyc(data);

        if (data) {
          setForm({
            accountHolderName: data.accountHolderName || "",
            bankAccountNumber: data.bankAccountNumber || "",
            bankName: data.bankName || "",
            bankType: data.bankType || "",
            ifscCode: data.ifscCode || "",
            aadharNumber: data.aadharNumber || "",
            panNumber: data.panNumber || "",
          });

          setImgUrl({
            aadharImage: data.aadharImage || "",
            panImage: data.panImage || "",
            passbookImage: data.passbookImage || "",
          });

          // initial preview same as url
          setPreview({
            aadharImage: data.aadharImage || "",
            panImage: data.panImage || "",
            passbookImage: data.passbookImage || "",
          });
        }
      } catch (err) {
        setMsg({
          type: "danger",
          text: err?.message || "Failed to load KYC details.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchKyc();
  }, []);

  const statusMeta = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "approved")
      return {
        cls: styles.approved,
        icon: <FaCheckCircle />,
        text: "APPROVED",
      };
    if (s === "rejected")
      return {
        cls: styles.rejected,
        icon: <FaTimesCircle />,
        text: "REJECTED",
      };
    return { cls: styles.pending, icon: <FaClock />, text: "PENDING" };
  };

  const st = useMemo(() => statusMeta(kyc?.status), [kyc?.status]);
  const userInfo = kyc?.userId || {};

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onFileChange = (name, file) => {
    if (!file) return;

    setFiles((p) => ({ ...p, [name]: file }));

    // local preview
    const url = URL.createObjectURL(file);
    setPreview((p) => ({ ...p, [name]: url }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      setMsg({ type: "danger", text: "User not found. Please login again." });
      return;
    }

    try {
      setSaving(true);

      // ✅ FormData for text + files
      const fd = new FormData();
      fd.append("accountHolderName", form.accountHolderName.trim());
      fd.append("bankAccountNumber", form.bankAccountNumber.trim());
      fd.append("bankName", form.bankName.trim());
      fd.append("bankType", form.bankType.trim());
      fd.append("ifscCode", form.ifscCode.trim());
      fd.append("aadharNumber", form.aadharNumber.trim());
      fd.append("panNumber", form.panNumber.trim());

      // If backend expects names exactly like schema fields:
      if (files.aadharImage) fd.append("aadharImage", files.aadharImage);
      if (files.panImage) fd.append("panImage", files.panImage);
      if (files.passbookImage) fd.append("passbookImage", files.passbookImage);

      const updated = await kycUpdate(user.id, fd);

      // backend could return {success:true, data:{...}} or {data:{...}}
      const updatedData = updated?.data || updated;

      setKyc((prev) => ({ ...(prev || {}), ...(updatedData || {}) }));

      // if backend returns new image urls, update url + preview
      setImgUrl((p) => ({
        ...p,
        aadharImage: updatedData?.aadharImage || p.aadharImage,
        panImage: updatedData?.panImage || p.panImage,
        passbookImage: updatedData?.passbookImage || p.passbookImage,
      }));

      setPreview((p) => ({
        ...p,
        aadharImage: updatedData?.aadharImage || p.aadharImage,
        panImage: updatedData?.panImage || p.panImage,
        passbookImage: updatedData?.passbookImage || p.passbookImage,
      }));

      setMsg({ type: "success", text: "KYC updated successfully ✅" });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Your KYC details have been updated successfully.",
        confirmButtonColor: "#16a34a",
      });
    } catch (err) {
      const m = err?.message || "Update failed.";
      setMsg({ type: "danger", text: m });

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: m,
        confirmButtonColor: "#16a34a",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <div className={styles.state}>Loading KYC details...</div>;

  return (
    <div className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>KYC Details</h2>
            <p className={styles.subTitle}>
              View & update your verification and payout details.
            </p>
          </div>

          <div className={`${styles.statusChip} ${st?.cls || styles.pending}`}>
            <span className={styles.statusIcon}>{st?.icon}</span>
            <span className={styles.statusText}>{st?.text}</span>
          </div>
        </div>

        {msg?.text ? (
          <div
            className={`${styles.alert} ${
              msg.type === "success" ? styles.alertOk : styles.alertErr
            }`}
          >
            {msg.text}
          </div>
        ) : null}

        {/* TOP CARDS */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-lg-6">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardHeadLeft}>
                  <span className={styles.cardIcon}>
                    <FaUserCircle />
                  </span>
                  <h5 className={styles.cardTitle}>User Information</h5>
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.item}>
                  <div className={styles.label}>
                    <FaIdBadge /> Name
                  </div>
                  <div className={styles.value}>{userInfo?.name || "-"}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>
                    <FaEnvelope /> Email
                  </div>
                  <div className={styles.value}>{userInfo?.email || "-"}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>
                    <FaPhoneAlt /> Phone
                  </div>
                  <div className={styles.value}>{userInfo?.phone || "-"}</div>
                </div>
                <div className={styles.item}>
                  <div className={styles.label}>
                    <FaRegIdCard /> Username
                  </div>
                  <div className={styles.value}>
                    {userInfo?.username || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className={styles.card}>
              <div className={styles.cardHead}>
                <div className={styles.cardHeadLeft}>
                  <span className={styles.cardIcon}>
                    <FaMoneyCheckAlt />
                  </span>
                  <h5 className={styles.cardTitle}>KYC Status</h5>
                </div>
              </div>

              <div className={styles.statusBox}>
                <div className={styles.statusBig}>{st?.text}</div>
                <div className={styles.statusSmall}>
                  Update your details and upload images if required.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className={styles.form}>
          <div className="row g-4">
            {/* LEFT: BANK */}
            <div className="col-12 col-lg-6">
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardHeadLeft}>
                    <span className={styles.cardIcon}>
                      <FaUniversity />
                    </span>
                    <h5 className={styles.cardTitle}>Payment / Bank Details</h5>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <Field
                    icon={<FaUserCircle />}
                    label="Account Holder Name"
                    name="accountHolderName"
                    value={form.accountHolderName}
                    onChange={onChange}
                  />
                  <Field
                    icon={<FaRegCreditCard />}
                    label="Bank Account Number"
                    name="bankAccountNumber"
                    value={form.bankAccountNumber}
                    onChange={onChange}
                  />
                  <Field
                    icon={<FaUniversity />}
                    label="Bank Name"
                    name="bankName"
                    value={form.bankName}
                    onChange={onChange}
                  />
                  <Field
                    icon={<FaUniversity />}
                    label="Bank Type"
                    name="bankType"
                    value={form.bankType}
                    onChange={onChange}
                  />
                  <Field
                    icon={<FaMoneyCheckAlt />}
                    label="IFSC Code"
                    name="ifscCode"
                    value={form.ifscCode}
                    onChange={onChange}
                    full
                    mono
                  />
                </div>

                {/* ✅ Passbook upload + preview in bank section */}
                <UploadBox
                  title="Passbook Image"
                  name="passbookImage"
                  previewSrc={preview.passbookImage || imgUrl.passbookImage}
                  onFile={(file) => onFileChange("passbookImage", file)}
                />
              </div>
            </div>

            {/* RIGHT: DOCS */}
            <div className="col-12 col-lg-6">
              <div className={styles.card}>
                <div className={styles.cardHead}>
                  <div className={styles.cardHeadLeft}>
                    <span className={styles.cardIcon}>
                      <FaFileImage />
                    </span>
                    <h5 className={styles.cardTitle}>Documents</h5>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <Field
                    icon={<FaRegIdCard />}
                    label="Aadhar Number"
                    name="aadharNumber"
                    value={form.aadharNumber}
                    onChange={onChange}
                  />
                </div>

                {/* ✅ Aadhar upload (number ke niche) */}
                <UploadBox
                  title="Aadhar Image"
                  name="aadharImage"
                  previewSrc={preview.aadharImage || imgUrl.aadharImage}
                  onFile={(file) => onFileChange("aadharImage", file)}
                />

                {/* ✅ PAN upload (number ke niche) */}
                <div className={styles.formGrid}>
                  <Field
                    icon={<FaRegIdCard />}
                    label="PAN Number"
                    name="panNumber"
                    value={form.panNumber}
                    onChange={onChange}
                  />
                </div>
                <UploadBox
                  title="PAN Image"
                  name="panImage"
                  previewSrc={preview.panImage || imgUrl.panImage}
                  onFile={(file) => onFileChange("panImage", file)}
                />
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className={styles.actions}>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              <FaSave className={styles.btnIcon} />
              {saving ? "Saving..." : "Update KYC"}
            </button>
          </div>
        </form>

        {/* RAW */}
        {/* <details className={styles.details}>
          <summary className={styles.detailsSummary}>Raw KYC JSON</summary>
          <pre className={styles.pre}>{JSON.stringify(kyc, null, 2)}</pre>
        </details> */}
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  value,
  onChange,
  mono = false,
  full = false,
}) {
  return (
    <div className={`${styles.fItem} ${full ? styles.fFull : ""}`}>
      <label className={styles.fLabel}>
        <span className={styles.fIcon}>{icon}</span>
        {label}
      </label>
      <input
        className={`${styles.input} ${mono ? styles.mono : ""}`}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function UploadBox({ title, name, previewSrc, onFile }) {
  return (
    <div className={styles.uploadBox}>
      <div className={styles.uploadHead}>
        <div className={styles.uploadTitle}>
          <span className={styles.uploadIcon}>
            <FaImage />
          </span>
          {title}
        </div>

        <label className={styles.uploadBtn}>
          <FaUpload className="me-2" />
          Choose File
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => onFile(e.target.files?.[0])}
          />
        </label>
      </div>

      <div className={styles.uploadPreview}>
        {previewSrc ? (
          <>
            <div className={styles.stackBack} />
            <img src={previewSrc} alt={title} className={styles.previewImg} />
          </>
        ) : (
          <div className={styles.docEmpty}>No image selected</div>
        )}
      </div>
    </div>
  );
}
