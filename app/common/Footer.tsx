import Image from "next/image";
import Link from "next/link";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#integrations", label: "Integrations" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#faq", label: "FAQ" },
] as const;

const HELP_LINKS = [
  { href: "#", label: "Terms & condition" },
  { href: "#", label: "Privacy Policy" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1B1B] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/heyscale-logo-2.svg"
                alt="Heyscale.io"
                width={180}
                height={80}
                className="h-10"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#FFFFFFCC]">
              Stop Hitting Daily Limits. Start Scaling Without Limits
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Menu</div>
            <ul className="mt-4 space-y-3 text-sm text-[#A9A9A9]">
              {MENU_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Help</div>
            <ul className="mt-4 space-y-3 text-sm text-[#A9A9A9]">
              {HELP_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs leading-5 text-[#C2C2C2] sm:col-span-2 lg:col-span-1">
            Heyscale.io is not affiliated with, endorsed by, or sponsored by
            LinkedIn Corporation or Microsoft Corporation. LinkedIn® is a
            registered trademark of LinkedIn Corporation. All trademarks belong
            to their respective owners.
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-white/15" />
        <div className="mt-8 text-center text-sm text-[#FFFFFFCC]">
          Copyright © 2026 Heyscale.io. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
