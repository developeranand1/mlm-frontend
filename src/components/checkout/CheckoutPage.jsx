"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaCity,
  FaFlag,
  FaMapPin,
  FaLandmark,
  FaLock,
  FaShoppingBag,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

/* ---------------- HELPERS ---------------- */
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
};

/* ================= INPUT COMPONENT ================= */
function Input({
  icon,
  name,
  placeholder,
  col,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onBlur,
}) {
  return (
    <div className={`col-${col}`}>
      <div className="position-relative">
        <span
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#16a34a",
            pointerEvents: "none",
          }}
        >
          {icon}
        </span>

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          className={`form-control ps-5 ${
            touched && error ? "is-invalid" : ""
          }`}
        />

        {touched && error && (
          <div className="invalid-feedback">{error}</div>
        )}
      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();

  const [address, setAddress] = useState(initialAddress);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const BASE = process.env.NEXT_PUBLIC_API_URL;

  /* ---------- Razorpay Script ---------- */
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  /* ---------- Validation ---------- */
  const errors = useMemo(() => {
    const e = {};
    if (!address.fullName.trim()) e.fullName = "Full name required";
    if (!/^\d{10}$/.test(address.phone)) e.phone = "10 digit phone required";
    if (address.email && !/^\S+@\S+\.\S+$/.test(address.email))
      e.email = "Invalid email";
    if (!address.line1.trim()) e.line1 = "Address required";
    if (!address.city.trim()) e.city = "City required";
    if (!address.state.trim()) e.state = "State required";
    if (!/^\d{6}$/.test(address.pincode))
      e.pincode = "6 digit pincode required";
    return e;
  }, [address]);

  const isValid = Object.keys(errors).length === 0;

  /* ---------- HANDLERS ---------- */
  const handleChange = (e) => {
    let val = e.target.value;

    // only digits for phone & pincode
    if (e.target.name === "phone" || e.target.name === "pincode") {
      val = val.replace(/\D/g, "");
    }

    setAddress((p) => ({ ...p, [e.target.name]: val }));
  };

  const handleBlur = (e) => {
    setTouched((p) => ({ ...p, [e.target.name]: true }));
  };

  /* ---------- PAYMENT ---------- */
  const payNow = async () => {
    if (!isValid || !items.length) return;

    try {
      setLoading(true);

      const r1 = await fetch(`${BASE}payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: items[0].id,
          address,
        }),
      });

      const data = await r1.json();
      if (!r1.ok) throw new Error(data.message);

      new window.Razorpay({
        key: data.key,
        amount: data.amount * 100,
        currency: "INR",
        name: "Old As Gold",
        description: "Secure Checkout",
        order_id: data.orderId,
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phone,
        },
        // method: {
        //   upi: true,
        //   card: false,
        //   netbanking: true,
        // },
 

        handler: async (res) => {
          await fetch(`${BASE}payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(res),
          });

          clearCart();
          setMsg({ type: "success", text: "Order placed successfully!" });
        },
      }).open();
    } catch (e) {
      setMsg({
        type: "danger",
        text: "Payment failed. Please use UPI or Indian bank.",
      });
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold d-flex align-items-center gap-2">
          <FaShoppingBag /> Checkout
        </h3>
        <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
          <FaLock /> Secure
        </span>
      </div>

      {msg.text && (
        <div className={`alert alert-${msg.type} d-flex gap-2`}>
          {msg.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
          {msg.text}
        </div>
      )}

      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Shipping Details</h5>

              <div className="row g-3">
                <Input col="12" icon={<FaUser />} name="fullName" placeholder="Full Name"
                  value={address.fullName} error={errors.fullName}
                  touched={touched.fullName} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="12" icon={<FaPhoneAlt />} name="phone" placeholder="Phone" type="tel"
                  value={address.phone} error={errors.phone}
                  touched={touched.phone} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="12" icon={<FaEnvelope />} name="email" placeholder="Email (optional)" type="email"
                  value={address.email} error={errors.email}
                  touched={touched.email} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="12" icon={<FaHome />} name="line1" placeholder="Address"
                  value={address.line1} error={errors.line1}
                  touched={touched.line1} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="12" icon={<FaLandmark />} name="line2" placeholder="Area / Landmark"
                  value={address.line2} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="6" icon={<FaCity />} name="city" placeholder="City"
                  value={address.city} error={errors.city}
                  touched={touched.city} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="6" icon={<FaFlag />} name="state" placeholder="State"
                  value={address.state} error={errors.state}
                  touched={touched.state} onChange={handleChange} onBlur={handleBlur}
                />
                <Input col="12" icon={<FaMapPin />} name="pincode" placeholder="Pincode" type="tel"
                  value={address.pincode} error={errors.pincode}
                  touched={touched.pincode} onChange={handleChange} onBlur={handleBlur}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>

              {items.map((i) => (
                <div key={i.id} className="d-flex justify-content-between mb-2">
                  <span>{i.name} × {i.qty}</span>
                  <b>{money(i.price * i.qty)}</b>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span className="text-success">{money(cartTotal)}</span>
              </div>

              <button
                className="btn btn-success w-100 mt-4 py-3 fw-bold rounded-3"
                onClick={payNow}
                disabled={!isValid || loading}
              >
                <FaLock className="me-2" />
                {loading ? "Processing..." : "Pay Securely"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
