import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1B1B1B] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.svg"
                alt="Email Deliverability Consultant"
                width={180}
                height={80}
                className="h-10"
                style={{ width: "auto" }}
              />
            </div>
            <p className="mt-4 max-w-xs text-md text-[#FFFFFFCC]">
              Stop Hitting Daily Limits. Start Scaling Without Limits
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 md:col-span-1">
            <div>
              <div className="text-md font-semibold text-white">Menu</div>
              <ul className="mt-4 space-y-3 text-sm text-[#A9A9A9]">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="hover:text-white">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#testimonials" className="hover:text-white">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-md font-semibold text-white">Help</div>
              <ul className="mt-4 space-y-3 text-sm text-[#A9A9A9]">
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms &amp; condition
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-xs leading-5 text-[#C2C2C2]">
            Heyscale.io is not affiliated with, endorsed by, or sponsored by LinkedIn
            Corporation or Microsoft Corporation. LinkedIn® is a registered trademark of
            LinkedIn Corporation. All trademarks belong to their respective owners.
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
