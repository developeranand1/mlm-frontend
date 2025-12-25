// // "use client";

// // import Link from "next/link";
// // import { useState } from "react";
// // import {
// //   FaUser,
// //   FaEnvelope,
// //   FaPhoneAlt,
// //   FaLock,
// //   FaEye,
// //   FaEyeSlash,
// //   FaGoogle,
// // } from "react-icons/fa";

// // export default function SignUp() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     referralCode: "",
// //   });

// //   const [showPass, setShowPass] = useState(false);

// //   const onChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((p) => ({ ...p, [name]: value }));
// //   };

// //   const onSubmit = (e) => {
// //     e.preventDefault();

// //     const payload = {
// //       name: form.name,
// //       email: form.email,
// //       phone: form.phone,
// //       password: form.password,
// //       ...(form.referralCode?.trim()
// //         ? { referralCode: form.referralCode.trim() }
// //         : {}),
// //     };

// //     console.log("SIGNUP PAYLOAD:", payload);
// //     alert("Signup payload logged ✅");
// //   };

// //   return (
// //     <div
// //       className="min-vh-100 d-flex align-items-center"
// //       style={{
// //         background:
// //           "radial-gradient(1200px 600px at 10% 10%, rgba(34,197,94,.18), transparent), radial-gradient(1200px 600px at 90% 20%, rgba(22,163,74,.16), transparent), #f8fafc",
// //       }}
// //     >
// //       <div className="container py-4">
// //         <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
// //           {/* LEFT PANEL */}
// //           <div className="col-lg-5 p-4 p-lg-5 text-white"
// //             style={{
// //               background:
// //                 "linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #86efac 120%)",
// //             }}
// //           >
// //             <h2 className="fw-bold mb-2">Join Us</h2>
// //             <p className="opacity-90 mb-4">
// //               Create your account and unlock access to premium learning
// //               resources, expert mentors, and more.
// //             </p>

// //             <div className="bg-white bg-opacity-10 rounded-4 p-3">
// //               <div className="d-flex gap-3 align-items-start">
// //                 <div
// //                   className="rounded-circle d-flex align-items-center justify-content-center"
// //                   style={{ width: 38, height: 38, background: "rgba(255,255,255,.18)" }}
// //                 >
// //                   ✓
// //                 </div>
// //                 <div>
// //                   <div className="fw-semibold">Quick Signup</div>
// //                   <div className="small opacity-90">
// //                     Clean form, instant access.
// //                   </div>
// //                 </div>
// //               </div>

// //               <hr className="border-white border-opacity-25 my-3" />

// //               <div className="d-flex gap-3 align-items-start">
// //                 <div
// //                   className="rounded-circle d-flex align-items-center justify-content-center"
// //                   style={{ width: 38, height: 38, background: "rgba(255,255,255,.18)" }}
// //                 >
// //                   🔒
// //                 </div>
// //                 <div>
// //                   <div className="fw-semibold">Secure</div>
// //                   <div className="small opacity-90">
// //                     Your details stay protected.
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="mt-4 small opacity-90">
// //               Already have an account?{" "}
// //               <a className="text-white fw-semibold text-decoration-underline" href="/login">
// //                 Login
// //               </a>
// //             </div>
// //           </div>

// //           {/* RIGHT FORM */}
// //           <div className="col-lg-7 p-4 p-lg-5">
// //             <div className="mb-4">
// //               <h3 className="fw-bold mb-1">Create Account</h3>
// //               <div className="text-secondary">Fill in your details to get started</div>
// //             </div>

// //             <form onSubmit={onSubmit}>
// //               {/* Name */}
// //               <div className="mb-3">
// //                 <label className="form-label fw-semibold">Full Name</label>
// //                 <div className="input-group">
// //                   <span className="input-group-text bg-white">
// //                     <FaUser />
// //                   </span>
// //                   <input
// //                     className="form-control"
// //                     name="name"
// //                     value={form.name}
// //                     onChange={onChange}
// //                     placeholder="Anand Kumar"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Email */}
// //               <div className="mb-3">
// //                 <label className="form-label fw-semibold">Email Address</label>
// //                 <div className="input-group">
// //                   <span className="input-group-text bg-white">
// //                     <FaEnvelope />
// //                   </span>
// //                   <input
// //                     className="form-control"
// //                     type="email"
// //                     name="email"
// //                     value={form.email}
// //                     onChange={onChange}
// //                     placeholder="anand@email.com"
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               {/* Phone */}
// //               <div className="mb-3">
// //                 <label className="form-label fw-semibold">Phone Number</label>
// //                 <div className="input-group">
// //                   <span className="input-group-text bg-white">
// //                     <FaPhoneAlt />
// //                   </span>
// //                   <input
// //                     className="form-control"
// //                     name="phone"
// //                     value={form.phone}
// //                     onChange={onChange}
// //                     placeholder="8126137013"
// //                     inputMode="numeric"
// //                     required
// //                   />
// //                 </div>
// //                 <div className="form-text">We’ll only use this for account verification.</div>
// //               </div>

// //               {/* Password */}
// //               <div className="mb-3">
// //                 <label className="form-label fw-semibold">Password</label>
// //                 <div className="input-group">
// //                   <span className="input-group-text bg-white">
// //                     <FaLock />
// //                   </span>

// //                   <input
// //                     className="form-control"
// //                     type={showPass ? "text" : "password"}
// //                     name="password"
// //                     value={form.password}
// //                     onChange={onChange}
// //                     placeholder="Minimum 8 characters"
// //                     required
// //                   />

// //                   <button
// //                     type="button"
// //                     className="btn btn-outline-secondary"
// //                     onClick={() => setShowPass((p) => !p)}
// //                     aria-label="Toggle password visibility"
// //                   >
// //                     {showPass ? <FaEyeSlash /> : <FaEye />}
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Referral */}
// //               <div className="mb-4">
// //                 <label className="form-label fw-semibold">
// //                   Referral Code <span className="text-secondary fw-normal">(optional)</span>
// //                 </label>
// //                 <div className="input-group">
// //                   <span className="input-group-text bg-white">
// //                     <FaUser />
// //                   </span>
// //                   <input
// //                     className="form-control"
// //                     name="referralCode"
// //                     value={form.referralCode}
// //                     onChange={onChange}
// //                     placeholder="l.comYsM5A"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Buttons */}
// //               <button type="submit" className="btn btn-success w-100 py-2 fw-bold">
// //                 Create Account
// //               </button>

              

             

// //               <div className="text-center mt-3">
// //                 <span className="text-secondary">Already have an account?</span>
// //                 <Link href="/login" className="fw-semibold text-decoration-none">
// //                   Login
// //                 </Link>
// //               </div>
// //             </form>

// //             <div className="text-center mt-4 small text-secondary">
// //               By continuing, you agree to our{" "}
// //               <a href="#" className="text-decoration-none">Terms</a> &{" "}
// //               <a href="#" className="text-decoration-none">Privacy Policy</a>.
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { authSignUp } from "@/services/authService";

// export default function SignUp() {
//   const router = useRouter();

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

//   const validate = () => {
//     if (!form.name.trim()) return "Full name is required.";
//     if (!form.email.trim()) return "Email is required.";
//     if (!form.phone.trim()) return "Phone number is required.";
//     if (!form.password.trim()) return "Password is required.";
//     if (form.password.length < 8)
//       return "Password must be at least 8 characters.";
//     return null;
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setMsg({ type: "", text: "" });

//     const err = validate();
//     if (err) {
//       setMsg({ type: "danger", text: err });
//       return;
//     }

//     const payload = {
//       name: form.name.trim(),
//       email: form.email.trim(),
//       phone: form.phone.trim(),
//       password: form.password,
//       ...(form.referralCode.trim()
//         ? { referralCode: form.referralCode.trim() }
//         : {}),
//     };

//     try {
//       setLoading(true);

//       const data = await authSignUp(payload);

//       if (!data?.token || !data?.user) {
//         setMsg({
//           type: "danger",
//           text: "Signup response is invalid.",
//         });
//         return;
//       }

//       // ✅ save auth
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       setMsg({
//         type: "success",
//         text: "Account created successfully! Redirecting...",
//       });

//       router.push("/dashboard");
//     } catch (error) {
//       setMsg({
//         type: "danger",
//         text: error.message,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center bg-light">
//       <div className="container py-4">
//         <div className="row g-0 shadow-lg rounded-4 overflow-hidden bg-white">
//           {/* LEFT */}
//           <div
//             className="col-lg-5 p-4 p-lg-5 text-white"
//             style={{
//               background:
//                 "linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #86efac 120%)",
//             }}
//           >
//             <h2 className="fw-bold mb-2">Join Us</h2>
//             <p className="opacity-90 mb-4">
//               Create your account and get instant access.
//             </p>

//             <div className="mt-4 small opacity-90">
//               Already have an account?{" "}
//               <Link
//                 className="text-white fw-semibold text-decoration-underline"
//                 href="/login"
//               >
//                 Login
//               </Link>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="col-lg-7 p-4 p-lg-5">
//             <h3 className="fw-bold mb-1">Create Account</h3>
//             <p className="text-secondary mb-4">
//               Fill in your details to get started
//             </p>

//             {/* MESSAGE */}
//             {msg.text && (
//               <div className={`alert alert-${msg.type} py-2`}>
//                 {msg.text}
//               </div>
//             )}

//             <form onSubmit={onSubmit}>
//               {/* Name */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Full Name</label>
//                 <input
//                   className="form-control"
//                   name="name"
//                   value={form.name}
//                   onChange={onChange}
//                   placeholder="Anand Kumar"
//                 />
//               </div>

//               {/* Email */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Email</label>
//                 <input
//                   className="form-control"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={onChange}
//                   placeholder="anand@email.com"
//                 />
//               </div>

//               {/* Phone */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Phone</label>
//                 <input
//                   className="form-control"
//                   name="phone"
//                   value={form.phone}
//                   onChange={onChange}
//                   placeholder="8126137013"
//                 />
//               </div>

//               {/* Password */}
//               <div className="mb-3">
//                 <label className="form-label fw-semibold">Password</label>
//                 <div className="input-group">
//                   <input
//                     className="form-control"
//                     type={showPass ? "text" : "password"}
//                     name="password"
//                     value={form.password}
//                     onChange={onChange}
//                     placeholder="Minimum 8 characters"
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary"
//                     onClick={() => setShowPass((p) => !p)}
//                   >
//                     {showPass ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Referral */}
//               <div className="mb-4">
//                 <label className="form-label fw-semibold">
//                   Referral Code (optional)
//                 </label>
//                 <input
//                   className="form-control"
//                   name="referralCode"
//                   value={form.referralCode}
//                   onChange={onChange}
//                   placeholder="l.comYsM5A"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-success w-100 py-2 fw-bold"
//                 disabled={loading}
//               >
//                 {loading ? "Creating account..." : "Create Account"}
//               </button>

//               <div className="text-center mt-3">
//                 Already have an account?{" "}
//                 <Link href="/login" className="fw-semibold">
//                   Login
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authSignUp } from "@/services/authService";
import { useAuth } from "@/context/AuthProvider";
import GuestOnly from "@/components/GuestOnly";

export default function SignUpPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referralCode: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

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
    };

    try {
      setLoading(true);
      const data = await authSignUp(payload); // {token, user}
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
            <div className="col-lg-5 p-4 p-lg-5 text-white"
              style={{ background: "linear-gradient(135deg, #16a34a 0%, #22c55e 60%, #86efac 120%)" }}
            >
              <h2 className="fw-bold mb-2">Join Us</h2>
              <p className="opacity-90 mb-4">Create your account and get started.</p>
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
                    <input className="form-control" name="name" value={form.name} onChange={onChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaEnvelope /></span>
                    <input className="form-control" type="email" name="email" value={form.email} onChange={onChange} required />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <div className="input-group">
                    <span className="input-group-text bg-white"><FaPhoneAlt /></span>
                    <input className="form-control" name="phone" value={form.phone} onChange={onChange} required />
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
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPass(p => !p)}>
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Referral Code <span className="text-secondary fw-normal">(optional)</span>
                  </label>
                  <input className="form-control" name="referralCode" value={form.referralCode} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-success w-100 py-2 fw-bold" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </button>

                <div className="text-center mt-3">
                  <span className="text-secondary">Already have an account?</span>{" "}
                  <Link href="/login" className="fw-semibold text-decoration-none">Login</Link>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </GuestOnly>
  );
}

