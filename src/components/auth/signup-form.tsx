"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LockIcon, MailIcon, UserIcon } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  AuthDivider,
  AuthField,
  AuthPage,
  GoogleButton,
} from "@/components/auth/auth-ui";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const {data:resData, error} = await signUp.email({
      name: data.name as string,
      email: data.email as string,
      password: data.password as string
    })
     if (error) {
            console.error(error.message);
            return;
        }
        console.log(resData);
  }

  return (
    <AuthPage
      title="Create Account"
      subtitle="Start your adventure with Wanderlust"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="signup-name"
          label="Full Name"
          icon={UserIcon}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Enter your name"
          required
        />
        <AuthField
          id="signup-email"
          label="Email Address"
          icon={MailIcon}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
        />
        <AuthField
          id="signup-password"
          label="Password"
          icon={LockIcon}
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Create a password"
          required
          minLength={8}
        />
        <AuthField
          id="signup-confirm-password"
          label="Confirm Password"
          icon={LockIcon}
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Confirm your password"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full bg-brand text-sm text-brand-foreground hover:bg-brand/90"
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>

        <AuthDivider text="Or sign up with" />
        <GoogleButton />
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-brand hover:underline">
          Sign In
        </Link>
      </p>
    </AuthPage>
  );
}
