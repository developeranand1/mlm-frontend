import Link from "next/link";
import styles from "./ConnectUS.module.css";
import {
  IoCallOutline,
  IoMailOutline,
  IoLocationOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";

export default function ConnectUS() {
  return (
    <section className={styles.section}>
      <div className="container text-center">
        <h2 className={styles.title}>Contact Us</h2>

        <p className={styles.desc}>
          Feel free to contact us our experts on phone and email. We are happy to
          get in touch with you. Our dedicated and managed support is ready 24/7
          to provide best solutions for your need.
        </p>

        <div className={styles.infoWrap}>
          <a href="tel:+919257568687" className={styles.infoItem}>
            <IoCallOutline />
            <span>+91 70 5657 4050</span>
          </a>

          <a href="mailto:info@mrkwellness.net" className={styles.infoItem}>
            <IoMailOutline />
            <span>oldasgold25@gmail.com</span>
          </a>

          <div className={styles.infoItem}>
            <IoLocationOutline />
            <span>
               Opp. New Anaj Mandi,Safidon, Haryana
            </span>
          </div>
        </div>

        <Link href={"/contact-us"} className={styles.btn}>
          <IoChatboxEllipsesOutline />
          Send Message
        </Link>
      </div>
    </section>
  );
}
