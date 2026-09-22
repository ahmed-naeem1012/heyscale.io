import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  Link2,
  MessageSquare,
  Send,
  UserPlus,
  Workflow,
} from "lucide-react";

type FeatureBlock = {
  iconSrc: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  imageSrc: string;
  imageAlt: string;
};

const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    iconSrc: "/icons/link-2-1.svg",
    title: "Get LinkedIn Profiles Ready for Outreach",
    paragraphs: [
      "Add established LinkedIn profiles directly through Heyscale whenever you need more outreach capacity.",
    ],
    bullets: [
      "U.S. and European profiles",
      "Established connections and activity",
      "Fast provisioning",
      "Replacement coverage",
      "Ready to connect to campaigns",
    ],
    imageSrc: "/images/f1.svg",
    imageAlt: "My Accounts dashboard with verified LinkedIn profiles",
  },
  {
    iconSrc: "/icons/send-2.svg",
    title: "Scale Campaigns Across Multiple Profiles",
    paragraphs: [
      "Assign multiple LinkedIn profiles to one campaign and automatically distribute outreach between them.",
      "Add more profiles as you grow without rebuilding campaigns or managing each profile separately.",
    ],
    imageSrc: "/images/f2.svg",
    imageAlt: "Campaign scaled across multiple LinkedIn sender profiles",
  },
  {
    iconSrc: "/icons/user-tag.svg",
    title: "Bring Your Leads From Anywhere",
    paragraphs: [
      "Import the prospects you already want to reach and put them directly into your Heyscale campaigns.",
      "Get leads from Sales Navigator, Clay, RB2B, HubSpot, or any other integrations.",
    ],
    imageSrc: "/images/f3.svg",
    imageAlt: "Segments list with imported lead lists",
  },
  {
    iconSrc: "/icons/data-2.svg",
    title: "Build LinkedIn Sequences Your Way",
    paragraphs: [
      "Create automated outreach sequences using LinkedIn actions, delays and conditions.",
    ],
    imageSrc: "/images/f4.svg",
    imageAlt: "LinkedIn outreach sequence builder",
  },
  {
    iconSrc: "/icons/sms-tracking.svg",
    title: "Every Reply. Every Profile. One Inbox.",
    paragraphs: [
      "Manage conversations across all your LinkedIn profiles without opening each account individually.",
      "Combines replies from different LinkedIn accounts into a centralized inbox and lets users respond on behalf of different senders.",
    ],
    imageSrc: "/images/f5.svg",
    imageAlt: "Unified inbox for all LinkedIn profile replies",
  },
];

function FeatureRow({
  iconSrc,
  title,
  paragraphs,
  bullets,
  imageSrc,
  imageAlt,
}: FeatureBlock) {
  return (
    <div className="rounded-2xl border border-[#EBEBEB] bg-white py-4 shadow-sm sm:py-6 lg:py-8">
      <div className="flex items-center justify-between gap-8 lg:gap-12 md:flex-row flex-col">
        <div className="sm:px-8 lg:px-10 px-6">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#0076B714]">
            <Image src={iconSrc} alt={title} width={20} height={20} className="w-5 h-5" />
          </div>
          <h3 className="mt-5 text-xl font-bold leading-snug text-zinc-900 sm:text-2xl">
            {title}
          </h3>
          <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-600 sm:text-base">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          {bullets?.length ? (
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-zinc-700"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0076B7] bg-[#9bc2df] rounded-sm p-0.5"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={450}
            height={300}
            className="object-contain object-center justify-self-end"
          />
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="w-full max-w-7xl pt-16 mt-14">
      <div className="px-1 text-center">
        <div className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#0076B7]">
          Features
        </div>
        <h2 className="mx-auto mt-4 max-w-6xl text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
          Everything You Need to Scale LinkedIn Outreach
        </h2>
        <p className="mx-auto mt-4 max-w-6xl text-sm leading-7 text-zinc-600 sm:text-base">
          From ready-to-use profiles to automated campaigns, sender rotation, and
          a unified inbox, Heyscale gives you the infrastructure to run LinkedIn
          outbound from one place.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:gap-8">
        {FEATURE_BLOCKS.map((block) => (
          <FeatureRow key={block.title} {...block} />
        ))}
      </div>
    </section>
  );
}
