"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./Checkout.module.css";

// ✅ Icons
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaMapMarkedAlt,
  FaCity,
  FaFlag,
  FaMapPin,
  FaLandmark,
  FaUndo,
  FaLock,
  FaShoppingBag,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function money(n) {
  return `₹${Number(n || 0).toFixed(2)}`;
}

const initialAddress = {
  fullName: "",
  phone: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState(initialAddress);
  const [touched, setTouched] = useState({});
  const [msg, setMsg] = useState({ type: "", text: "" });

  const BASE = "http://localhost:5000";

  const getToken = () => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("token") || "";
  };

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  // -------- validation helpers ----------
  const errors = useMemo(() => {
    const e = {};
    if (!address.fullName.trim()) e.fullName = "Full name is required";
    if (!/^\d{10}$/.test(address.phone.trim())) e.phone = "Enter 10-digit phone";
    if (address.email && !/^\S+@\S+\.\S+$/.test(address.email.trim()))
      e.email = "Enter valid email";
    if (!address.line1.trim()) e.line1 = "Address line 1 is required";
    if (!address.city.trim()) e.city = "City is required";
    if (!address.state.trim()) e.state = "State is required";
    if (!/^\d{6}$/.test(address.pincode.trim()))
      e.pincode = "Enter 6-digit pincode";
    return e;
  }, [address]);

  const isAddressValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setAddress((p) => ({ ...p, [name]: value }));
  };

  const onBlur = (e) => setTouched((p) => ({ ...p, [e.target.name]: true }));
  const showError = (field) => touched[field] && errors[field];

  const InputIcon = ({ children }) => (
    <span className={styles.inputIcon}>{children}</span>
  );

  // -------- payment flow ----------
  const payNow = async () => {
    setMsg({ type: "", text: "" });

    if (!items.length) {
      setMsg({ type: "danger", text: "Cart is empty." });
      return;
    }

    const TOKEN = getToken();
    if (!TOKEN) {
      setMsg({ type: "danger", text: "Token not found. Please login again." });
      return;
    }

    setTouched({
      fullName: true,
      phone: true,
      email: true,
      line1: true,
      city: true,
      state: true,
      pincode: true,
      line2: true,
      landmark: true,
    });

    if (!isAddressValid) {
      setMsg({ type: "danger", text: "Please fix address form errors." });
      return;
    }

    const productId = items[0].id;

    try {
      setLoading(true);

      const r1 = await fetch(
        `${BASE}/api/payments/product/${productId}/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": TOKEN,
          },
          body: JSON.stringify({ address, cart: items }),
        }
      );

      const data = await r1.json();
      if (!r1.ok) throw new Error(data.message || "Create order failed");

      const options = {
        key: data.key,
        amount: data.amount * 100,
        currency: "INR",
        name: "MLM",
        description: "Product Buy",
        order_id: data.orderId,
        prefill: {
          name: address.fullName,
          email: address.email || undefined,
          contact: address.phone,
        },
        notes: { shipping_address: JSON.stringify(address) },

        handler: async function (response) {
          try {
            const r2 = await fetch(
              `${BASE}/api/payments/product/${productId}/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": TOKEN,
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  address,
                }),
              }
            );

            const v = await r2.json();
            if (!r2.ok) throw new Error(v.message || "Verify failed");

            setMsg({ type: "success", text: "Payment verified & order placed ✅" });
            clearCart();
          } catch (err) {
            setMsg({ type: "danger", text: err.message || "Verify failed" });
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp) {
        setMsg({
          type: "danger",
          text: resp?.error?.description || "Payment failed",
        });
      });

      rzp.open();
    } catch (e) {
      setMsg({ type: "danger", text: e.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  const AlertIcon =
    msg.type === "success" ? <FaCheckCircle /> : msg.type ? <FaExclamationTriangle /> : null;

  return (
    <div className={`container ${styles.wrap}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <FaShoppingBag className={styles.titleIcon} /> Checkout
        </h2>
        <div className={styles.secure}>
          <FaLock /> Secure payment
        </div>
      </div>

      {msg.text ? (
        <div
          className={`alert alert-${msg.type} ${styles.alert}`}
          role="alert"
        >
          <span className={styles.alertIcon}>{AlertIcon}</span>
          <span>{msg.text}</span>
        </div>
      ) : null}

      <div className="row g-4">
        {/* LEFT */}
        <div className="col-12 col-lg-7">
          <div className={`card ${styles.card}`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>
                <FaMapMarkedAlt /> Delivery Address
              </h5>

              <div className="row g-3">
                {/* Full Name */}
                <div className="col-12">
                  <label className="form-label">Full Name *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaUser /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("fullName") ? "is-invalid" : ""
                      }`}
                      name="fullName"
                      value={address.fullName}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Enter full name"
                    />
                  </div>
                  {showError("fullName") && (
                    <div className="invalid-feedback">{errors.fullName}</div>
                  )}
                </div>

                {/* Phone */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Phone *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaPhoneAlt /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("phone") ? "is-invalid" : ""
                      }`}
                      name="phone"
                      value={address.phone}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="10-digit mobile"
                    />
                  </div>
                  {showError("phone") && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div>

                {/* Email */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Email (optional)</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaEnvelope /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("email") ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={address.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="example@mail.com"
                    />
                  </div>
                  {showError("email") && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>

                {/* Line 1 */}
                <div className="col-12">
                  <label className="form-label">Address Line 1 *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaHome /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("line1") ? "is-invalid" : ""
                      }`}
                      name="line1"
                      value={address.line1}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="House / Flat / Street"
                    />
                  </div>
                  {showError("line1") && (
                    <div className="invalid-feedback">{errors.line1}</div>
                  )}
                </div>

                {/* Line 2 */}
                <div className="col-12">
                  <label className="form-label">Address Line 2 (optional)</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaMapPin /></InputIcon>
                    <input
                      className={`form-control ${styles.input}`}
                      name="line2"
                      value={address.line2}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Area / Colony"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="col-12 col-md-4">
                  <label className="form-label">City *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaCity /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("city") ? "is-invalid" : ""
                      }`}
                      name="city"
                      value={address.city}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="City"
                    />
                  </div>
                  {showError("city") && (
                    <div className="invalid-feedback">{errors.city}</div>
                  )}
                </div>

                {/* State */}
                <div className="col-12 col-md-4">
                  <label className="form-label">State *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaFlag /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("state") ? "is-invalid" : ""
                      }`}
                      name="state"
                      value={address.state}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="State"
                    />
                  </div>
                  {showError("state") && (
                    <div className="invalid-feedback">{errors.state}</div>
                  )}
                </div>

                {/* Pincode */}
                <div className="col-12 col-md-4">
                  <label className="form-label">Pincode *</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaMapPin /></InputIcon>
                    <input
                      className={`form-control ${styles.input} ${
                        showError("pincode") ? "is-invalid" : ""
                      }`}
                      name="pincode"
                      value={address.pincode}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="6-digit"
                    />
                  </div>
                  {showError("pincode") && (
                    <div className="invalid-feedback">{errors.pincode}</div>
                  )}
                </div>

                {/* Landmark */}
                <div className="col-12 col-md-6">
                  <label className="form-label">Landmark (optional)</label>
                  <div className={styles.inputWrap}>
                    <InputIcon><FaLandmark /></InputIcon>
                    <input
                      className={`form-control ${styles.input}`}
                      name="landmark"
                      value={address.landmark}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="Near ..."
                    />
                  </div>
                </div>

                {/* Reset */}
                <div className="col-12 col-md-6 d-flex align-items-end">
                  <button
                    type="button"
                    className={`btn btn-outline-secondary w-100 ${styles.resetBtn}`}
                    onClick={() => {
                      setAddress(initialAddress);
                      setTouched({});
                      setMsg({ type: "", text: "" });
                    }}
                    disabled={loading}
                  >
                    <FaUndo className={styles.btnIcon} />
                    Reset Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-12 col-lg-5">
          <div className={`card ${styles.card} ${styles.summaryCard}`}>
            <div className="card-body">
              <h5 className={styles.cardTitle}>
                <FaShoppingBag /> Order Summary
              </h5>

              <div className={styles.items}>
                {items.map((x) => (
                  <div key={x.id} className={styles.itemRow}>
                    <span className={styles.itemName}>
                      {x.name} <small className="text-muted">x {x.qty}</small>
                    </span>
                    <b className={styles.price}>
                      {money((x.price - (x.offerAmount || 0)) * x.qty)}
                    </b>
                  </div>
                ))}
              </div>

              <hr className={styles.hr} />

              <div className={styles.totalRow}>
                <span>Total</span>
                <b className={styles.total}>{money(cartTotal)}</b>
              </div>

              <button
                className={`btn w-100 mt-3 ${styles.payBtn}`}
                onClick={payNow}
                disabled={loading || !items.length || !isAddressValid}
                title={!isAddressValid ? "Fill address to enable payment" : ""}
              >
                <FaLock className={styles.btnIcon} />
                {loading ? "Processing..." : "Pay Now"}
              </button>

              {!isAddressValid && (
                <div className={styles.hint}>
                  Fill all required address fields to enable payment.
                </div>
              )}

              {isAddressValid && (
                <div className={styles.okHint}>
                  <FaCheckCircle /> Address looks good. You can proceed.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
