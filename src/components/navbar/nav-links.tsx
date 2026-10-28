import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destination" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "Add Destination", href: "/add-destinations" },
];

function isLinkActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function NavLinks() {
  const pathname = usePathname();

  return (
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
  );
}
