"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function GuestOnly({ children }) {
  const router = useRouter();
  const { ready, isLoggedIn } = useAuth();

  useEffect(() => {
    if (ready && isLoggedIn) router.replace("/dashboard");
  }, [ready, isLoggedIn, router]);

  if (!ready) return null;
  if (isLoggedIn) return null;

  return children;
}
