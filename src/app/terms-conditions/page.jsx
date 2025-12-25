import {
  FaFileContract,
  FaCheckCircle,
  FaGlobe,
  FaShoppingCart,
  FaUndoAlt,
  FaUsers,
  FaCopyright,
  FaUserShield,
  FaExclamationTriangle,
  FaGavel,
  FaLink,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./TermsConditions.module.css";

export const metadata = {
  title: "Terms & Conditions | Old As Gold",
  description:
    "Read the Terms & Conditions for using Old As Gold website, products, payments, MLM/affiliate program, and legal policies.",
};

export default function TermsConditionsPage() {
  const sections = [
    {
      icon: <FaCheckCircle />,
      title: "1. Acceptance of Terms",
      body: `By using this website, creating an account, or purchasing any product or service,
you acknowledge that you have read, understood, and agreed to these Terms & Conditions,
along with our Privacy Policy and Refund & Returns Policy.
If you do not agree, please do not use our website.`,
    },
    {
      icon: <FaGlobe />,
      title: "2. Use of the Website",
      body: `• You must be at least 18 years old to register or make a purchase.
• You must not use the website for illegal or unauthorized purposes.
• You must not attempt unauthorized access, disrupt functionality, or distribute malware.
• We reserve the right to suspend or terminate accounts that violate policies or engage in fraud.`,
    },
    {
      icon: <FaShoppingCart />,
      title: "3. Product Orders and Payments",
      body: `• Prices are listed in INR unless stated otherwise.
• Orders are confirmed only after successful payment.
• We may cancel orders due to pricing errors, payment failure, or stock unavailability.
• Shipping charges and timelines vary by location.
• Payments via third-party gateways are subject to their terms and security policies.`,
    },
    {
      icon: <FaUndoAlt />,
      title: "4. Refunds and Returns",
      body: `Our Refund & Returns Policy governs all return and refund requests.
We do not accept returns or refunds for:
• Used or opened items
• MLM memberships or commissions
• Discounted or promotional items`,
    },
    {
      icon: <FaUsers />,
      title: "5. MLM / Affiliate Program Terms",
      body: `• Only one account per user is allowed.
• Commissions and bonuses are calculated as per the current plan.
• Earnings are based on effort and sales; they are not guaranteed.
• Fake referrals or manipulation can lead to account termination.
• Commissions may be reversed if related orders are refunded or cancelled.
• MLM payouts are subject to verification, policies, and applicable taxes.
• Old As Gold may modify or discontinue MLM plans at any time.`,
    },
    {
      icon: <FaCopyright />,
      title: "6. Intellectual Property",
      body: `All website content including text, images, graphics, logos, videos, and software
is the property of Old As Gold or its licensors.
You may not copy, reproduce, modify, or distribute any content without written permission.`,
    },
    {
      icon: <FaUserShield />,
      title: "7. User Accounts and Security",
      body: `You are responsible for maintaining the confidentiality of your login credentials.
All activities under your account are your responsibility.
Notify us immediately if you suspect unauthorized access.`,
    },
    {
      icon: <FaExclamationTriangle />,
      title: "8. Limitation of Liability",
      body: `Old As Gold is not liable for:
• Any direct or indirect damages from product use or website access.
• Loss of data, profits, or business opportunities.
All products are provided “as is” without warranties beyond those stated by manufacturers.`,
    },
    {
      icon: <FaGavel />,
      title: "9. Indemnification",
      body: `You agree to indemnify and hold harmless Old As Gold, its team, and partners
from any claim or loss resulting from:
• Violation of these Terms
• Misuse of the website or services
• Breach of laws or intellectual property`,
    },
    {
      icon: <FaLink />,
      title: "10. Third-Party Links",
      body: `Our website may contain links to third-party websites.
We are not responsible for their content, policies, or practices.
Accessing them is at your own risk.`,
    },
    {
      icon: <FaFileContract />,
      title: "11. Modification of Terms",
      body: `We may update these Terms & Conditions at any time without prior notice.
Changes will be posted on this page with the updated date.
Continued use of the website implies acceptance of revised terms.`,
    },
    {
      icon: <FaGavel />,
      title: "12. Governing Law",
      body: `These Terms & Conditions are governed by the laws of India.
All disputes are subject to the exclusive jurisdiction of the courts in New Delhi, India.`,
    },
  ];

  return (
    <section className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        {/* Header */}
        <div className={styles.hero}>
          <div className={styles.heroIcon}>
            <FaFileContract />
          </div>

          <div>
            <h1 className={styles.title}>Terms & Conditions</h1>
            <p className={styles.subtitle}>
              Welcome to <b>Old As Gold</b>. Please read these terms carefully before using our website.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Jurisdiction: India</span>
              <span className={styles.metaPill}>Applies to Website, Products & MLM</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="row g-4 mt-3">
          {sections.map((s, idx) => (
            <div className="col-12 col-lg-6" key={idx}>
              <div className={`card ${styles.card}`}>
                <div className="card-body">
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon}>{s.icon}</div>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                  </div>
                  <p className={styles.text}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className={`card mt-4 ${styles.contactCard}`}>
          <div className="card-body">
            <h3 className={styles.contactTitle}>13. Contact Us</h3>
            <p className={styles.text}>
              For questions or concerns related to these Terms & Conditions:
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <a href="mailto:oldasgold25@gmail.com">oldasgold25@gmail.com</a>
                </div>
              </div>
              <div className="col-md-6">
                <div className={styles.contactItem}>
                  <FaGlobe />
                  <a href="https://oldasgold.com" target="_blank" rel="noreferrer">
                    oldasgold.com
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.note}>
              By using this website, you acknowledge that you have read, understood,
              and agreed to these Terms & Conditions.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
