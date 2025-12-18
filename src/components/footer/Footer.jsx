"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegAddressCard,
} from "react-icons/fa"; // Importing icons from react-icons
import styles from "./Footer.module.css"; // Importing custom CSS module

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
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Our Products</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="col-lg-4 col-md-3 mb-4">
            <h3 className={styles.footerTitle}>Legal</h3>
            <ul className={styles.quickLinks}>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Refund Policy</a>
              </li>
              <li>
                <a href="#">Delivery Policy</a>
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
