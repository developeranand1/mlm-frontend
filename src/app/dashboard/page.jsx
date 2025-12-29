"use client";

import Dashboard from "@/components/dashboard/Dashboard";
import UserRank from "@/components/dashboard/UserRank";
import WalletDashboard from "@/components/dashboard/WalletDashboard";
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
      <UserRank></UserRank>
      <WalletDashboard/>
   <Dashboard></Dashboard>
    </ProtectedRoute>
  );
}
