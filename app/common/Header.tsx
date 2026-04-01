"use client";

import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
        <div className="flex items-center justify-between gap-4 rounded-full border border-zinc-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Email Deliverability Consultant"
              width={150}
              height={80}
              className="h-10"
              style={{ width: "auto" }}
            />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex">
            <Link href="/" className="relative text-[#0076B7]">
              Home
              <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-[#0076B7]" />
            </Link>
            <Link href="#benefits" className="hover:text-zinc-900">
              Benefits
            </Link>
            <Link href="#pricing" className="hover:text-zinc-900">
              Pricing
            </Link>
            <Link href="#testimonials" className="hover:text-zinc-900">
              Testimonials
            </Link>
            <Link href="#faq" className="hover:text-zinc-900">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {/* <Link
              href="/login"
              className="hidden h-10 items-center justify-center rounded-full border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 sm:flex"
            >
              Login
            </Link> */}
            <Link
              href="/get-started"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0076B7] px-5 text-sm font-semibold text-white hover:bg-[#00676]"
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
                  alt="Email Deliverability Consultant"
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

            <nav id="mobile-menu" className="mt-5 space-y-2 text-sm font-medium text-zinc-700">
              <Link
                href="/"
                className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#benefits"
                className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Benefits
              </Link>
              <Link
                href="#pricing"
                className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#faq"
                className="block rounded-lg px-3 py-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
              >
                FAQ
              </Link>
              <div className="pt-3">
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
