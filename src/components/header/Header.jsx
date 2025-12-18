"use client";

import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css'; // Importing the CSS module

export default function Header() {
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={styles.premiumNavbar}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Left: Hamburger (Mobile) */}
            <button 
              className={styles.hamburgerBtn} 
              onClick={toggleOffcanvas}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            {/* Center: Logo */}
            <a href="#" className={styles.brandLogo}>
              OLD AS GOLD
            </a>

            {/* Center: Desktop Navigation */}
            <ul className={styles.navLinks}>
              <li><a href="#" className={styles.navLinkItem}>Home</a></li>
              <li><a href="#" className={styles.navLinkItem}>About Us</a></li>
              <li><a href="#" className={styles.navLinkItem}>Our Products</a></li>
              <li><a href="#" className={styles.navLinkItem}>Legal</a></li>
              <li><a href="#" className={styles.navLinkItem}>Gallery</a></li>
            </ul>

            {/* Right: Action Buttons (Desktop) */}
            <div className={styles.actionButtons}>
              <button className={`${styles.btnPremium} ${styles.btnCart}`}>
                <FaShoppingCart />
                Buy Now
              </button>
              <button className={`${styles.btnPremium} ${styles.btnLogin}`}>
                <FaUser />
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div 
        className={`${styles.offcanvasOverlay} ${isOffcanvasOpen ? styles.active : ''}`}
        onClick={toggleOffcanvas}
      ></div>

      {/* Off-Canvas Menu */}
      <div className={`${styles.offcanvasMenu} ${isOffcanvasOpen ? styles.open : ''}`}>
       
        <div className={styles.offcanvasBody}>
          <ul className={styles.offcanvasNav}>
            <li className={styles.offcanvasNavItem}>
              <a href="#" className={styles.offcanvasNavLink}>Home</a>
            </li>
            <li className={styles.offcanvasNavItem}>
              <a href="#" className={styles.offcanvasNavLink}>About Us</a>
            </li>
            <li className={styles.offcanvasNavItem}>
              <a href="#" className={styles.offcanvasNavLink}>Our Products</a>
            </li>
            <li className={styles.offcanvasNavItem}>
              <a href="#" className={styles.offcanvasNavLink}>Legal</a>
            </li>
            <li className={styles.offcanvasNavItem}>
              <a href="#" className={styles.offcanvasNavLink}>Gallery</a>
            </li>
          </ul>

          <div className={styles.offcanvasActions}>
            <button className={`${styles.btnPremium} ${styles.btnCart} w-100`}>
              <FaShoppingCart />
              Buy Now
            </button>
            <button className={`${styles.btnPremium} ${styles.btnLogin} w-100`}>
              <FaUser />
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
