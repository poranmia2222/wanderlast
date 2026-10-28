import Link from "next/link";

const accountLinks = [
  { label: "Login", href: "/signin" },
  { label: "Sign Up", href: "/signup" },
];

export function AuthLinks() {
  return (
    <>
      {accountLinks.map(({ label, href }) => (
        <Link
          key={label}
          href={href}
          className="hover:text-brand"
        >
          {label}
        </Link>
      ))}
    </>
  );
}
