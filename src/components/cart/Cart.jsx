"use client";

import React, { useMemo, useState } from "react";
import styles from "./CartPage.module.css";
import { useCart } from "@/context/CartContext";
import {
  FaTrashAlt,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTag,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBroom,
} from "react-icons/fa";

function money(n) {
  return `₹${Number(n || 0).toFixed(2)}`;
}

export default function CartPage() {
  const { items, updateQty, removeItem, cartTotal, clearCart } = useCart();
  const [confirm, setConfirm] = useState({ open: false, type: "", payload: null });

  const subtotal = cartTotal; // future: taxes/shipping add kar sakte ho

  const openRemove = (item) => setConfirm({ open: true, type: "remove", payload: item });
  const openClear = () => setConfirm({ open: true, type: "clear", payload: null });
  const close = () => setConfirm({ open: false, type: "", payload: null });

  const onConfirm = () => {
    if (confirm.type === "remove") {
      removeItem(confirm.payload.id);
    } else if (confirm.type === "clear") {
      clearCart();
    }
    close();
  };

  if (!items.length) {
    return (
      <div className={`container py-5 ${styles.page}`}>
        <div className={`alert ${styles.emptyAlert}`}>
          <FaShoppingCart className="me-2" />
          Your cart is empty.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h3 className={styles.title}>My Cart</h3>
            <div className={styles.subtitle}>Review your items & proceed to checkout</div>
          </div>

          <button className={`btn ${styles.clearBtn}`} onClick={openClear}>
            <FaBroom className="me-2" /> Clear cart
          </button>
        </div>

        <div className="row g-4">
          {/* LEFT: items */}
          <div className="col-12 col-lg-8">
            <div className={styles.tableCard}>
              <div className={styles.tableHead}>
                <div className={styles.thProduct}>Product</div>
                <div className={styles.thPrice}>Price</div>
                <div className={styles.thQty}>Quantity</div>
                <div className={styles.thSub}>Subtotal</div>
              </div>

              {items.map((p) => {
                const hasOffer = typeof p.offerAmount === "number" && p.offerAmount > 0;
                const finalPrice = hasOffer ? Math.max(p.price - p.offerAmount, 0) : p.price;
                const line = finalPrice * (p.qty || 0);

                return (
                  <div key={p.id} className={styles.rowItem}>
                    <button
                      className={styles.removeX}
                      onClick={() => openRemove(p)}
                      aria-label="Remove item"
                      type="button"
                      title="Remove"
                    >
                      <FaTrashAlt />
                    </button>

                    <div className={styles.prodCell}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className={styles.img}
                      />
                      <div className={styles.prodInfo}>
                        <div className={styles.prodName}>{p.name}</div>
                        <div className={styles.prodMeta}>
                          {p.brand ? <span className={styles.metaPill}>{p.brand}</span> : null}
                          {p.size ? <span className={styles.metaPill}>Size: {p.size}</span> : null}
                          {hasOffer ? (
                            <span className={styles.offerPill}>
                              <FaTag className="me-1" /> Save {money(p.offerAmount)}
                            </span>
                          ) : null}
                          <span className={`${styles.stockPill} ${p.stock > 0 ? styles.inStock : styles.outStock}`}>
                            <FaCheckCircle className="me-1" />
                            {p.stock > 0 ? "In stock" : "Out"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.priceCell}>
                      <div className={styles.priceNow}>{money(finalPrice)}</div>
                      {hasOffer ? <div className={styles.priceOld}>{money(p.price)}</div> : null}
                    </div>

                    <div className={styles.qtyCell}>
                      <div className={styles.qtyBox}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(p.id, (p.qty || 0) - 1)}
                          type="button"
                        >
                          <FaMinus />
                        </button>

                        <div className={styles.qtyNum}>{p.qty}</div>

                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQty(p.id, (p.qty || 0) + 1)}
                          type="button"
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>

                    <div className={styles.subCell}>{money(line)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: totals */}
          <div className="col-12 col-lg-4">
            <div className={styles.totalCard}>
              <div className={styles.totalTitle}>Cart totals</div>

              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <b>{money(subtotal)}</b>
              </div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <b className={styles.totalBig}>{money(cartTotal)}</b>
              </div>

              <button className={`btn ${styles.checkoutBtn}`}>
                PROCEED TO CHECKOUT
              </button>

              <div className={styles.smallNote}>
                Inclusive of all taxes • Free delivery above ₹499
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {confirm.open && (
        <div className={styles.modalBackdrop} onClick={close}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHead}>
              <div className={styles.modalIcon}>
                <FaExclamationTriangle />
              </div>
              <div>
                <div className={styles.modalTitle}>
                  {confirm.type === "clear" ? "Clear cart?" : "Remove item?"}
                </div>
                <div className={styles.modalSub}>
                  {confirm.type === "clear"
                    ? "This will remove all items from your cart."
                    : `Remove “${confirm.payload?.name}” from your cart?`}
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <button className={`btn ${styles.btnGhost}`} onClick={close}>
                Cancel
              </button>
              <button className={`btn ${styles.btnDanger}`} onClick={onConfirm}>
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
