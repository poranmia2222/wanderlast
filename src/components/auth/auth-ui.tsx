"use client";

import { useState, type ComponentProps, type ReactNode } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";

/** Full-page auth layout: centered card on the soft blue-gray background. */
export function AuthPage({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main
      data-page="auth"
      className="flex min-h-screen w-full flex-col items-center justify-center bg-[#eef3f6] px-4 py-12"
    >
      <div className="w-full max-w-sm">
        <h1 className="text-center font-serif text-4xl font-bold text-foreground">
          {title}
        </h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          {subtitle}
        </p>
        <div className="mt-7 rounded-xl border border-border bg-card p-7 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}

/** Labeled input with a leading icon inside the field. */
export function AuthField({
  label,
  icon: Icon,
  id,
  ...props
}: {
  label: string;
  icon: LucideIcon;
} & ComponentProps<"input">) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 text-[13px] text-foreground/90">
        {label}
      </Label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          className="h-10 rounded-md border-input bg-secondary pl-9 text-sm"
          {...props}
        />
      </div>
    </div>
  );
}

export function AuthDivider({ text }: { text: string }) {
  return (
    <div className="my-5">
      <div className="h-px bg-border" />
      <p className="mt-2.5 text-center text-xs text-muted-foreground">{text}</p>
    </div>
  );
}

export function GoogleButton() {
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    setLoading(true);
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (error) toast.error(error.message ?? "Google sign-in is unavailable");
    } catch {
      toast.error("Google sign-in is unavailable");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleGoogle}
      disabled={loading}
      variant="outline"
      className="h-10 w-full justify-center gap-2 border-border bg-card text-sm font-medium hover:bg-muted hover:text-foreground"
    >
      <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden>
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign Up With Google
    </Button>
  );
}
