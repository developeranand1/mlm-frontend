"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { ready, isLoggedIn } = useAuth();

  useEffect(() => {
    if (ready && !isLoggedIn) router.replace("/login");
  }, [ready, isLoggedIn, router]);

  if (!ready) return null;
  if (!isLoggedIn) return null;

  return children;
}
