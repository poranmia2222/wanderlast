import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account | Wanderlust",
  description: "Create a Wanderlust account and start your adventure.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
