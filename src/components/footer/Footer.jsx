"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegAddressCard,
} from "react-icons/fa"; // Importing icons from react-icons
import styles from "./Footer.module.css"; // Importing custom CSS module
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h3 className={styles.footerTitle}>About OldAsGold</h3>
            <p>
              A trusted platform offering premium-quality products with timeless
              value and modern style, crafted to deliver excellence and
              reliability.
            </p>
            <h5 className={styles.footerSubtitle}>Contact Information</h5>
            <ul className={styles.contactList}>
              <li>
                <FaPhoneAlt className={styles.icon} /> +91-70 5657 4050
              </li>
              <li>
                <FaEnvelope className={styles.icon} /> oldasgold25@gmail.com
              </li>
              <li>
                <FaMapMarkerAlt className={styles.icon} /> Opp. New Anaj
                Mandi,Safidon, Haryana
              </li>
            </ul>
          </div>

          {/* Middle Column */}
          <div className="col-lg-4 col-md-3 mb-4">
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.quickLinks}>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/product-list">Our Products</Link>
              </li>
              {/* <li>
                <Link href="/gallery-list">Gallery</Link>
              </li> */}
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="col-lg-4 col-md-3 mb-4">
            <h3 className={styles.footerTitle}>Legal</h3>
            <ul className={styles.quickLinks}>
              <li>
                <Link href="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/refund-returns">Refund Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
            </ul>

            {/* <div className={styles.supportCard}>
              <h5 className={styles.footerSubtitle}>24/7 Support</h5>
              <p>
                Feel free to contact us our experts on phone and email. We are happy to get in touch with you.
              </p>
              <button className={styles.supportBtn}>
                <FaRegAddressCard className={styles.icon} /> Get Support
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
