"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { authLogin } from "@/services/authService";
import { useAuth } from "@/context/AuthProvider";
import GuestOnly from "@/components/GuestOnly";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!identifier.trim() || !password.trim()) {
      setMsg({ type: "danger", text: "Please enter email/username and password." });
      return;
    }

    try {
      setLoading(true);
      const data = await authLogin({ identifier, password });

      if (!data?.token || !data?.user) {
        setMsg({ type: "danger", text: "Invalid response from server." });
        return;
      }

      // ✅ store + context update
      login(data);

      setMsg({ type: "success", text: "Login successful! Redirecting..." });
      router.replace("/dashboard");
    } catch (err) {
      setMsg({ type: "danger", text: err.message || "Login failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestOnly>
      <div className="min-vh-100 d-flex align-items-center bg-light">
        <div className="container py-4">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div
                className="h-100 p-4 p-md-5 rounded-4 text-white shadow"
                style={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #22c55e 55%, #16a34a 100%)",
                }}
              >
                <p className="text-uppercase fw-semibold opacity-75 mb-2">Begin your</p>
                <h1 className="fw-bold mb-3">
                  OLDASGOLD Journey <span className="text-warning">Seamlessly</span>
                </h1>
                <ul className="fs-5 opacity-90">
                  <li>Choose your desired plan</li>
                  <li>Customize your MLM software</li>
                  <li>Ready to go</li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow rounded-4 h-100">
                <div className="card-body p-4 p-md-5">
                  <h2 className="fw-bold mb-1">Login</h2>
                  <p className="text-muted mb-4">Access your dashboard</p>

                  {msg?.text ? (
                    <div className={`alert alert-${msg.type} py-2`} role="alert">
                      {msg.text}
                    </div>
                  ) : null}

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Email or Username</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          className="form-control"
                          placeholder="Enter email or username"
                          type="text"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          autoComplete="username"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label fw-semibold">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          className="form-control"
                          placeholder="Enter password"
                          type={showPass ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPass((p) => !p)}
                          aria-label="Toggle password visibility"
                        >
                          {showPass ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    <button
                      className="btn btn-success w-100 py-2 fw-semibold mt-3"
                      disabled={loading}
                      type="submit"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                  </form>

                  <p className="text-center mt-4 mb-0">
                    Don&apos;t have an account?{" "}
                    <Link className="text-success fw-semibold" href="/signup">
                      Sign up
                    </Link>
                  </p>

                  <p className="text-muted small mt-3 mb-0">
                    If Postman works but browser fails → CORS/baseURL mismatch.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </GuestOnly>
  );
}
