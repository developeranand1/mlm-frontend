"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_KEY = "app_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, name, price, image, qty, ...}]

  // load cart on mount
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY));
      if (Array.isArray(saved)) setItems(saved);
    } catch {}
  }, []);

  // persist
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    if (!product?._id && !product?.id) return;
    const id = product._id || product.id;

    setItems((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (exists) {
        return prev.map((p) =>
          p.id === id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [
        ...prev,
        {
          id,
          name: product.name,
          price: product.price,
          offerAmount: product.offerAmount || 0,
          image: product.image,
          stock: product.stock ?? 0,
          qty,
        },
      ];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p))
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = useMemo(
    () => items.reduce((sum, p) => sum + (p.qty || 0), 0),
    [items]
  );

  const cartTotal = useMemo(() => {
    return items.reduce((sum, p) => {
      const hasOffer = typeof p.offerAmount === "number" && p.offerAmount > 0;
      const finalPrice = hasOffer ? Math.max(p.price - p.offerAmount, 0) : p.price;
      return sum + finalPrice * p.qty;
    }, 0);
  }, [items]);

  const value = { items, addItem, removeItem, updateQty, clearCart, cartCount, cartTotal };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
