import { FaUndoAlt, FaBoxOpen, FaTimesCircle, FaShippingFast, FaMoneyBillWave, FaExchangeAlt, FaUsers, FaClock, FaEnvelope, FaGlobe } from "react-icons/fa";
import styles from "./RefundReturns.module.css";

export const metadata = {
  title: "Refund & Returns Policy | Old As Gold",
  description:
    "Read Old As Gold Refund & Returns Policy for eligibility, non-returnable items, refund timeline, exchange policy, and MLM commission rules.",
};

export default function RefundReturnsPage() {
  const updatedOn = "December 24, 2025";

  const sections = [
    {
      icon: <FaBoxOpen />,
      title: "1. Eligibility for Returns",
      items: [
        "Returns accepted only if the item is damaged, defective, or incorrect at delivery.",
        "Item must be unused, unopened, and in original packaging.",
        "Return request must be raised within 7 days of delivery.",
        "Email us with: Order ID, photo/video proof, and issue description.",
      ],
    },
    {
      icon: <FaTimesCircle />,
      title: "2. Non-Returnable Items",
      items: [
        "Opened or used products",
        "Promotional / clearance sale items",
        "Digital / downloadable goods (if applicable)",
        "MLM memberships, referral bonuses, and commissions",
        "Items without original packaging or proof of purchase",
      ],
    },
    {
      icon: <FaShippingFast />,
      title: "3. Return Process",
      items: [
        "After approval, support will share the return shipping address.",
        "Pack properly and ship within 7 working days after approval.",
        "After inspection, we will notify approval or rejection of refund.",
      ],
    },
    {
      icon: <FaMoneyBillWave />,
      title: "4. Refunds",
      items: [
        "If approved, refund is processed within 7–10 business days.",
        "Refund goes to original payment method.",
        "Shipping / gateway / handling charges are non-refundable.",
        "For COD, we may ask bank details for NEFT transfer.",
      ],
    },
    {
      icon: <FaExchangeAlt />,
      title: "5. Exchange Policy",
      items: [
        "If damaged/defective, you may request replacement for the same product.",
        "Replacement depends on stock availability; otherwise refund will be issued.",
      ],
    },
    {
      icon: <FaUsers />,
      title: "6. MLM & Commission-Related Refunds",
      items: [
        "Bonuses/commissions/wallet credits are non-refundable.",
        "If product is returned/refunded, related commissions may be reversed.",
      ],
    },
    {
      icon: <FaClock />,
      title: "7. Late or Missing Refunds",
      items: [
        "Re-check bank/payment provider.",
        "Contact your bank for processing delays.",
        "If still not received, email us.",
      ],
    },
  ];

  return (
    <section className={styles.page}>
      <div className={`container ${styles.containerFix}`}>
        {/* Header */}
        <div className={styles.hero}>
          <div className={styles.heroIcon}>
            <FaUndoAlt />
          </div>

          <div>
            <h1 className={styles.title}>Refund & Returns Policy</h1>
            <p className={styles.subtitle}>
              Thank you for shopping at <b>Old As Gold</b>. Please read this policy carefully to understand returns,
              exchanges, and refunds.
            </p>

            <div className={styles.metaRow}>
              <span className={styles.metaPill}>Updated: {updatedOn}</span>
              <span className={styles.metaPill}>Return Window: 7 Days</span>
              <span className={styles.metaPill}>Refund Time: 7–10 Business Days</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="row g-4 mt-2">
          {sections.map((s, idx) => (
            <div className="col-12 col-lg-6" key={idx}>
              <div className={`card ${styles.card}`}>
                <div className={`card-body ${styles.cardBody}`}>
                  <div className={styles.cardHead}>
                    <div className={styles.cardIcon}>{s.icon}</div>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                  </div>

                  <ul className={styles.list}>
                    {s.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className={`card mt-4 ${styles.contactCard}`}>
          <div className="card-body">
            <h3 className={styles.contactTitle}>8. Contact Us</h3>
            <p className={styles.contactText}>
              If you have any questions about this Refund & Returns Policy, reach out to us:
            </p>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <div className={styles.contactItem}>
                  <FaEnvelope />
                  <span>
                    Email: <a href="mailto:oldasgold25@gmail.com">oldasgold25@gmail.com</a>
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className={styles.contactItem}>
                  <FaGlobe />
                  <span>
                    Website: <a href="https://oldasgold.com" target="_blank" rel="noreferrer">oldasgold.com</a>
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.note}>
              This policy ensures transparent and fair service for both our customers and MLM members.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
