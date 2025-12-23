"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProductList.module.css";
import { IoHeart, IoCartOutline } from "react-icons/io5";
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

  // screenshot jaisa "BV" badge — data me nahi hai, to simple calc
  const withBV = useMemo(() => {
    return products.map((p) => {
      const price = Number(p?.price || 0);
      const bv = Math.max(10, Math.round(price / 3.2)); // simple estimate
      return { ...p, bv };
    });
  }, [products]);

  return (
    <section className={`py-4 ${styles.section}`}>
      <div className="container">
        {/* Top text line (optional) */}
        <div className="text-center mb-4">
          <p className={styles.topText}>
            Handpicked wellness products crafted with{" "}
            <span className={styles.green}>natural ingredients</span> for your health
            <br />
            and beauty needs
          </p>
        </div>

        {loading && <div className="text-center py-5">Loading...</div>}
        {!loading && err && (
          <div className="alert alert-danger" role="alert">
            {err}
          </div>
        )}

        {!loading && !err && (
          <div className="row g-4">
            {withBV.map((p) => (
              <div className="col-12 col-sm-6 col-lg-3" key={p._id}>
                <article className={styles.card}>
                  {/* heart */}
                  <button className={styles.favBtn} type="button" aria-label="Wishlist">
                    <IoHeart />
                  </button>

                  {/* image */}
                  <div className={styles.imgWrap}>
                    <img
                      src={p.image}
                      alt={p.name}
                      className={styles.img}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src =
                          "data:image/svg+xml;charset=UTF-8," +
                          encodeURIComponent(
                            `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
                              <rect width='100%' height='100%' fill='#f1f3f5'/>
                              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                                fill='#6c757d' font-size='18'>No Image</text>
                            </svg>`
                          );
                      }}
                    />
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.name} title={p.name}>
                      {p.name}
                    </h3>

                    <div className={styles.priceRow}>
                      <div className={styles.price}>₹{Number(p.price || 0).toLocaleString("en-IN")}</div>
                    </div>

                    <div className={styles.bvRow}>
                      <span className={styles.bvLabel}>Business Value</span>
                      <span className={styles.bvBadge}>{p.bv} BV</span>
                    </div>

                    <button type="button" className={styles.addBtn}>
                      <IoCartOutline className={styles.cartIcon} />
                      Add to Cart
                    </button>

                    <button type="button" className={styles.viewBtn}>
                      View Details
                    </button>
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
