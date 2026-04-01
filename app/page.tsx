"use client";

import Marquee from "react-fast-marquee";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {
  BadgeCheck,
  ChevronRight,
  Check,
  Plus,
  Quote,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function OrbitAvatarSvg({
  id,
  href,
  cx,
  cy,
  size,
  showBadge,
}: {
  id: string;
  href: string;
  cx: number;
  cy: number;
  size: number;
  showBadge?: boolean;
}) {
  const r = size / 2;
  const clipId = `clip-${id}`;
  const badgeR = Math.max(7, Math.round(size * 0.17));
  const badgeCx = cx + r * 0.72;
  const badgeCy = cy - r * 0.72;

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>

      <image
        href={href}
        x={cx - r}
        y={cy - r}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#${clipId})`}
      />

      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeWidth={6} />

      {showBadge ? (
        <g>
          <circle
            cx={badgeCx}
            cy={badgeCy}
            r={badgeR}
            fill="#0076B7"
            stroke="#ffffff"
            strokeWidth={3}
          />
          <path
            d={`M ${badgeCx - badgeR * 0.45} ${badgeCy} L ${
              badgeCx - badgeR * 0.1
            } ${badgeCy + badgeR * 0.35} L ${badgeCx + badgeR * 0.55} ${
              badgeCy - badgeR * 0.35
            }`}
            fill="none"
            stroke="#ffffff"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ) : null}
    </g>
  );
}

function FocusAvatarSvg() {
  const cx = 560;
  const cy = 18;
  const size = 64;
  const r = size / 2;
  const gap = 12;
  const arm = 14;
  const x0 = cx - r - gap;
  const y0 = cy - r - gap;
  const x1 = cx + r + gap;
  const y1 = cy + r + gap;

  return (
    <g>
      <path
        d={`M ${x0} ${y0 + arm} V ${y0} H ${x0 + arm}`}
        fill="none"
        stroke="#0076B7"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d={`M ${x1 - arm} ${y0} H ${x1} V ${y0 + arm}`}
        fill="none"
        stroke="#0076B7"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d={`M ${x0} ${y1 - arm} V ${y1} H ${x0 + arm}`}
        fill="none"
        stroke="#0076B7"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d={`M ${x1 - arm} ${y1} H ${x1} V ${y1 - arm}`}
        fill="none"
        stroke="#0076B7"
        strokeWidth={3}
        strokeLinecap="round"
      />

      <OrbitAvatarSvg
        id="focus"
        href="/images/img-1.svg"
        cx={cx}
        cy={cy}
        size={size}
        showBadge
      />
    </g>
  );
}

function HeroOrbitsSvg() {
  return (
    <svg
      viewBox="0 0 1120 520"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <rect
        x="105"
        y="84"
        width="910"
        height="352"
        rx="176"
        stroke="#0076B7"
        strokeWidth="2"
      />
      <rect
        x="58"
        y="54"
        width="1004"
        height="412"
        rx="206"
        stroke="#38bdf8"
        strokeOpacity="0.28"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="26"
        width="1092"
        height="468"
        rx="234"
        stroke="#38bdf8"
        strokeOpacity="0.18"
        strokeWidth="2"
      />

      <OrbitAvatarSvg id="pl" href="/images/img-6.svg" cx={160} cy={78} size={46} />
      <OrbitAvatarSvg id="jl" href="/images/img-6.svg" cx={960} cy={78} size={46} />
      <OrbitAvatarSvg id="kl" href="/images/img-6.svg" cx={170} cy={452} size={46} />
      <OrbitAvatarSvg id="ll" href="/images/img-6.svg" cx={950} cy={442} size={46} />

      <OrbitAvatarSvg id="ml" href="/images/img-6.svg" cx={14} cy={260} size={44} />
      <OrbitAvatarSvg id="nl" href="/images/img-6.svg" cx={1062} cy={260} size={44} />
      <OrbitAvatarSvg id="ol" href="/images/img-6.svg" cx={1022} cy={305} size={44} />

      <OrbitAvatarSvg
        id="tl"
        href="/images/img-3.svg"
        cx={83}
        cy={95}
        size={48}
        showBadge
      />
      <OrbitAvatarSvg
        id="bl"
        href="/images/img-5.svg"
        cx={83}
        cy={425}
        size={48}
        showBadge
      />
      <OrbitAvatarSvg
        id="tr"
        href="/images/img-2.svg"
        cx={1037}
        cy={95}
        size={48}
        showBadge
      />
      <OrbitAvatarSvg
        id="br"
        href="/images/img-3.svg"
        cx={1037}
        cy={425}
        size={48}
        showBadge
      />
      <OrbitAvatarSvg
        id="mr"
        href="/images/img-4.svg"
        cx={1106}
        cy={260}
        size={48}
        showBadge
      />

      <FocusAvatarSvg />
    </svg>
  );
}

function BenefitsRail({
  items,
}: {
  items: {
    title: string;
    description: string;
    iconSrc: string;
  }[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const segments = 3;
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const startScrollLeft = useRef(0);

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
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.scrollBehavior = "auto";
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el || !isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    el.scrollLeft = startScrollLeft.current - dx;
  };
  const endDrag = () => {
    const el = containerRef.current;
    isDragging.current = false;
    if (el) el.style.scrollBehavior = "";
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
      >
        {items.map(({ title, description, iconSrc }) => (
          <div
            key={title}
            className="min-w-[320px] flex-1 rounded-xl border border-[#EBEBEB] bg-white p-6 shadow-sm"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#0076B714]">
              <Image src={iconSrc} alt="" width={20} height={20} className="h-5 w-5" />
            </div>
            <div className="mt-4 text-md font-semibold text-zinc-900">{title}</div>
            <div className="mt-2 text-sm text-zinc-600">{description}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-6 select-none" aria-hidden>
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full rounded-full ${
              i === active ? "bg-[#0076B7]" : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProfilesRail({
  items,
}: {
  items: {
    company: string;
    name: string;
    role: string;
    location: string;
    followers: string;
    connections: string;
    avatar: string;
  }[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    dragging.current = true;
    startX.current = e.clientX;
    startLeft.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.scrollBehavior = "auto";
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !dragging.current) return;
    el.scrollLeft = startLeft.current - (e.clientX - startX.current);
  };
  const onEnd = () => {
    const el = ref.current;
    dragging.current = false;
    if (el) el.style.scrollBehavior = "";
  };

  return (
    <div
      ref={ref}
      className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onEnd}
      onPointerCancel={onEnd}
      onPointerLeave={onEnd}
    >
      {items.map((p) => (
        <div
          key={p.name}
          className="relative min-w-[290px] rounded-md border border-[#EBEBEB] bg-white shadow-lg"
        >
          <div className="relative h-12 overflow-hidden rounded-t-md bg-[#E7EEF1]">
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-xs font-semibold text-[#0076B7] pl-10">
                {p.company}
              </span>
            </div>
          </div>
          <Image
            src={p.avatar}
            alt={p.name}
            width={56}
            height={56}
            unoptimized
            className="absolute left-5 top-[48px] -translate-y-1/2 h-14 w-14 rounded-full object-cover"
          />
          <div className="p-5">
            <div className="mt-5 flex items-center gap-1 text-[20px] font-semibold text-zinc-900">
            {p.name}
            <BadgeCheck className="h-4 w-4 text-[#0076B7]" />
            </div>
            <div className="mt-1 text-sm text-zinc-600">{p.role}</div>
            <div className="text-xs text-zinc-400">{p.location}</div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#0076B7]">
              <span>{p.followers} Followers</span>
              <span className="text-zinc-300">•</span>
              <span>{p.connections} Connections</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  type BenefitItem = {
    title: string;
    description: string;
    iconSrc: string;
  };
  const [partners, setPartners] = useState(3);
  const features = [
    { label: "3 Months of Warmup", iconSrc: "/icons/flash-circle.svg" },
    { label: "Responsive Customer Service", iconSrc: "/icons/customer-support.svg" },
    { label: "Trusted by 500+ Companies", iconSrc: "/icons/star.svg" },
    { label: "No Commitment", iconSrc: "/icons/shield-cross.svg" },
    { label: "Real Verified Account", iconSrc: "/icons/profile-user.svg" },
    { label: "+500 Connections", iconSrc: "/icons/link-2.svg" },
    { label: "Secure Transactions", iconSrc: "/icons/shield.svg" },
    { label: "Immediate Replacement", iconSrc: "/icons/repeate-music.svg" },
  ] as const;

  const benefits: BenefitItem[] = [
    {
      title: "+500 Connections",
      description:
        "Your account arrives with an established network — so prospects see a credible profile, not an empty one.",
      iconSrc: "/icons/link-2.svg",
    },
    {
      title: "3 Months of Activity",
      description:
        "Every account is manually operated for 90 days before you touch it. Automation-ready from your very first day.",
      iconSrc: "/icons/verify.svg",
    },
    {
      title: "Instant Activation",
      description:
        "No setup headaches or waiting for account to be handed over. Login, connect your account to your software, and outreach the same day.",
      iconSrc: "/icons/setting.svg",
    },
    {
      title: "Quality Accounts",
      description:
        "Built for lead gen agencies and sales teams — keep your pipeline full.",
      iconSrc: "/icons/global.svg",
    },
    {
      title: "All-in-One Dashboard",
      description:
        "Every account, one place. Invite team members, monitor activity, switch profiles, and stay in control.",
      iconSrc: "/icons/device-message.svg",
    },
  ] as const;

  const testimonials = [
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
  ] as const;
  const testimonialsRow1 = testimonials.slice(0, 4);
  const testimonialsRow2 = testimonials.slice(4, 8);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFCFE] font-sans text-sky-950">
      <Header />

      <main className="flex flex-1 flex-col items-center px-4 pb-24 pt-10">
        <section className="relative w-full max-w-7xl overflow-visible">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-[860px] w-full max-w-6xl lg:h-[620px] md:block hidden">
              <HeroOrbitsSvg />
            </div>
          </div>

          <div className="relative mx-auto flex min-h-[360px] md:min-h-[460px] flex-col items-center justify-center text-center lg:min-h-[620px]">
            <div className="mx-auto max-w-4xl px-2">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] lg:text-5xl">
                Scale Your Linkedin Outreach
                <br className="hidden sm:block" /> with{" "}
                <span className="decoration-[#0076B77A] underline underline-offset-8">
                  Verified
                </span>{" "}
                Profiles
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-600 lg:text-base">
                Stop Hitting Daily Limits. Start Scaling without limits with aged, verified
                profiles for
              </p>

              <div className="mt-3 flex flex-wrap gap-1 items-center justify-center text-xs font-semibold text-[#0076B7] lg:text-sm">
                <span className="rounded-md border border-[#0076B7] bg-[#E7EEF1] px-2.5 py-1">
                  Lead Gen Agencies
                </span>,
                <span className=" rounded-md border border-[#0076B7] bg-[#E7EEF1] px-2.5 py-1">
                  Sales Teams
                </span>
                <span className="text-zinc-500 mx-1">and</span>
                <span className="rounded-md border border-[#0076B7] bg-[#E7EEF1] px-2.5 py-1">
                  GTM professionals
                </span>
              </div>

              <a
                href="/get-started"
                className="mt-6 lg:mt-10 inline-flex h-10 lg:h-12 items-center justify-center gap-2 rounded-lg bg-[#0076B7] px-8 text-sm font-semibold text-white hover:bg-sky-700"
              >
                Get Started
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl pt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ label, iconSrc }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-3 rounded-xl border border-[#EBEBEB] bg-white px-5 py-6"
              >
                <span className="grid h-8 w-8 place-items-center">
                  <Image
                    src={iconSrc}
                    alt=""
                    width={16}
                    height={16}
                    className="h-8 w-8"
                    priority={false}
                  />
                </span>
                <span className="text-sm font-semibold text-[#0076B7]">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-14 overflow-hidden rounded-3xl bg-[#0076B7] px-6 py-10 text-white shadow-sm sm:px-10">
            <div className="text-center text-sm font-semibold opacity-90">
              COMPATIBLE WITH
            </div>
            <div className="mt-6">
          <Marquee gradient={false} speed={40}>
            <div className="relative h-8 w-[1150px] px-10 mr-5 md:h-10">
              <Image
                src="/images/compatible-logos.svg"
                alt="Trusted companies"
                fill
                sizes="1150px"
                className="object-contain"
                loading="eager"
                priority
              />
            </div>
            <div className="relative h-8 w-[1150px] px-10 ml-5 md:h-10">
              <Image
                src="/images/compatible-logos.svg"
                alt="Trusted companies"
                fill
                sizes="1150px"
                className="object-contain"
                loading="lazy"
                priority={false}
              />
            </div>
          </Marquee>
        </div>

          </div>
        </section>

        <section id="benefits" className="w-full max-w-7xl pt-16 mt-14">
          <div className="px-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0076B7]">
              Benefits
            </div>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-5xl">
              Trusted by Sales Teams That Play to Win
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
              No Bots, Real Humans. Every account is hand-verified, aged, and outreach-ready
              from day one.
            </p>
          </div>

          <div className="mt-10">
            <BenefitsRail items={benefits} />
          </div>
        </section>

        <section className="w-full max-w-7xl pt-16 mt-14">
          <div className="px-1 text-center">
            <h3 className="text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-4xl">
              Multiple profiles, one brand, maximum ROI.
            </h3>
            <p className="mt-3 text-sm text-zinc-600">
              Unlimited LinkedIn Partners all representing your company
            </p>
          </div>
          <div className="mt-10">
            <ProfilesRail
              items={[
                {
                  company: "Your Company Name",
                  name: "Sarah Payton",
                  role: "Business Development Respresentative",
                  location: "Los Angeles, United States",
                  followers: "354",
                  connections: "1,321",
                  avatar: "/images/img-1.svg",
                },
                {
                  company: "Your Company Name",
                  name: "Michael Part",
                  role: "Business Development Representative",
                  location: "New York, United States",
                  followers: "879",
                  connections: "2,543",
                  avatar: "/images/img-7.svg",
                },
                {
                  company: "Your Company Name",
                  name: "Denise Klon",
                  role: "Business Development Representative",
                  location: "Mississippi, United States",
                  followers: "565",
                  connections: "3,432",
                  avatar: "/images/img-8.svg",
                },
                {
                  company: "Your Company Name",
                  name: "Madisson Lome",
                  role: "Financial Technician",
                  location: "San Diego, United States",
                  followers: "765",
                  connections: "2,300",
                  avatar: "/images/img-9.svg",
                },
                {
                  company: "Your Company Name",
                  name: "Rose Mary",
                  role: "Financial Technician",
                  location: "Seattle, United States",
                  followers: "555",
                  connections: "2,100",
                  avatar: "/images/img-10.svg",
                },
                {
                  company: "Your Company Name",
                  name: "Mark Ibrahim",
                  role: "Sales Executive",
                  location: "Miami, United States",
                  followers: "587",
                  connections: "3,432",
                  avatar: "/images/img-11.svg",
                },
              ]}
            />
          </div>
        </section>

        <section id="pricing" className="w-full max-w-7xl pt-16 mt-14">
          <div className="px-1 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0076B7]">
              Pricing
            </div>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-5xl">
              Stop Hitting Daily Limits. Start Scaling without limits
            </h3>
            <p className="mx-auto mt-4 max-w-5xl text-sm leading-7 text-zinc-600 sm:text-base">
              Every account arrives aged, verified, and ready to go. Add as many as you need,
              manage them all in one place, and scale without the usual headaches.
            </p>
          </div>

          <div className="mt-10 rounded-2xl max-w-4xl justify-self-center w-full border border-[#EBEBEB] bg-white p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-md font-semibold text-zinc-900">
                  Number of Outreach Partners
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                    <Image
                      src="/images/volume-discount.svg"
                      alt="Volume Discount"
                      width={30}
                      height={30}
                      className="h-5 md:h-5"
                      style={{ width: "auto" }}
                      priority={false}
                      loading="lazy"
                    />
                  </span>
                  <span className="inline-flex items-center">
                   <Image
                      src="/images/linkedin-available.svg"
                      alt="LinkedIn Available"
                      width={30}
                      height={30}
                      className="h-6 md:h-6"
                      style={{ width: "auto" }}
                      priority={false}
                      loading="lazy"
                    />
                  </span>
                </div>
              </div>

              <div className="grid h-12 w-14 place-items-center rounded-xl border border-[#0076B7] bg-white text-lg font-semibold text-[#0076B7]">
                {partners}
              </div>
            </div>

            <div className="mt-6">
              <input
                type="range"
                min={1}
                max={10}
                value={partners}
                onChange={(e) => setPartners(Number(e.target.value))}
                className="w-full accent-[#0076B7]"
              />
              <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-400">
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="inline-flex w-4 justify-center">
                    |
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-4xl w-full justify-self-center grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#EBEBEB] bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                    <Image
                      src="/images/european-union.svg"
                      alt="European Union"
                      width={30}
                      height={30}
                      className="h-6 md:h-8 w-auto"
                      priority={false}
                      loading="lazy"
                    />
                  <div className="mt-2 text-xl font-semibold text-zinc-900">
                    European Accounts
                  </div>
                  <div className="mt-1 text-xs text-[#494949]">Flexible Account Options</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-black">$139</div>
                  <div className="text-xs text-[#494949]">/profile/mo</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#0076B70A] p-5">
                <div className="space-y-3 text-sm text-zinc-700">
                  {[
                    "Profile Located in European",
                    "Id-verified Badge",
                    "Warm-up Ready",
                    "Replaced Within 24 hours if needed",
                    "+500 Connections",
                    "Ready to Use",
                    "Customizable",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-[#0077b761] text-[#0076B7]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/get-started"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0076B7] text-sm font-semibold text-white hover:bg-sky-700"
              >
                <Plus className="h-4 w-4" />
                Add to Order
              </a>
            </div>

            <div className="rounded-2xl border border-[#EBEBEB] bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                    <Image
                      src="/images/united-states.svg"
                      alt="United States"
                      width={30}
                      height={30}
                      className="h-6 md:h-8 w-auto"
                      priority={false}
                      loading="lazy"
                    />
                  <div className="mt-2 text-xl font-semibold text-zinc-900">
                    U.S. Accounts
                  </div>
                  <div className="mt-1 text-xs text-[#494949]">Flexible Account Options</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-light text-black">$199</div>
                  <div className="text-xs text-[#494949]">/profile/mo</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#0076B70A] p-5">
                <div className="space-y-3 text-sm text-zinc-700">
                  {[
                    "Profile Located in United States",
                    "Id-verified Badge",
                    "Warm-up Ready",
                    "Replaced Within 24 hours if needed",
                    "+500 Connections",
                    "Ready to Use",
                    "Customizable",
                  ].map((t) => (
                    <div key={t} className="flex items-center gap-3">
                      <span className="grid h-5 w-5 place-items-center rounded-md bg-[#0077b761] text-[#0076B7]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-sm">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="/get-started"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#0076B7] text-sm font-semibold text-white hover:bg-sky-700"
              >
                <Plus className="h-4 w-4" />
                Add to Order
              </a>
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl pt-20 mt-14">
          <div className="px-1 text-center">
            <h3 className="text-5xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-5xl">
              Every Account. Every Detail. One Place.
            </h3>
            <p className="mx-auto mt-3 max-w-5xl text-sm leading-7 text-zinc-600 sm:text-base">
              See every account’s status, connections, and activity in one view. Add more as you
              grow and never lose track of what’s running.
            </p>
          </div>
          <div className="mt-10">
            <Image
              src="/images/Dashboard.svg"
              alt="Dashboard overview"
              width={1100}
              height={640}
              className="mx-auto h-auto w-full"
              priority={false}
            />
          </div>
        </section>

        <section id="testimonials" className="w-full max-w-7xl pt-20">
          <div className="px-1 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0076B7]">
              Testimonials
            </div>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-5xl">
              See how our customers grow their
              <br className="hidden sm:block" /> outreach and business.
            </h3>
          </div>

          <div className="mt-12">
            <Marquee gradient={false} speed={35} pauseOnHover>
              <div className="flex gap-6 pr-6">
                {testimonialsRow1.map((t) => (
                  <div
                    key={t.name}
                    className="w-[340px] rounded-xl border border-[#EBEBEB] bg-white p-6"
                  >
                    <Quote className="h-6 w-6 text-[#0076B7] fill-[#0076B7]" />
                    <div className="flex flex-col justify-between">
                      <p className="mt-4 text-sm leading-6 text-zinc-700">{t.quote}</p>
                      <div className="mt-6 flex items-end justify-between">
                        <div>
                          <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                          <div className="text-xs text-zinc-500">{t.role}</div>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-[#0076B7]">
                          {t.rating.toFixed(1)}
                          <Star className="h-4 w-4 fill-[#F4B740] text-[#F4B740]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          <div className="mt-8">
            <Marquee gradient={false} speed={35} pauseOnHover direction="right">
              <div className="flex gap-6 pr-6">
                {testimonialsRow2.map((t) => (
                  <div
                    key={t.name}
                    className="w-[340px] rounded-xl border border-[#EBEBEB] bg-white p-6"
                  >
                    <Quote className="h-6 w-6 text-[#0076B7] fill-[#0076B7]" />
                    <div className="flex flex-col justify-between">
                      <p className="mt-4 text-sm leading-6 text-zinc-700">{t.quote}</p>
                      <div className="mt-6 flex items-end justify-between">
                        <div>
                          <div className="text-sm font-semibold text-zinc-900">{t.name}</div>
                          <div className="text-xs text-zinc-500">{t.role}</div>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-semibold text-[#0076B7]">
                          {t.rating.toFixed(1)}
                          <Star className="h-4 w-4 fill-[#F4B740] text-[#F4B740]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>
        </section>

        <section id="faq" className="w-full max-w-7xl pt-20 pb-10 mt-14">
          <div className="px-1 text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0076B7]">
              FAQ
            </div>
            <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[#0076B7] sm:text-6xl">
              Frequently asked questions
            </h3>
            <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-zinc-600 sm:text-base">
              Everything you may want to know before buying LinkedIn accounts, from account types
              and filters to warranty coverage, status tracking, and how existing accounts fit
              into your workflow.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-2">
            <div className="space-y-10">
              <div>
                <h4 className="text-xl font-semibold text-zinc-900">
                  What kind of LinkedIn accounts can I buy?
                </h4>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  You can filter accounts by age, location, connection volume, verification
                  status, and Sales Navigator availability — so you only get profiles that match
                  exactly what your outreach needs.
                </p>
              </div>
              <div className="h-px w-full bg-zinc-200" />
              <div>
                <h4 className="text-xl font-semibold text-zinc-900">
                  Can I see which accounts are active?
                </h4>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  Yes. The dashboard shows the real-time status of every account — active or
                  restricted — so your team can react immediately and never lose a day of
                  outreach.
                </p>
              </div>
              <div className="h-px w-full bg-zinc-200" />
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="text-xl font-semibold text-zinc-900">
                  Do you offer replacement or warranty coverage?
                </h4>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  Yes. Every account comes with warranty coverage. If an account gets restricted
                  or flagged through no fault of your own, we replace it within 24 hours — no
                  back and forth, no delays.
                </p>
              </div>
              <div className="h-px w-full bg-zinc-200" />
              <div>
                <h4 className="text-xl font-semibold text-zinc-900">
                  How fast can I get started?
                </h4>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  Most teams are up and running within the same day. Accounts are delivered ready
                  to use — no warming period, no setup headaches, just plug into your sequencer
                  and go.
                </p>
              </div>
              <div className="h-px w-full bg-zinc-200" />
            </div>
          </div>
        </section>

        <section className="w-full max-w-7xl pt-16 pb-24">
          <div className="relative rounded-3xl bg-[#0076B7] text-white">

            <div className="relative flex items-center gap-10">
              <div className="px-14 py-10">
                <h3 className="text-3xl font-semibold sm:text-4xl">
                  More Profiles. More Meetings. More Deals Closed.
                </h3>
                <p className="mt-4 max-w-4xl w-full text-sm leading-7 text-white/80 sm:text-base">
                  Scale your outreach, multiply your touchpoints, and watch your pipeline grow.
                </p>
                <a
                  href="/get-started"
                  className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-[#0076B7] shadow-sm hover:bg-white/90"
                >
                  Get Started
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>

              <div className="hidden md:flex justify-center lg:justify-end">
                <Image
                  src="/images/more-profiles.svg"
                  alt="Product preview"
                  width={640}
                  height={420}
                  className="h-auto w-full max-w-[560px]"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
