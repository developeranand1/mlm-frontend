"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

function money(n) {
  return `₹${Number(n || 0).toFixed(2)}`;
}

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

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

  const payNow = async () => {
    if (!items.length) return alert("Cart empty");

    const TOKEN = getToken();
    if (!TOKEN) return alert("Token not found. Please login again.");

    // ✅ single product buy: cart ka first item
    const productId = items[0].id;

    try {
      setLoading(true);

      // 1) Create order (params)
      const r1 = await fetch(
        `${BASE}/api/payments/product/${productId}/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": TOKEN,
          },
        }
      );

      const data = await r1.json();
      if (!r1.ok) throw new Error(data.message || "Create order failed");

      // 2) Open Razorpay
      const options = {
        key: data.key,
        amount: data.amount * 100,
        // currency: data.currency,
        currency: "INR",
        name: "MLM",
        description: "Product Buy",
        order_id: data.orderId,
        prefill: {
          country: "IN",
        },

        handler: async function (response) {
          // 3) Verify payment (params)
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
              }),
            }
          );

          const v = await r2.json();
          if (!r2.ok) return alert(v.message || "Verify failed");

          alert("Payment verified & order placed ✅");
          clearCart();
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp) {
        alert(resp?.error?.description || "Payment failed");
      });

      rzp.open();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <div>
        {items.map((x) => (
          <div
            key={x.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 6,
            }}
          >
            <span>
              {x.name} x {x.qty}
            </span>
            <b>{money((x.price - (x.offerAmount || 0)) * x.qty)}</b>
          </div>
        ))}
      </div>

      <hr />
      <h3>Total: {money(cartTotal)}</h3>

      <button onClick={payNow} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
