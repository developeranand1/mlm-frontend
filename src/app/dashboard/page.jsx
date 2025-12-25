"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa";

export default function DashboardHome() {
  const cards = [
    { title: "Total Products", value: "128", icon: <FaBox /> },
    { title: "Total Orders", value: "56", icon: <FaShoppingCart /> },
    { title: "Total Users", value: "1,024", icon: <FaUsers /> },
    { title: "Revenue", value: "₹ 2,45,900", icon: <FaRupeeSign /> },
  ];

  return (
     <ProtectedRoute>
    <div className="py-2">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-0 fw-bold">Dashboard</h3>
          <div className="text-muted">Overview & quick stats</div>
        </div>
        <button className="btn btn-success">+ Add Product</button>
      </div>

      <div className="row g-3">
        {cards.map((c) => (
          <div className="col-12 col-md-6 col-xl-3" key={c.title}>
            <div className="card shadow-sm border-0">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <div className="text-muted small">{c.title}</div>
                  <div className="fs-4 fw-bold">{c.value}</div>
                </div>
                <div className="fs-3 text-success">{c.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mt-1">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="fw-bold mb-2">Recent Orders</div>
              <div className="table-responsive">
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1024</td>
                      <td>Rahul</td>
                      <td><span className="badge bg-success">Paid</span></td>
                      <td>₹ 2,999</td>
                    </tr>
                    <tr>
                      <td>1023</td>
                      <td>Ayesha</td>
                      <td><span className="badge bg-warning text-dark">Pending</span></td>
                      <td>₹ 999</td>
                    </tr>
                    <tr>
                      <td>1022</td>
                      <td>Arjun</td>
                      <td><span className="badge bg-danger">Failed</span></td>
                      <td>₹ 1,499</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="fw-bold mb-2">Quick Notes</div>
              <textarea className="form-control" rows="8" placeholder="Write notes..."></textarea>
              <button className="btn btn-success mt-3 w-100">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
