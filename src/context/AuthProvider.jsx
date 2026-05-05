// "use client";

// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [ready, setReady] = useState(false);
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   // initial load from localStorage
//   useEffect(() => {
//     try {
//       const t = localStorage.getItem("token");
//       const u = localStorage.getItem("user");
//       setToken(t || null);
//       setUser(u ? JSON.parse(u) : null);
//     } catch {
//       setToken(null);
//       setUser(null);
//     } finally {
//       setReady(true);
//     }
//   }, []);

//   const isLoggedIn = !!token && !!user;

//   const login = ({ token, user }) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     setToken(token);
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setToken(null);
//     setUser(null);
//   };

//   const value = useMemo(
//     () => ({ ready, isLoggedIn, token, user, login, logout }),
//     [ready, isLoggedIn, token, user]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export const useAuth = () => useContext(AuthContext);


"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ 1. initial load + expiry check
  useEffect(() => {
    try {
      const t = localStorage.getItem("token");
      const u = localStorage.getItem("user");

      if (t) {
        const decoded = jwtDecode(t);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          // 🔴 expired → logout
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        } else {
          setToken(t);
          setUser(u ? JSON.parse(u) : null);
        }
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (e) {
      console.log("Auth error:", e);
      setToken(null);
      setUser(null);
    } finally {
      setReady(true);
    }
  }, []);

  // ✅ 2. auto logout timer
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();

      const timeLeft = expiryTime - currentTime;

      if (timeLeft <= 0) {
        logout();
        return;
      }

      const timer = setTimeout(() => {
        logout();
      }, timeLeft);

      setTimeout(() => {
  logout();
}, timeLeft);

      return () => clearTimeout(timer);
    } catch {
      logout();
    }
  }, [token]);

  const isLoggedIn = !!token && !!user;

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ ready, isLoggedIn, token, user, login, logout }),
    [ready, isLoggedIn, token, user]
  );  

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
