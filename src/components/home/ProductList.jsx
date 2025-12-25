"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProductList.module.css";
import { IoHeart, IoCartOutline, IoEyeOutline } from "react-icons/io5";
import { getProductList } from "@/services/productService";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErr("");
        const list = await getProductList();
        if (mounted) setProducts(list);
      } catch (e) {
        if (mounted) setErr(e?.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const withBV = useMemo(() => {
    return products.map((p) => {
      const price = Number(p?.price || 0);
      const bv = Math.max(10, Math.round(price / 3.2));
      return { ...p, bv };
    });
  }, [products]);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 className={styles.heading}>Featured Products</h2>
          <p className={styles.subText}>
            Handpicked wellness products crafted with{" "}
            <span>natural ingredients</span>
          </p>
        </div>

        {loading && <div className="text-center py-5">Loading...</div>}
        {!loading && err && <div className="alert alert-danger">{err}</div>}

        {!loading && !err && (
          <div className="row g-4">
            {withBV.map((p) => (
              <div className="col-12 col-sm-6 col-lg-3" key={p._id}>
                <article className={styles.card}>
                  {/* Wishlist */}
                  <button className={styles.favBtn} aria-label="Wishlist">
                    <IoHeart />
                  </button>

                  {/* Image */}
                  <div className={styles.imgWrap}>
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'>
                              <rect width='100%' height='100%' fill='#f1f3f5'/>
                              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                                fill='#6c757d' font-size='16'>No Image</text>
                            </svg>`
                          );
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className={styles.body}>
                    <h3 className={styles.name} title={p.name}>
                      {p.name}
                    </h3>

                    <div className={styles.priceRow}>
                      <span className={styles.price}>
                        ₹{Number(p.price || 0).toLocaleString("en-IN")}
                      </span>
                      <span className={styles.bv}>{p.bv} BV</span>
                    </div>

                    <div className={styles.actions}>
                      <button className={styles.cartBtn}>
                        <IoCartOutline /> Add to Cart
                      </button>

                      <button className={styles.viewBtn}>
                        <IoEyeOutline /> View
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
