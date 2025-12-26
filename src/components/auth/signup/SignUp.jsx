

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
// import { authSignUp } from "@/services/authService";
// import { useAuth } from "@/context/AuthProvider";
// import GuestOnly from "@/components/GuestOnly";

// export default function SignUpPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     referralCode: "",
//   });

//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: "", text: "" });

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setMsg({ type: "", text: "" });

//     const payload = {
//       name: form.name.trim(),
//       email: form.email.trim(),
//       phone: form.phone.trim(),
//       password: form.password,
//       ...(form.referralCode?.trim() ? { referralCode: form.referralCode.trim() } : {}),
//     };

//     try {
//       setLoading(true);
//       const data = await authSignUp(payload); // {token, user}
//       login(data);
//       setMsg({ type: "success", text: "Account created! Redirecting..." });
//       router.replace("/dashboard");
//     } catch (err) {
//       setMsg({ type: "danger", text: err.message || "Signup failed." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <GuestOnly>
//       <div className="min-vh-100 d-flex align-items-center bg-light">
//         <div className="container py-4">
//           <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
//             <div className="col-lg-5 p-4 p-lg-5 text-white"
//               style={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #86efac 120%)" }}
//             >
//               <h2 className="fw-bold mb-2">Join Us</h2>
//               <p className="opacity-90 mb-4">Create your account and get started.</p>
//               <div className="mt-4 small opacity-90">
//                 Already have an account?{" "}
//                 <Link className="text-white fw-semibold text-decoration-underline" href="/login">
//                   Login
//                 </Link>
//               </div>
//             </div>

//             <div className="col-lg-7 p-4 p-lg-5">
//               <h3 className="fw-bold mb-1">Create Account</h3>
//               <div className="text-secondary mb-4">Fill in your details</div>

//               {msg?.text ? (
//                 <div className={`alert alert-${msg.type} py-2`} role="alert">
//                   {msg.text}
//                 </div>
//               ) : null}

//               <form onSubmit={onSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Full Name</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-white"><FaUser /></span>
//                     <input className="form-control" name="name" value={form.name} onChange={onChange} required />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Email</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-white"><FaEnvelope /></span>
//                     <input className="form-control" type="email" name="email" value={form.email} onChange={onChange} required />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Phone</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-white"><FaPhoneAlt /></span>
//                     <input className="form-control" name="phone" value={form.phone} onChange={onChange} required />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Password</label>
//                   <div className="input-group">
//                     <span className="input-group-text bg-white"><FaLock /></span>
//                     <input
//                       className="form-control"
//                       type={showPass ? "text" : "password"}
//                       name="password"
//                       value={form.password}
//                       onChange={onChange}
//                       required
//                     />
//                     <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(p => !p)}>
//                       {showPass ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <label className="form-label fw-semibold">
//                     Referral Code <span className="text-secondary fw-normal">(optional)</span>
//                   </label>
//                   <input className="form-control" name="referralCode" value={form.referralCode} onChange={onChange} />
//                 </div>

//                 <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
//                   {loading ? "Creating..." : "Create Account"}
//                 </button>

//                 <div className="text-center mt-3">
//                   <span className="text-secondary">Already have an account?</span>{" "}
//                   <Link href="/login" className="fw-semibold text-decoration-none">Login</Link>
//                 </div>
//               </form>
//             </div>

//           </div>
//         </div>
//       </div>
//     </GuestOnly>
//   );
// }


"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authSignUp } from "@/services/authService";
import { useAuth } from "@/context/AuthProvider";
import GuestOnly from "@/components/GuestOnly";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  // URL: /register?ref=RC0JSRRO&side=R
  const qpRef = useMemo(() => (searchParams.get("ref") || "").trim(), [searchParams]);
  const qpSideRaw = useMemo(() => (searchParams.get("side") || "").trim(), [searchParams]);

  const qpSide = useMemo(() => {
    const s = (qpSideRaw || "").toUpperCase();
    return s === "R" ? "R" : s === "L" ? "L" : ""; // only L/R allowed
  }, [qpSideRaw]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
    side: "L", // default
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Auto-fill referral & side from query params
  useEffect(() => {
    setForm((p) => ({
      ...p,
      referralCode: qpRef || p.referralCode,
      side: qpSide || p.side,
    }));
  }, [qpRef, qpSide]);

  const referralFromUrl = !!qpRef;
  const sideFromUrl = !!qpSide;

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      ...(form.referralCode?.trim() ? { referralCode: form.referralCode.trim() } : {}),
      ...(form.referralCode?.trim() ? { side: (form.side || "L").toUpperCase() } : {}), // side only if referral present
    };

    try {
      setLoading(true);
      const data = await authSignUp(payload); // expected: {token, user}
      login(data);
      setMsg({ type: "success", text: "Account created! Redirecting..." });
      router.replace("/dashboard");
    } catch (err) {
      setMsg({ type: "danger", text: err.message || "Signup failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestOnly>
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container py-4">
          <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
            <div
              className="col-lg-5 p-4 p-lg-5 text-white"
              style={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #86efac 120%)" }}
            >
              <h2 className="fw-bold mb-2">Join Us</h2>
              <p className="opacity-90 mb-4">Create your account and get started.</p>

              {referralFromUrl ? (
                <div className="p-3 rounded-3 bg-white bg-opacity-25 small">
                  <div><b>Referral:</b> {qpRef}</div>
                  <div><b>Side:</b> {qpSide || "L"}</div>
                </div>
              ) : null}

              <div className="mt-4 small opacity-90">
                Already have an account?{" "}
                <Link className="text-white fw-semibold text-decoration-underline" href="/login">
                  Login
                </Link>
              </div>
            </div>

            <div className="col-lg-7 p-4 p-lg-5">
              <h3 className="fw-bold mb-1">Create Account</h3>
              <div className="text-secondary mb-4">Fill in your details</div>

              {msg?.text ? (
                <div className={`alert alert-${msg.type} py-2`} role="alert">
                  {msg.text}
                </div>
              ) : null}

              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaUser /></span>
                    <input
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaEnvelope /></span>
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaPhoneAlt /></span>
                    <input
                      className="form-control"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaLock /></span>
                    <input
                      className="form-control"
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPass((p) => !p)}
                    >
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Referral */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Referral Code <span className="text-secondary fw-normal">(optional)</span>
                  </label>
                  <input
                    className="form-control"
                    name="referralCode"
                    value={form.referralCode}
                    onChange={onChange}
                    placeholder="e.g. RC0JSRRO"
                    readOnly={referralFromUrl} // lock if coming from URL
                  />
                  {referralFromUrl ? (
                    <div className="form-text">
                      Referral code URL se aya hai, isliye locked hai.
                    </div>
                  ) : null}
                </div>

                {/* Side (only relevant when referral exists) */}
                {form.referralCode?.trim() ? (
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Side <span className="text-secondary fw-normal">(L / R)</span>
                    </label>
                    <select
                      className="form-select"
                      name="side"
                      value={form.side}
                      onChange={onChange}
                      disabled={sideFromUrl} // lock if coming from URL
                    >
                      <option value="L">Left (L)</option>
                      <option value="R">Right (R)</option>
                    </select>
                    {sideFromUrl ? (
                      <div className="form-text">
                        Side URL se aya hai, isliye locked hai.
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="mb-4"></div>
                )}

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary">Already have an account?</span>{" "}
                  <Link href="/login" className="fw-semibold text-decoration-none">
                    Login
                  </Link>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </GuestOnly>
  );
}
