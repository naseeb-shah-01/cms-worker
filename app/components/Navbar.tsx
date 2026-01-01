"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const adminLinks: NavLink[] = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/workers", label: "All Workers" },
    { href: "/admin/workers/add", label: "Add Worker" },
  ];

  const workerLinks: NavLink[] = [
    { href: "/worker/slot", label: "Start Work" },
    { href: "/worker/hours", label: "Hours" },
    { href: "/worker/payments", label: "Payments" },
  ];

  const navLinks: NavLink[] =
    session?.user.role === "ADMIN"
      ? adminLinks
      : session?.user.role === "WORKER"
      ? workerLinks
      : [{ href: "/login", label: "Login" }];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className="w-full border-b border-black/10 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
            WorkerCMS
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                isActive(link.href)
                  ? "text-black border-b-2 border-black pb-1"
                  : "text-black/70 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="border border-black px-3 py-1 rounded-md text-sm hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden border border-black px-3 py-1 rounded text-sm"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-black/10 px-6 py-4 flex flex-col gap-4 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium ${
                isActive(link.href)
                  ? "text-black font-semibold"
                  : "text-black/70"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="border border-black py-2 rounded-md text-sm hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
