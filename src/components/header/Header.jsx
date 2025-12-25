// "use client";

// import { useState } from "react";
// import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
// import styles from './Header.module.css'; // Importing the CSS module
// import Link from "next/link";
// import { useAuth } from "@/context/AuthProvider";

// export default function Header() {
//    const { isLoggedIn, user, logout, ready } = useAuth();
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

//   const toggleOffcanvas = () => {
//     setIsOffcanvasOpen(!isOffcanvasOpen);
//   };

//   return (
//     <>
//       {/* Main Navbar */}
//       <nav className={styles.premiumNavbar}>
//         <div className="container">
//           <div className="d-flex justify-content-between align-items-center">
//             {/* Left: Hamburger (Mobile) */}
//             <button 
//               className={styles.hamburgerBtn} 
//               onClick={toggleOffcanvas}
//               aria-label="Toggle menu"
//             >
//               <FaBars />
//             </button>

//             {/* Center: Logo */}
//             <a href="/" className={styles.brandLogo}>
//               OLD AS GOLD
//             </a>

//             {/* Center: Desktop Navigation */}
//             <ul className={styles.navLinks}>
//               <li><Link href="/" className={styles.navLinkItem}>Home</Link></li>
//               <li><Link href="/about-us" className={styles.navLinkItem}>About Us</Link></li>
//               <li><Link href="/product" className={styles.navLinkItem}>Our Products</Link></li>
//               <li><Link href="/affiliate" className={styles.navLinkItem}>Become an Affiliate</Link></li>
//               <li><Link href="/galley-list" className={styles.navLinkItem}>Gallery</Link></li>
//             </ul>

//             {/* Right: Action Buttons (Desktop) */}
//             <div className={styles.actionButtons}>
//               <button className={`${styles.btnPremium} ${styles.btnCart}`}>
//                 <FaShoppingCart />
//                 Buy Now
//               </button>
//               <Link href={"/login"} className={`${styles.btnPremium} ${styles.btnLogin}`}>
//                 <FaUser />
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Overlay */}
//       <div 
//         className={`${styles.offcanvasOverlay} ${isOffcanvasOpen ? styles.active : ''}`}
//         onClick={toggleOffcanvas}
//       ></div>

//       {/* Off-Canvas Menu */}
//       <div className={`${styles.offcanvasMenu} ${isOffcanvasOpen ? styles.open : ''}`}>
       
//         <div className={styles.offcanvasBody}>
//           <ul className={styles.offcanvasNav}>
//             <li className={styles.offcanvasNavItem}>
//               <Link href="/" className={styles.offcanvasNavLink}>Home</Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link href="/about-us" className={styles.offcanvasNavLink}>About Us</Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link href="/product" className={styles.offcanvasNavLink}>Our Products</Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link href="/affiliate" className={styles.offcanvasNavLink}>Affiliate</Link>
//             </li>
//             <li className={styles.offcanvasNavItem}>
//               <Link href="/galley-list" className={styles.offcanvasNavLink}>Gallery</Link>
//             </li>
//           </ul>

//           <div className={styles.offcanvasActions}>
//             <button className={`${styles.btnPremium} ${styles.btnCart} w-100`}>
//               <FaShoppingCart />
//               Buy Now
//             </button>
//             <Link href={"/login"} className={`${styles.btnPremium} ${styles.btnLogin} w-100`}>
//               <FaUser />
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import styles from "./Header.module.css";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, logout, ready } = useAuth();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const toggleOffcanvas = () => setIsOffcanvasOpen((p) => !p);
  const closeOffcanvas = () => setIsOffcanvasOpen(false);

  const onLogout = () => {
    logout();
    closeOffcanvas();
    router.replace("/login");
  };

  // avoid flicker before localStorage loads
  if (!ready) return null;

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
              <li><Link href="/" className={styles.navLinkItem}>Home</Link></li>
              <li><Link href="/about-us" className={styles.navLinkItem}>About Us</Link></li>
              <li><Link href="/product" className={styles.navLinkItem}>Our Products</Link></li>
              <li><Link href="/affiliate" className={styles.navLinkItem}>Become an Affiliate</Link></li>
              <li><Link href="/galley-list" className={styles.navLinkItem}>Gallery</Link></li>
            </ul>

            <div className={styles.actionButtons}>
              <button className={`${styles.btnPremium} ${styles.btnCart}`}>
                <FaShoppingCart />
                Buy Now
              </button>

              {!isLoggedIn ? (
                <Link href="/login" className={`${styles.btnPremium} ${styles.btnLogin}`}>
                  <FaUser />
                  Login
                </Link>
              ) : (
                <div className={styles.userBox}>
                  <span className={styles.userName} title={user?.email}>
                    {user?.name || user?.username || "User"}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className={`${styles.btnPremium} ${styles.btnLogout}`}
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`${styles.offcanvasOverlay} ${isOffcanvasOpen ? styles.active : ""}`}
        onClick={toggleOffcanvas}
      />

      <div className={`${styles.offcanvasMenu} ${isOffcanvasOpen ? styles.open : ""}`}>
        <div className={styles.offcanvasBody}>
          <ul className={styles.offcanvasNav}>
            <li className={styles.offcanvasNavItem}>
              <Link href="/" className={styles.offcanvasNavLink} onClick={closeOffcanvas}>
                Home
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link href="/about-us" className={styles.offcanvasNavLink} onClick={closeOffcanvas}>
                About Us
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link href="/product" className={styles.offcanvasNavLink} onClick={closeOffcanvas}>
                Our Products
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link href="/affiliate" className={styles.offcanvasNavLink} onClick={closeOffcanvas}>
                Affiliate
              </Link>
            </li>
            <li className={styles.offcanvasNavItem}>
              <Link href="/galley-list" className={styles.offcanvasNavLink} onClick={closeOffcanvas}>
                Gallery
              </Link>
            </li>
          </ul>

          <div className={styles.offcanvasActions}>
            <button className={`${styles.btnPremium} ${styles.btnCart} w-100`}>
              <FaShoppingCart />
              Buy Now
            </button>

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
                  Signed in as <b>{user?.name || user?.username}</b>
                </div>
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

