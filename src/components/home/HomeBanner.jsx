import styles from "./HomeBanner.module.css";

export default function HomeBanner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <div className={`row align-items-center ${styles.rowGap}`}>
          {/* LEFT */}
          <div className="col-12 col-lg-7">
            <h1 className={styles.title}>
              Turn Every Purchase
              <br />
              Into an Earning &amp; Opportunity
            </h1>

            <button className={styles.ctaBtn} type="button">
              Explore Products
            </button>
          </div>

          {/* RIGHT */}
          <div className="col-12 col-lg-5">
            <div className={styles.imageWrap}>
              {/* Put your image in /public/images/bottles.png */}
              <img
                src="/images/bottles.png"
                alt="Product bottles"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
