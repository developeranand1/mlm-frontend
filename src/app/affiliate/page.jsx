import { FaCheckCircle, FaChartLine, FaLink, FaGift, FaFilePdf, FaArrowRight, FaSignInAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Affiliate.module.css";

export const metadata = {
  title: "Affiliate Program | Old As Gold",
  description:
    "Join Old As Gold Affiliate Program and earn commissions by promoting premium-quality products. Get your referral link, dashboard access, and real-time tracking.",
  keywords: [
    "Old As Gold Affiliate",
    "affiliate program",
    "referral program",
    "earn commission",
    "Old As Gold",
  ],
  alternates: { canonical: "/affiliate" },
  openGraph: {
    title: "Become an Affiliate with Old As Gold",
    description:
      "Start earning commissions by promoting trusted products. Dashboard access, referral link, tracking, and bonuses.",
    url: "/affiliate",
    siteName: "Old As Gold",
    type: "website",
  },
};

export default function AffiliatePage() {
  return (
    <div className={`${styles.page} py-5`}>
      <div className="container">
        <div className={`${styles.hero} row g-4 align-items-stretch`}>
          {/* LEFT */}
          <div className="col-12 col-lg-6">
            <div className={`${styles.card} h-100 p-4 p-md-5`}>
              <div className={styles.badge}>Affiliate Program</div>

              <h1 className={`${styles.title} mt-3`}>
                Become an Affiliate with <span>Old As Gold</span>
              </h1>

              <p className={`${styles.subtitle} mt-3`}>
                Join the Old As Gold Affiliate Program and start earning commissions by promoting our
                premium-quality products. Whether you’re a loyal customer or a passionate marketer,
                you can earn rewards while helping others discover trusted products.
              </p>

              <div className="mt-4">
                <h5 className={styles.sectionTitle}>Benefits You’ll Enjoy</h5>

                <ul className={`${styles.list} mt-3`}>
                  <li><FaCheckCircle /> Instant access to your personal affiliate dashboard</li>
                  <li><FaLink /> Unique referral link to share and earn</li>
                  <li><FaGift /> Attractive commissions on every successful sale</li>
                  <li><FaChartLine /> Real-time tracking of performance and income</li>
                  <li><FaCheckCircle /> Exclusive bonuses for top performers</li>
                </ul>
              </div>

              <div className={`${styles.ctaRow} mt-4 d-flex flex-column flex-sm-row gap-3`}>
                <a href="/signup" className={`btn btn-success ${styles.primaryBtn}`}>
                  Join Now <FaArrowRight className="ms-2" />
                </a>

                <a href="/login" className={`btn btn-outline-light ${styles.secondaryBtn}`}>
                  <FaSignInAlt className="me-2" />
                  Already an affiliate? Log in
                </a>
              </div>

              <p className={`${styles.tcText} mt-4`}>
                By using this website, you acknowledge that you have read, understood, and agreed to
                these Terms &amp; Conditions.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-6">
            <div className={`${styles.side} h-100 p-4 p-md-5`}>
              <h4 className={styles.sideTitle}>💎 Why Join Old As Gold Affiliate Program?</h4>

              <div className="mt-3 d-grid gap-3">
                <div className={styles.feature}>
                  <div className={styles.featureIcon}><FaCheckCircle /></div>
                  <div>
                    <div className={styles.featureHeading}>Promote trusted, high-quality products</div>
                    <div className={styles.featureText}>Share products people love and rely on.</div>
                  </div>
                </div>

                <div className={styles.feature}>
                  <div className={styles.featureIcon}><FaGift /></div>
                  <div>
                    <div className={styles.featureHeading}>Earn lifetime commissions</div>
                    <div className={styles.featureText}>Get rewarded for referrals and repeat purchases.</div>
                  </div>
                </div>

                <div className={styles.feature}>
                  <div className={styles.featureIcon}><FaLink /></div>
                  <div>
                    <div className={styles.featureHeading}>No technical skills needed</div>
                    <div className={styles.featureText}>Just share your unique link &amp; earn.</div>
                  </div>
                </div>

                <div className={styles.feature}>
                  <div className={styles.featureIcon}><FaChartLine /></div>
                  <div>
                    <div className={styles.featureHeading}>Transparent payouts & tracking</div>
                    <div className={styles.featureText}>View clicks, sales, and commission in real-time.</div>
                  </div>
                </div>
              </div>

              <div className={`${styles.howItWorks} mt-4`}>
                <h5 className={styles.sectionTitle}>🌟 How It Works</h5>
                <ol className={`${styles.steps} mt-3`}>
                  <li><strong>Sign Up</strong> – Create your affiliate account.</li>
                  <li><strong>Share</strong> – Use your unique affiliate link to promote products.</li>
                  <li><strong>Earn</strong> – Get paid for every successful referral/purchase.</li>
                </ol>
              </div>

              <div className={`${styles.pdfBox} mt-4`}>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <div>
                    <div className={styles.pdfTitle}>📄 Want to understand the full business model?</div>
                    <div className={styles.pdfText}>Download the PDF and explore details.</div>
                  </div>

                  <a
                    href="/docs/old-as-gold-affiliate.pdf"
                    className={`btn btn-light ${styles.pdfBtn}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaFilePdf className="me-2" />
                    Download PDF
                  </a>
                </div>
                <small className={styles.note}>
                  (Replace PDF link with your real file path)
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom mini bar */}
        <div className={`${styles.bottomBar} mt-4 p-3`}>
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
            <div className={styles.bottomText}>
              Ready to start earning? Join the Affiliate Program now.
            </div>
            <div className="d-flex gap-2">
              <a href="/signup" className="btn btn-success btn-sm">Join Now</a>
              <a href="/terms-conditions" className="btn btn-outline-light btn-sm">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
