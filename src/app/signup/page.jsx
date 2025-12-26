"use client"
import { Suspense } from "react";
import SignUp from "@/components/auth/signup/SignUp";

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  );
}
