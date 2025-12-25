"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          
          {/* LEFT : STORE INFO */}
          <div className="col-lg-5">
            <div className="h-100 bg-white rounded-4 shadow p-4 p-lg-5">
              <h2 className="fw-bold mb-4">Visit Our Store</h2>

              <div className="mb-3 d-flex align-items-start gap-3">
                <FaPhoneAlt className="text-success fs-5 mt-1" />
                <div>
                  <div className="fw-semibold">Phone</div>
                  <div className="text-muted">+91 70 5657 4050</div>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-start gap-3">
                <FaEnvelope className="text-success fs-5 mt-1" />
                <div>
                  <div className="fw-semibold">Email</div>
                  <div className="text-muted">oldasgold25@gmail.com</div>
                </div>
              </div>

              <div className="mb-4 d-flex align-items-start gap-3">
                <FaMapMarkerAlt className="text-success fs-5 mt-1" />
                <div>
                  <div className="fw-semibold">Address</div>
                  <div className="text-muted">
                    Opp. New Anaj Mandi, Safidon, Haryana
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=Safidon%20Haryana&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* RIGHT : CONTACT FORM */}
          <div className="col-lg-7">
            <div className="h-100 bg-white rounded-4 shadow p-4 p-lg-5">
              <h2 className="fw-bold mb-2">Get in Touch</h2>
              <p className="text-muted mb-4">
                If you’ve got great products or want to work with us,
                then drop us a line.
              </p>

              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Name</label>
                  <input className="form-control" placeholder="Name" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Phone</label>
                  <input className="form-control" placeholder="Phone" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Service</label>
                  <input className="form-control" placeholder="Type..." />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                  />
                </div>

                <div className="col-12">
                  <button className="btn btn-secondary w-100 py-2 fw-semibold rounded-pill">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
