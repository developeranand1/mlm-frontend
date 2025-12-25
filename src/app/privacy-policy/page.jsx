import { FaShieldHalved, FaDatabase, FaCookieBite, FaShareNodes, FaLock, FaUserCheck, FaUsers, FaEnvelope, FaClock, FaLink, FaRotate } from "react-icons/fa6";
import styles from "./PrivacyPolicy.module.css";

export const metadata = {
  title: "Privacy Policy | Old As Gold",
  description:
    "Learn how Old As Gold collects, uses, shares, and protects your personal information across eCommerce and MLM/referral services.",
  alternates: { canonical: "/privacy-policy" },
};

const items = [
  {
    icon: <FaDatabase />,
    title: "Information We Collect",
    body: `We may collect:
• Personal Information: Name, email, phone, billing/shipping address, payment details.
• Account Information: Username, password, MLM referral/sponsor details.
• Transaction Information: Purchase history, order details, payment records.
• Technical Data: IP address, browser type, device info via cookies/analytics.`,
  },
  {
    icon: <FaUserCheck />,
    title: "How We Use Your Information",
    body: `We use your information to:
• Process orders, payments, and deliveries.
• Manage MLM accounts and track referrals/commissions.
• Provide support and respond to inquiries.
• Send order updates, offers, and service notifications.
• Improve website performance and user experience.
• Ensure legal compliance and prevent fraud.`,
  },
  {
    icon: <FaCookieBite />,
    title: "Cookies and Tracking",
    body: `We use cookies to remember preferences, analyze traffic, and personalize offers/ads.
You can disable cookies in browser settings, but some features may not work properly.
We may use third-party tools like Google Analytics or Facebook Pixel for marketing insights.`,
  },
  {
    icon: <FaShareNodes />,
    title: "Sharing and Disclosure",
    body: `We do not sell or rent your personal information.
We may share limited data with:
• Payment gateways (Razorpay, Paytm, Stripe).
• Courier/logistics partners for delivery.
• Hosting/IT providers for maintenance.
• Legal authorities when required by law.`,
  },
  {
    icon: <FaLock />,
    title: "Data Security",
    body: `We use industry-standard encryption and security measures.
However, no online platform can guarantee 100% security.`,
  },
  {
    icon: <FaShieldHalved />,
    title: "Your Rights",
    body: `You can:
• Access, update, or delete your data.
• Withdraw consent for marketing or processing.
• Request a copy of your stored data.
Contact: oldasgold25@gmail.com`,
  },
  {
    icon: <FaUsers />,
    title: "MLM & Affiliate Data",
    body: `If you join our MLM/referral program, we may store:
• Referral links, sponsor IDs, network data.
• Commission records and wallet transactions.
• Performance metrics for bonuses and payouts.
Used only for managing MLM activities and accurate commissions.`,
  },
  {
    icon: <FaEnvelope />,
    title: "Email & Communication",
    body: `By registering or purchasing, you agree to receive:
• Transactional emails (order updates, invoices).
• Promotional offers/newsletters (unsubscribe anytime).`,
  },
  {
    icon: <FaClock />,
    title: "Data Retention",
    body: `We keep data as long as needed for services and legal compliance.
MLM data may be stored longer for record-keeping and payout verification.`,
  },
  {
    icon: <FaLink />,
    title: "Third-Party Links",
    body: `Our website may link to other sites.
We are not responsible for their content or privacy policies—please review their terms before sharing data.`,
  },
  {
    icon: <FaRotate />,
    title: "Changes to This Policy",
    body: `We may update this policy occasionally.
Changes will be posted on this page with an updated date—please review regularly.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.page}>
      <div className="container py-4 py-lg-5">
        <div className={styles.hero}>
          <div className={styles.heroBadge}>Old As Gold • Privacy</div>
          <h1 className={styles.h1}>Privacy Policy</h1>
          <p className={styles.lead}>
            We value your privacy and are committed to protecting your personal information across our eCommerce and MLM services.
          </p>
        </div>

        <div className="row g-4 mt-3">
          <div className="col-lg-8">
            <div className={styles.card}>
              {items.map((it, idx) => (
                <div className={styles.item} key={idx}>
                  <div className={styles.iIcon}>{it.icon}</div>
                  <div className={styles.iBody}>
                    <h2 className={styles.h2}>{idx + 1}. {it.title}</h2>
                    <p className={styles.p}>{it.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.sticky}>
              <div className={styles.sideCard}>
                <h3 className={styles.h3}>Contact</h3>
                <p className={styles.muted}>Questions about your privacy or data?</p>

                <a className={styles.actionBtn} href="mailto:oldasgold25@gmail.com">
                  Email: oldasgold25@gmail.com
                </a>

                <a className={styles.actionBtn} href="https://oldasgold.com" target="_blank" rel="noreferrer">
                  Visit: oldasgold.com
                </a>

                <div className={styles.note}>
                  By using our website, you agree to the terms outlined in this Privacy Policy.
                </div>
              </div>

              <div className={styles.sideCard}>
                <h3 className={styles.h3}>Last Updated</h3>
                <div className={styles.datePill}>2025-01-01</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
