"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home", isHome: true },
  { href: "/#features", label: "Features" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
] as const;

function NavLink({
  href,
  label,
  active,
  className,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className={`relative hover:text-zinc-900 ${active ? "text-[#0076B7]" : "text-zinc-600"} ${className ?? ""}`}
      onClick={onClick}
    >
      {label}
      {active ? (
        <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-[#0076B7]" />
      ) : null}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="w-full px-4 pt-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-5 py-3 shadow-sm md:grid-cols-[1fr_auto_1fr]">
          <Link href="/" className="flex items-center gap-3 justify-self-start">
            <Image
              src="/images/heyscale-logo.svg"
              alt="Heyscale.io"
              width={150}
              height={80}
              className="h-10"
              style={{ width: "auto" }}
            />
          </Link>

          <nav className="hidden items-center justify-center gap-7 text-sm font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                active={"isHome" in link && link.isHome}
              />
            ))}
          </nav>

          <div className="flex items-center justify-self-end gap-3">
            <Link
              href="#"
              className="hidden h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 sm:inline-flex"
            >
              Login
            </Link>
            <Link
              href="/get-started"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0076B7] px-5 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Get Started
              <ChevronRight className="h-5 w-5" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 md:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-auto mt-6 w-[calc(100%-2rem)] max-w-6xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/images/logo.svg"
                  alt="Heyscale.io"
                  width={150}
                  height={80}
                  className="h-10"
                  style={{ width: "auto" }}
                />
              </Link>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav
              id="mobile-menu"
              className="mt-5 space-y-2 text-sm font-medium text-zinc-700"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-3">
                <Link
                  href="/login"
                  className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/get-started"
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#0076B7] px-5 text-sm font-semibold text-white hover:bg-sky-700"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}
