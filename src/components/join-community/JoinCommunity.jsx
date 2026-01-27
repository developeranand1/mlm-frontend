import styles from "./JoinCommunity.module.css";
import { IoArrowForwardOutline, IoDownloadOutline } from "react-icons/io5";
import { FaUsers, FaChartLine, FaShieldAlt } from "react-icons/fa";

export default function JoinCommunity() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            <span className={styles.topTag}>Old As Gold Community</span>
            <h2 className={styles.heading}>Welcome to Old as Gold</h2>

            <p className={styles.text}>
              At <strong>Old as Gold</strong>, we bring you premium daily-use wellness products
              — with a <strong>rewarding affiliate system</strong> that helps you earn from
              referrals and purchases.
            </p>

            <div className="row g-3 mt-3">
              <div className="col-12 col-md-4">
                <div className={styles.featureCard}>
                  <FaUsers className={styles.fIcon} />
                  <h6>Community Growth</h6>
                  <p>Build your network with trusted products & support.</p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className={styles.featureCard}>
                  <FaChartLine className={styles.fIcon} />
                  <h6>Earn with Referrals</h6>
                  <p>Share your link & earn on every successful sale.</p>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className={styles.featureCard}>
                  <FaShieldAlt className={styles.fIcon} />
                  <h6>Trusted Quality</h6>
                  <p>Premium wellness products — consistent & reliable.</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaBox}>
              <h1 className={styles.ctaTitle}>
                Join the <span>Old As Gold</span> Community
              </h1>

              <div className={styles.buttonGroup}>
                <a  href="/images/pdf/oldasgold.pdf" className={styles.btnPrimary}>
                  <IoDownloadOutline size={22} />
                  Download Pdf
                  <IoArrowForwardOutline size={18} />
                </a>

                <a href="/signup" className={styles.btnPrimarySolid}>
                  Join Now
                  <IoArrowForwardOutline size={18} />
                </a>
              </div>

              <p className={styles.smallText}>
                Already an affiliate? <a href="/login">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
