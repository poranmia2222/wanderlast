"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LockIcon, MailIcon } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  AuthDivider,
  AuthField,
  AuthPage,
  GoogleButton,
} from "@/components/auth/auth-ui";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await signIn.email({
        email: email.trim(),
        password,
        rememberMe,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message ?? "Invalid email or password");
        return;
      }
      toast.success("Welcome back!");
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPage
      title="Welcome Back"
      subtitle="Resume your adventure with Wanderlust"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="signin-email"
          label="Email Address"
          icon={MailIcon}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthField
          id="signin-password"
          label="Password"
          icon={LockIcon}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between pt-1 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-foreground/90">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="size-3.5 accent-[#1ca7c4]"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={() =>
              toast.info("Password reset is coming soon. Contact support for help.")
            }
            className="text-brand hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-10 w-full bg-brand text-sm text-brand-foreground hover:bg-brand/90"
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <AuthDivider text="Or continue with" />
        <GoogleButton />
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand hover:underline">
          Sign Up
        </Link>
      </p>
    </AuthPage>
  );
}
