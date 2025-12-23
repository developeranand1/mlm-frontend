import styles from "./JoinCommunity.module.css";
import { IoArrowForwardOutline, IoDownloadOutline } from "react-icons/io5";

export default function JoinCommunity() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        {/* Top Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 text-center">
            <h2 className={styles.heading}>Welcome to Old as Gold</h2>

            <p className={styles.text}>
              At <strong>Old as Gold</strong>, we bring you premium, everyday-use
              products designed to improve your lifestyle — while giving you a
              chance to grow financially. Our innovative platform combines{" "}
              <strong>eCommerce convenience</strong> with a{" "}
              <strong>rewarding affiliate system</strong>, allowing you to{" "}
              <strong>
                earn commissions on every successful referral and purchase
              </strong>.
            </p>

            <p className={styles.text}>
              Whether you’re shopping for trusted essentials or starting your
              own network, Old as Gold is the place where{" "}
              <strong>quality meets opportunity</strong>.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className={styles.ctaTitle}>
              Join the <span>Old As Gold</span> Community
            </h1>

            <div className={styles.buttonGroup}>
              <a href="#" className={styles.btnPrimary}>
                <IoDownloadOutline size={22} />
                Download Pdf
                <IoArrowForwardOutline size={18} />
              </a>

              <a href="#" className={styles.btnPrimary}>
                Join Now
                <IoArrowForwardOutline size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
