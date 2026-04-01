"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Minus, Plus, Quote, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

type Plan = {
  id: "eu" | "us";
  title: string;
  price: number;
  flagSrc: string;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "eu",
    title: "European Accounts",
    price: 139,
    flagSrc: "/images/european-union.svg",
    features: [
      "Profile Located in European",
      "Id-verified Badge",
      "Warm-up Ready",
      "Replaced Within 24 hours if needed",
      "+500 Connections",
      "Ready to Use",
      "Customizable",
    ],
  },
  {
    id: "us",
    title: "U.S. Accounts",
    price: 199,
    flagSrc: "/images/united-states.svg",
    features: [
      "Profile Located in United States",
      "Id-verified Badge",
      "Warm-up Ready",
      "Replaced Within 24 hours if needed",
      "+500 Connections",
      "Ready to Use",
      "Customizable",
    ],
  },
];

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
            <Quote className="h-7 w-7 text-[#0076B7] fill-[#0076B7]" />
            <p className="mt-4 text-md font-semibold leading-6 text-[#1B1B1B]">
              {t.quote}
            </p>
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

export default function GetStartedPage() {
  const [euQty, setEuQty] = useState(0);
  const [usQty, setUsQty] = useState(0);
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
            See every account&apos;s status, connections, and activity in one view. Add more as
            you grow and never lose track of what&apos;s running.
          </p>

          <TestimonialCarousel items={testimonials} />

          <div className="mt-10">
            <div className="text-center text-sm font-semibold text-white">
              COMPATIBLE WITH
            </div>
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
              width={140}
              height={48}
              className="h-10"
              style={{ width: "auto" }}
              priority={false}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {plans.map((plan) => {
              const qty = plan.id === "eu" ? euQty : usQty;
              const setQty = plan.id === "eu" ? setEuQty : setUsQty;

              return (
                <div
                  key={plan.id}
                  className="rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-sm"
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <div className="w-full">
                      <Image
                        src={plan.flagSrc}
                        alt={plan.title}
                        width={30}
                        height={30}
                        className="h-6 w-auto"
                        priority={false}
                      />
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                          <div className="mt-2 text-md font-semibold text-zinc-900">
                            {plan.title}
                          </div>
                          <div className="mt-1 text-xs text-[#494949]">Flexible Account Options</div>
                        </div>

                    <div className="text-right">
                      <div className="text-lg font-light text-zinc-900">${plan.price}</div>
                      <div className="text-[10px] text-[#494949]">/profile/mo</div>
                    </div>
                    </div>
                   </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-[#0076B70A] p-4">
                    <div className="space-y-4 text-xs text-zinc-700">
                      {plan.features.map((t) => (
                        <div key={t} className="flex items-center gap-3">
                          <span className="grid h-5 w-5 place-items-center rounded-md bg-[#0077b761] text-[#0076B7]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span className="text-[#0076B7] font-semibold text-sm">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between text-sm text-[#767676]">
                    <span>Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center rounded-md border border-[#EBEBEB] text-[#0076B7] hover:bg-[#0076B70A]"
                        onClick={() => setQty(Math.max(0, qty - 1))}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <div className="grid h-7 w-10 place-items-center rounded-md border border-[#EBEBEB] text-xs font-semibold text-zinc-800">
                        {qty}
                      </div>
                      <button
                        type="button"
                        className="grid h-7 w-7 place-items-center rounded-md border border-[#EBEBEB] text-[#0076B7] hover:bg-[#0076B70A]"
                        onClick={() => setQty(qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="mt-8">
            <div className="text-sm font-semibold text-zinc-900">Add-on</div>

            <div className="mt-4 rounded-2xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 place-items-center rounded-lg bg-[#0076B70A] text-[#0076B7]">
                    <Check className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                      LinkedIn Sales Navigator
                    </div>
                    <div className="mt-1 text-xs leading-5 text-zinc-500">
                      Sales Navigator helps sellers have high-quality conversations with the
                      people that matter, at scale.
                    </div>
                    <div className="mt-3 text-sm font-semibold text-zinc-900">
                      $89<span className="text-xs font-normal text-zinc-500">/mo/acc</span>{" "}
                      <span className="ml-2 text-xs font-normal text-zinc-400 line-through">
                        $199/mo/acc
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSalesNavigator((v) => !v)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    salesNavigator ? "bg-[#0076B7]" : "bg-zinc-300"
                  }`}
                  aria-pressed={salesNavigator}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                      salesNavigator ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div> */}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="https://cal.com/daniyal-dehleh-wqshni/30min"
              target="_blank"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[#EBEBEB] bg-white text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              Talk to Sales
            </Link>
            <Link
              href="https://buy.stripe.com/7sYdRbevzh2D0F6ch7a7C0w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[#0076B7] text-sm font-semibold text-white hover:bg-sky-700"
            >
              Continue
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
