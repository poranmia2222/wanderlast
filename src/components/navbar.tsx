"use client";
import { useSession } from "@/lib/auth-client";
import { NavLinks } from "@/components/navbar/nav-links";
import { Logo } from "@/components/navbar/logo";
import { UserMenu } from "@/components/navbar/user-menu";
import { AuthLinks } from "@/components/navbar/auth-links";

export function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <header className="relative z-10 bg-white">
      <nav className="relative flex h-14 items-center justify-between px-6">
        <NavLinks />

        <Logo />

        <ul className="flex items-center gap-6 text-sm font-medium">
          <p>{user?.name}</p>
          {user ? <UserMenu /> : <AuthLinks />}
        </ul>
      </nav>
    </header>
  );
}
