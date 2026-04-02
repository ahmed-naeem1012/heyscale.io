"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Flame,
  Rocket,
  ShieldCheck,
  Star,
} from "lucide-react";
import Marquee from "react-fast-marquee";
import { useEffect, useId, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
};

function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const segments = Math.min(3, Math.max(1, items.length));
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      const ratio = max > 0 ? el.scrollLeft / max : 0;
      const idx = Math.min(segments - 1, Math.floor(ratio * segments + 0.001));
      setActive(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => onScroll();
    window.addEventListener("resize", onResize);
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [segments]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (paused) return;
      const w = el.clientWidth;
      const curr = Math.round(el.scrollLeft / w);
      const next = (curr + 1) % items.length;
      el.scrollTo({ left: next * w, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length, paused]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.scrollBehavior = "auto";
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !dragging.current) return;
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = dragStartScroll.current - dx;
  };
  const endDrag = () => {
    const el = containerRef.current;
    dragging.current = false;
    if (el) el.style.scrollBehavior = "";
    setPaused(false);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((t) => (
          <div
            key={`${t.name}-${t.role}`}
            className="w-full min-w-full snap-start rounded-2xl bg-white px-12 py-10 text-sky-950 shadow-sm"
          >
            <div className="text-5xl font-black leading-none text-[#0076B7]">“</div>
            <p className="mt-2 text-md font-semibold leading-6 text-[#1B1B1B]">{t.quote}</p>
            <div className="mt-8 flex items-end justify-between">
              <div>
                <div className="text-md font-semibold text-[#1B1B1B]">{t.name}</div>
                <div className="text-sm text-[#767676]">{t.role}</div>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-[#0076B7]">
                {t.rating.toFixed(1)}
                <Star className="h-4 w-4 fill-[#F4B740] text-[#F4B740]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-6 select-none" aria-hidden>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full ${
              i === active ? "bg-[#0076B7]" : "bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function clampInt(value: string | null, min: number, max: number) {
  const n = Number(value);
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

function ConfirmationContent() {
  const params = useSearchParams();
  const euQty = clampInt(params.get("eu"), 0, 99);
  const usQty = clampInt(params.get("us"), 0, 99);
  const linkedInQty = euQty + usQty;
  const euUnit = 139;
  const usUnit = 199;
  const salesNavUnit = 89;
  const salesNavQty = linkedInQty;

  const reactId = useId();
  const orderId = useMemo(
    () => reactId.replaceAll(":", "").replaceAll("-", "").toUpperCase().slice(0, 12),
    [reactId],
  );
  const dateLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  }, []);

  const totals = useMemo(() => {
    const eu = euQty * euUnit;
    const us = usQty * usUnit;
    const salesNav = salesNavQty * salesNavUnit;
    return { eu, us, salesNav, total: eu + us + salesNav };
  }, [euQty, usQty, salesNavQty]);

  const testimonials: Testimonial[] = [
    {
      quote:
        "We went from 1 LinkedIn account to 12 in a week. The ramp-up time we saved alone was worth it. These aren't thin profiles — they look and feel like real people.",
      name: "Daniel",
      role: "Head of Growth, B2B SaaS",
      rating: 4.6,
    },
    {
      quote:
        "We were hitting LinkedIn's limits every single week. Added 5 accounts through Penta and our outreach volume tripled overnight. Wish we'd done it sooner.",
      name: "Sarah",
      role: "Sales Director",
      rating: 4.9,
    },
    {
      quote:
        "We run outreach for 6 clients simultaneously. This platform is the only reason we can do that without burning personal profiles or hitting limits.",
      name: "James",
      role: "Outreach Agency",
      rating: 4.5,
    },
    {
      quote:
        "The 24-hour replacement guarantee sold me. One account got flagged and they replaced it the same day. Zero downtime, zero drama.",
      name: "Rachel",
      role: "Founder",
      rating: 4.4,
    },
    {
      quote:
        "Managing 10 accounts used to be a nightmare across different tools. Having everything in one dashboard changed how we operate. We scaled to 20 accounts within the first month.",
      name: "Tom",
      role: "Sales Manager",
      rating: 4.4,
    },
    {
      quote:
        "We scaled from 200 to 800 outreach touchpoints a week without touching our core team's profiles. Game changer for our agency.",
      name: "Lisa",
      role: "Lead Gen Agency",
      rating: 4.8,
    },
    {
      quote:
        "Setup took less than an hour. Accounts were live, connected to our sequencer, and sending the same day. I expected a week of back and forth.",
      name: "Marcus",
      role: "Head of Sales",
      rating: 4.7,
    },
    {
      quote:
        "We needed accounts fast for a new campaign. Had 8 verified profiles set up and running within 24 hours. The team didn't miss a single day of outreach.",
      name: "Steven",
      role: "Appointment Setter",
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFCFE] px-10 py-10 text-sky-950 lg:flex lg:items-center">
      <div className="mx-auto grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="rounded-3xl bg-[#003C7A] px-12 py-10 text-white">
          <h1 className="text-3xl font-semibold text-center sm:text-3xl">
            See how our customers grow their
            <br /> outreach and business.
          </h1>
          <p className="mt-4 max-w-2xl text-md justify-self-center text-center text-[#EBEBEB]">
            See every account&apos;s status, connections, and activity in one view. Add more as you
            grow and never lose track of what&apos;s running.
          </p>

          <TestimonialCarousel items={testimonials} />

          <div className="mt-10">
            <div className="text-center text-sm font-semibold text-white">COMPATIBLE WITH</div>
            <div className="mt-6">
              <Marquee gradient={false} speed={40}>
                <div className="relative h-6 w-[850px] mr-5 px-10 md:h-8">
                  <Image
                    src="/images/compatible-logos.svg"
                    alt="Trusted companies"
                    fill
                    sizes="850px"
                    className="object-contain"
                    priority={false}
                  />
                </div>
                <div className="relative h-6 w-[850px] ml-5 px-10 md:h-8">
                  <Image
                    src="/images/compatible-logos.svg"
                    alt="Trusted companies"
                    fill
                    sizes="850px"
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </section>

        <section className="p-8">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Heyscale.io"
              width={160}
              height={48}
              className="h-10"
              style={{ width: "auto" }}
              priority={false}
            />
          </div>

          <div className="mt-6">
            <div className="text-lg font-semibold text-zinc-900">Thank you for your purchases!</div>
            <div className="mt-1 text-sm text-zinc-500">
              Here&apos;s your detailed breakdown of your purchases.
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#EBEBEB] bg-[#FAFAFA] p-4">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-md font-semibold text-zinc-900">Order Summary</div>
                <div className="mt-1 text-xs text-zinc-500">{dateLabel}</div>
              </div>
              <div className="text-xs font-semibold text-zinc-500">{orderId}</div>
            </div>

            <div className="mt-6 space-y-4">
              {euQty > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-semibold text-zinc-900">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0076B70A] text-[#0076B7]">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                      European Accounts
                    </div>
                    <div className="font-semibold text-zinc-900">
                      ${euUnit} <span className="text-zinc-500">x</span> {euQty}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-[#767676]">
                    <span className="font-medium text-md text-[#767676]">Subtotal</span>
                    <span className="font-semibold text-zinc-900">${totals.eu}</span>
                  </div>
                </div>
              ) : null}

              {usQty > 0 ? (
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 font-semibold text-zinc-900">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0076B70A] text-[#0076B7]">
                        <BadgeCheck className="h-4 w-4" />
                      </span>
                      U.S. Accounts
                    </div>
                    <div className="font-semibold text-zinc-900">
                      ${usUnit} <span className="text-zinc-500">x</span> {usQty}
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                    <span className="font-medium text-md text-[#767676]">Subtotal</span>
                    <span className="font-semibold text-zinc-900">${totals.us}</span>
                  </div>
                </div>
              ) : null}

              <div className="h-px w-full bg-zinc-200" />

              <div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-semibold text-zinc-900">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#0076B70A] text-[#0076B7]">
                      <span className="text-xs font-bold">in</span>
                    </span>
                    Sales Navigator
                  </div>
                  <div className="font-semibold text-zinc-900">
                    ${salesNavUnit} <span className="text-zinc-500">x</span> {salesNavQty}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-[#767676]">
                  <span className="font-medium text-md text-[#767676]">Subtotal</span>
                  <span className="font-semibold text-zinc-900">${totals.salesNav}</span>
                </div>
              </div>

              <div className="h-px w-full bg-zinc-200" />

              <div className="flex items-center justify-between pt-1 text-md font-semibold">
                <span className="text-[#767676]">Total Cost</span>
                <span className="font-semibold text-zinc-900">
                  ${totals.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-[#0076B7] bg-[#0076B714] p-6">
            <div className="text-sm font-semibold text-zinc-900">What happens next:</div>
            <div className="mt-4 grid grid-cols-1 gap-3 text-xs text-zinc-700">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-[#0076B7]" />
                <span className="w-16 font-semibold text-zinc-900">1–5 min</span>
                <span>Credentials delivered to your Vault</span>
              </div>
              <div className="flex items-center gap-3">
                <Flame className="h-4 w-4 text-[#0076B7]" />
                <span className="w-16 font-semibold text-zinc-900">Day 1–14</span>
                <span>Warm-up phase begins automatically</span>
              </div>
              <div className="flex items-center gap-3">
                <Rocket className="h-4 w-4 text-[#0076B7]" />
                <span className="w-16 font-semibold text-zinc-900">Day 15+</span>
                <span>Account ready for full outreach</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-[#0076B7]" />
                <span className="w-16 font-semibold text-zinc-900">30 days</span>
                <span>Replacement warranty active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#EBEBEB] bg-white text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              Download Receipt
            </button>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0076B7] text-sm font-semibold text-white hover:bg-sky-700"
            >
              Back to Home
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFCFE] px-10 py-10 flex items-center justify-center">
        <div className="text-zinc-600">Loading...</div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
