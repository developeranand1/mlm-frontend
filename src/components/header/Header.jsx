// "use client";

// import { useState } from "react";
// import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
// import styles from "./Header.module.css";
// import Link from "next/link";
// import { useAuth } from "@/context/AuthProvider";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// export default function Header() {
//   const { cartCount } = useCart();
//   const router = useRouter();
//   const { isLoggedIn, user, logout, ready } = useAuth();
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

//   const toggleOffcanvas = () => setIsOffcanvasOpen((p) => !p);
//   const closeOffcanvas = () => setIsOffcanvasOpen(false);

//   const onLogout = () => {
//     logout();
//     closeOffcanvas();
//     router.replace("/login");
//   };

//   // avoid flicker before localStorage loads
//   if (!ready) return null;

//   return (
//     <>
//       <nav className={styles.premiumNavbar}>
//         <div className="container">
//           <div className="d-flex justify-content-between align-items-center">
//             <button
//               className={styles.hamburgerBtn}
//               onClick={toggleOffcanvas}
//               aria-label="Toggle menu"
//             >
//               <FaBars />
//             </button>

//             <Link href="/" className={styles.brandLogo}>
//               OLD AS GOLD
//             </Link>

//             <ul className={styles.navLinks}>
//               <li>
//                 <Link href="/" className={styles.navLinkItem}>
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about-us" className={styles.navLinkItem}>
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/product" className={styles.navLinkItem}>
//                   Our Products
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/affiliate" className={styles.navLinkItem}>
//                   Become an Affiliate
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/galley-list" className={styles.navLinkItem}>
//                   Gallery
//                 </Link>
//               </li>
//             </ul>

//             <div className={styles.actionButtons}>
//               <Link
//                 href={"/cart"}
//                 className={`position-relative ${styles.btnPremium} ${styles.btnCart}`}
//               >
//                 <FaShoppingCart />
//                 {cartCount > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>

//               {!isLoggedIn ? (
//                 <Link
//                   href="/login"
//                   className={`${styles.btnPremium} ${styles.btnLogin}`}
//                 >
//                   <FaUser />
//                   Login
//                 </Link>
//               ) : (
//                 <div className={styles.userBox}>
//                   <span className={styles.userName} title={user?.email}>
//                     {user?.name || user?.username || "User"}
//                   </span>
//                   <button
//                     type="button"
//                     onClick={onLogout}
//                     className={`${styles.btnPremium} ${styles.btnLogout}`}
//                   >
//                     <FaSignOutAlt />
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div
//         className={`${styles.offcanvasOverlay} ${
//           isOffcanvasOpen ? styles.active : ""
//         }`}
//         onClick={toggleOffcanvas}
//       />

//       <div
//         className={`${styles.offcanvasMenu} ${
//           isOffcanvasOpen ? styles.open : ""
//         }`}
//       >
//         <div className={styles.offcanvasBody}>
//           <ul className={styles.offcanvasNav}>
//             <li className={styles.offcanvasNavItem}>
//               <Link
//                 href="/"
//                 className={styles.offcanvasNavLink}
//                 onClick={closeOffcanvas}
//               >
//                 Home
//               </Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link
//                 href="/about-us"
//                 className={styles.offcanvasNavLink}
//                 onClick={closeOffcanvas}
//               >
//                 About Us
//               </Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link
//                 href="/product"
//                 className={styles.offcanvasNavLink}
//                 onClick={closeOffcanvas}
//               >
//                 Our Products
//               </Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link
//                 href="/affiliate"
//                 className={styles.offcanvasNavLink}
//                 onClick={closeOffcanvas}
//               >
//                 Affiliate
//               </Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link
//                 href="/galley-list"
//                 className={styles.offcanvasNavLink}
//                 onClick={closeOffcanvas}
//               >
//                 Gallery
//               </Link>
//             </li>
//           </ul>

//           <div className={styles.offcanvasActions}>
//             <Link
//               href={"/cart"}
//               className={`position-relative ${styles.btnPremium} ${styles.btnCart}`}
//             >
//               <FaShoppingCart /> BuyNow
//               {cartCount > 0 && (
//                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cartCount}
//                 </span>
//               )}
//             </Link>

//             {!isLoggedIn ? (
//               <Link
//                 href="/login"
//                 className={`${styles.btnPremium} ${styles.btnLogin} w-100`}
//                 onClick={closeOffcanvas}
//               >
//                 <FaUser />
//                 Login
//               </Link>
//             ) : (
//               <>
//                 <div className={styles.mobileUser}>
//                   Signed in as <b>{user?.name || user?.username}</b>
//                 </div>
//                 <button
//                   type="button"
//                   className={`${styles.btnPremium} ${styles.btnLogout} w-100`}
//                   onClick={onLogout}
//                 >
//                   <FaSignOutAlt />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaBars,
  FaSignOutAlt,
  FaTachometerAlt,
  FaChevronDown,
} from "react-icons/fa";
import styles from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  const router = useRouter();
  const { isLoggedIn, user, logout, ready } = useAuth();

  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);

  const toggleOffcanvas = () => setIsOffcanvasOpen((p) => !p);
  const closeOffcanvas = () => setIsOffcanvasOpen(false);

  const toggleUserMenu = () => setIsUserMenuOpen((p) => !p);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  const onLogout = () => {
    logout();
    closeUserMenu();
    closeOffcanvas();
    router.replace("/login");
  };

  const goDashboard = () => {
    closeUserMenu();
    closeOffcanvas();
    router.push("/dashboard"); // ✅ change if your route is different
  };

  // close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (!ready) return null;

  const displayName = user?.name || user?.username || "User";
  const initials =
    displayName
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "U";

  return (
    <>
      <nav className={styles.premiumNavbar}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className={styles.hamburgerBtn}
              onClick={toggleOffcanvas}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            <Link href="/" className={styles.brandLogo}>
              OLD AS GOLD
            </Link>

            <ul className={styles.navLinks}>
              <li>
                <Link href="/" className={styles.navLinkItem}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className={styles.navLinkItem}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/product" className={styles.navLinkItem}>
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className={styles.navLinkItem}>
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link href="/galley-list" className={styles.navLinkItem}>
                  Gallery
                </Link>
              </li>
            </ul>

            <div className={styles.actionButtons}>
              <Link
                href="/cart"
                className={`position-relative ${styles.btnPremium} ${styles.btnCart}`}
              >
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className={`${styles.btnPremium} ${styles.btnLogin}`}
                >
                  <FaUser />
                  Login
                </Link>
              ) : (
                // ✅ USER DROPDOWN
                <div className={styles.userMenuWrap} ref={userMenuRef}>
                  <button
                    type="button"
                    className={styles.userMenuBtn}
                    onClick={toggleUserMenu}
                    aria-haspopup="menu"
                    aria-expanded={isUserMenuOpen}
                  >
                    <span className={styles.avatarCircle}>{initials}</span>
                    <span className={styles.userName} title={user?.email}>
                      {displayName}
                    </span>
                    <FaChevronDown
                      className={`${styles.chev} ${
                        isUserMenuOpen ? styles.chevOpen : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className={styles.userDropdown} role="menu">
                      <button
                        type="button"
                        className={styles.dropItem}
                        onClick={goDashboard}
                      >
                        <FaTachometerAlt className={styles.dropIcon} />
                        Dashboard
                      </button>

                      <button
                        type="button"
                        className={`${styles.dropItem} ${styles.dropDanger}`}
                        onClick={onLogout}
                      >
                        <FaSignOutAlt className={styles.dropIcon} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* overlay */}
      <div
        className={`${styles.offcanvasOverlay} ${
          isOffcanvasOpen ? styles.active : ""
        }`}
        onClick={toggleOffcanvas}
      />

      {/* offcanvas */}
      <div
        className={`${styles.offcanvasMenu} ${
          isOffcanvasOpen ? styles.open : ""
        }`}
      >
        <div className={styles.offcanvasBody}>
          <ul className={styles.offcanvasNav}>
            <li className={styles.offcanvasNavItem}>
              <Link
                href="/"
                className={styles.offcanvasNavLink}
                onClick={closeOffcanvas}
              >
                Home
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link
                href="/about-us"
                className={styles.offcanvasNavLink}
                onClick={closeOffcanvas}
              >
                About Us
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link
                href="/product"
                className={styles.offcanvasNavLink}
                onClick={closeOffcanvas}
              >
                Our Products
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link
                href="/affiliate"
                className={styles.offcanvasNavLink}
                onClick={closeOffcanvas}
              >
                Affiliate
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link
                href="/galley-list"
                className={styles.offcanvasNavLink}
                onClick={closeOffcanvas}
              >
                Gallery
              </Link>
            </li>
          </ul>

          <div className={styles.offcanvasActions}>
            <Link
              href="/cart"
              className={`position-relative ${styles.btnPremium} ${styles.btnCart}`}
              onClick={closeOffcanvas}
            >
              <FaShoppingCart /> BuyNow
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className={`${styles.btnPremium} ${styles.btnLogin} w-100`}
                onClick={closeOffcanvas}
              >
                <FaUser />
                Login
              </Link>
            ) : (
              <>
                <div className={styles.mobileUser}>
                  <span className={styles.avatarCircleSm}>{initials}</span>
                  <div>
                    <div className={styles.mobileSigned}>Signed in as</div>
                    <b className={styles.mobileName}>{displayName}</b>
                  </div>
                </div>

                <button
                  type="button"
                  className={`${styles.btnPremium} ${styles.btnLogin} w-100`}
                  onClick={goDashboard}
                >
                  <FaTachometerAlt />
                  Dashboard
                </button>

                <button
                  type="button"
                  className={`${styles.btnPremium} ${styles.btnLogout} w-100`}
                  onClick={onLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
