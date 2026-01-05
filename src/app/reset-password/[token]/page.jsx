"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!password.trim()) return setErr("Please enter new password.");
    if (password.length < 6)
      return setErr("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setErr("Passwords do not match.");

    try {
      setLoading(true);
      const api = process.env.NEXT_PUBLIC_API_URL;
      // ✅ Change backend URL
      const res = await fetch(`${api}auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data?.message || "Token invalid or expired.");
      } else {
        setMsg(data?.message || "Password reset successful!");
        setPassword("");
        setConfirmPassword("");

        // Optional: redirect to login after success
        setTimeout(() => router.push("/login"), 1200);
      }
    } catch (error) {
      setErr(error?.message || "Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-wrap py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5">
            <div className="card fp-card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-3">
                  <div className="fp-badge mx-auto mb-2">✅</div>
                  <h3 className="mb-1 fw-bold">Reset Password</h3>
                  <p className="text-muted mb-0">
                    Enter a new password for your account.
                  </p>
                </div>

                {msg ? (
                  <div className="alert alert-success" role="alert">
                    {msg}
                  </div>
                ) : null}

                {err ? (
                  <div className="alert alert-danger" role="alert">
                    {err}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="mt-3">
                  <label className="form-label fw-semibold">New Password</label>
                  <input
                    type="password"
                    className="form-control fp-input"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <label className="form-label fw-semibold mt-3">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control fp-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="submit"
                    className="btn fp-btn w-100 mt-4"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Go back to{" "}
                      <a href="/login" className="fp-link">
                        Login
                      </a>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-3">
              <small className="text-muted">
                If link expired, request again from{" "}
                <a href="/forgot-password" className="fp-link">
                  Forgot Password
                </a>
                .
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
