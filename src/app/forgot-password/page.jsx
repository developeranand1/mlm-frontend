"use client";

import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    if (!email.trim()) {
      setErr("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const api=process.env.NEXT_PUBLIC_API_URL
      const res = await fetch(api+"auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data?.message || "Something went wrong.");
      } else {
        setMsg(data?.message || "Reset link sent to your email.");
        setEmail("");
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
                  <div className="fp-badge mx-auto mb-2">🔐</div>
                  <h3 className="mb-1 fw-bold">Forgot Password</h3>
                  <p className="text-muted mb-0">
                    Enter your email and we’ll send you a reset link.
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
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control fp-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />

                  <button
                    type="submit"
                    className="btn fp-btn w-100 mt-3"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center mt-3">
                    <small className="text-muted">
                      Remembered your password?{" "}
                      <a href="/login" className="fp-link">
                        Back to Login
                      </a>
                    </small>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-3">
              <small className="text-muted">
                Tip: Check your <b>Spam</b> folder too.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
