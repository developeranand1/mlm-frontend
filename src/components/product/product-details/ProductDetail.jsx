"use client";

import React from "react";
import styles from "./ProductDetail.module.css";
import {
  FaShoppingCart,
  FaBolt,
  FaBoxOpen,
  FaTag,
  FaStar,
  FaRegStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCheckCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }) {
  const router = useRouter();
    const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning mb-0">Product not found.</div>
      </div>
    );
  }

  const {
    name,
    description,
    price,
    offerAmount,
    brand,
    size,
    quality,
    stock,
    image,
    category,
    subcategory,
  } = product;

  const hasOffer = typeof offerAmount === "number" && offerAmount > 0;
  const finalPrice = hasOffer ? Math.max(price - offerAmount, 0) : price;
  const discountPercent = hasOffer
    ? Math.round((offerAmount / price) * 100)
    : 0;

  const onAddToCart = () => {
    addItem(product, 1); // ✅ duplicate safe, qty++
  };

  const onBuyNow = () => {
    addItem(product, 1);
    router.push("/cart"); // ✅ direct cart page
  };

  const rating = 4; // demo UI rating (replace with real rating if you have)

  return (
    <div className={`container py-4 ${styles.page}`}>
      <div className="row g-4 align-items-start">
        {/* LEFT: GALLERY */}
        <div className="col-12 col-lg-6">
          <div className={styles.mediaCard}>
            <div className={styles.imageWrap}>
              <img src={image} alt={name} className={styles.image} />
              {hasOffer && (
                <div className={styles.cornerBadge}>
                  <FaTag className="me-2" />
                  {discountPercent}% OFF
                </div>
              )}
              {stock <= 0 && (
                <div className={styles.soldBadge}>Out of Stock</div>
              )}
            </div>

            <div className={styles.thumbRow}>
              {/* Optional thumbnails (same image for demo) */}
              {[1, 2, 3, 4].map((i) => (
                <button key={i} className={styles.thumbBtn} type="button">
                  <img src={image} alt={`thumb-${i}`} className={styles.thumb} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="col-12 col-lg-6">
          <div className={styles.detailCard}>
            {/* Title + meta */}
            <div className="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h1 className={styles.title}>{name}</h1>
                <p className={styles.subtitle}>{description}</p>
              </div>

              <span
                className={`${styles.stockPill} ${
                  stock > 0 ? styles.inStock : styles.outStock
                }`}
              >
                <FaCheckCircle className="me-2" />
                {stock > 0 ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Rating Row */}
            <div className="d-flex align-items-center gap-2 mt-2">
              <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((i) =>
                  i <= rating ? (
                    <FaStar key={i} />
                  ) : (
                    <FaRegStar key={i} />
                  )
                )}
              </div>
              <span className={styles.ratingText}>
                {rating}.0 <span className={styles.muted}>(1,248 reviews)</span>
              </span>
            </div>

            {/* Pills */}
            <div className="d-flex flex-wrap gap-2 mt-3">
              <span className={styles.pill}>
                <FaBoxOpen className="me-2" />
                Brand: <b className="ms-1">{brand || "-"}</b>
              </span>
              <span className={styles.pill}>
                Size: <b className="ms-1">{size || "-"}</b>
              </span>
              <span className={styles.pill}>
                Quality: <b className="ms-1">{quality || "-"}</b>
              </span>
              <span className={styles.pill}>
                Category: <b className="ms-1">{category?.name || "-"}</b>
              </span>
              <span className={styles.pill}>
                Subcategory: <b className="ms-1">{subcategory?.name || "-"}</b>
              </span>
            </div>

            {/* Price block */}
            <div className={styles.priceCard}>
              <div className="d-flex align-items-end flex-wrap gap-2">
                <div className={styles.finalPrice}>₹{finalPrice.toFixed(2)}</div>

                {hasOffer && (
                  <>
                    <div className={styles.oldPrice}>₹{price.toFixed(2)}</div>
                    <div className={styles.saveBadge}>
                      Save ₹{offerAmount.toFixed(2)}
                    </div>
                  </>
                )}
              </div>

              <div className={styles.taxLine}>
                Inclusive of all taxes • Free delivery above ₹499
              </div>
            </div>

            {/* CTA buttons */}
            <div className="row g-2 mt-2">
              <div className="col-12 col-md-6">
                <button
                  type="button"
                  className={`btn w-100 ${styles.btnGreen}`}
                  onClick={onBuyNow}
                  disabled={stock <= 0}
                >
                  <FaBolt className="me-2" />
                  Buy Now
                </button>
              </div>
              <div className="col-12 col-md-6">
                <button
                  type="button"
                  className={`btn w-100 ${styles.btnOutline}`}
                  onClick={onAddToCart}
                  disabled={stock <= 0}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Trust + delivery */}
            <div className={`mt-3 ${styles.featureGrid}`}>
              <div className={styles.featureItem}>
                <FaTruck />
                <div>
                  <div className={styles.featureTitle}>Fast Delivery</div>
                  <div className={styles.featureSub}>2–4 business days</div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <FaShieldAlt />
                <div>
                  <div className={styles.featureTitle}>Secure Payment</div>
                  <div className={styles.featureSub}>100% protected</div>
                </div>
              </div>

              <div className={styles.featureItem}>
                <FaUndo />
                <div>
                  <div className={styles.featureTitle}>Easy Returns</div>
                  <div className={styles.featureSub}>7 days policy</div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
