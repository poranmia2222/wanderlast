import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold text-brand"
    >
      Wanderlast
    </Link>
  );
}
