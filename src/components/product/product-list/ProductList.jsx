"use client";

import { useEffect, useState } from "react";
import { FaShoppingCart, FaTag, FaBoxOpen, FaStar } from "react-icons/fa";
import { getProductList } from "@/services/productService";
import styles from "./ProductList.module.css";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductList();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className={styles.center}>Loading products...</p>;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.heading}>Our Products</h2>
        <p className={styles.sub}>
          Premium wellness & lifestyle products curated for you
        </p>

        <div className="row g-4">
          {products.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p._id}>
              <div className={styles.card}>
                {/* Image */}
                <div className={styles.imgWrap}>
                  <img src={p.image} alt={p.name} />
                  {p.stock > 0 ? (
                    <span className={styles.inStock}>In Stock</span>
                  ) : (
                    <span className={styles.outStock}>Out of Stock</span>
                  )}
                </div>

                {/* Body */}
                <div className={styles.body}>
                  <h3 className={styles.name}>{p.name}</h3>

                  <p className={styles.desc}>
                    {p.description?.slice(0, 80)}...
                  </p>

                  <div className={styles.meta}>
                    <span>
                      <FaTag /> {p.category?.name || "General"}
                    </span>
                    <span>
                      <FaStar /> {p.quality}
                    </span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>₹{p.price}</span>
                    <span className={styles.size}>
                      <FaBoxOpen /> Size: {p.size}
                    </span>
                  </div>

                  <div className={styles.btnRow}>
                    <button className={styles.cartBtn}>
                      <FaShoppingCart />
                      Add to Cart
                    </button>

                    <Link
                      href={`/product/${p.slug}`}
                      className={styles.viewBtn}
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
