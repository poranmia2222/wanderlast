"use client";

import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Destination", href: "/add-destinations" },
];

const accountLinks = [
  { label: "Profile", href: "#", icon: User },
  { label: "Login", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

function isLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-10 bg-white">
      <nav className="relative flex h-14 items-center justify-between px-6">
        <ul className="flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const active = isLinkActive(pathname, link.href);
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "text-brand underline underline-offset-4"
                      : "text-foreground hover:text-brand"
                  }
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href="#"
          className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-brand"
        >
          Wanderlast
        </a>

        <ul className="flex items-center gap-6 text-sm font-medium">
          {accountLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <Link
                href={href}
                className="flex items-center gap-1.5 hover:text-brand"
              >
                {Icon ? <Icon className="size-4" aria-hidden /> : null}
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
