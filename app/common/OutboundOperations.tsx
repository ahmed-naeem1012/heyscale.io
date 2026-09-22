import Image from "next/image";

type OperationCard = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

const OPERATION_CARDS: OperationCard[] = [
  {
    title: "API & Webhooks",
    description:
      "Create campaigns, manage leads, retrieve data and trigger workflows programmatically. Heyscale exposes both API and webhook functionality.",
    imageSrc: "/images/f6.svg",
    imageAlt: "API keys and webhooks configuration",
  },
  {
    title: "GTM Integrations",
    description:
      "Sync leads, campaign activity, and replies with the tools your team already uses, including CRMs, enrichment platforms, and workflow automation tools.",
    imageSrc: "/images/f7.svg",
    imageAlt: "Integrations with GTM and CRM tools",
  },
  {
    title: "Analytics",
    description:
      "Track campaign performance, profile activity, connection rates, replies, and outcomes from one dashboard.",
    imageSrc: "/images/f8.svg",
    imageAlt: "Campaign analytics dashboard",
  },
];

function OperationCardBlock({
  title,
  description,
  imageSrc,
  imageAlt,
}: OperationCard) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white shadow-sm">
      <div className="relative flex flex-1 items-center justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={360}
          height={240}
          className="h-auto w-full object-contain"
        />
      </div>
      <div className="p-6 pt-5 sm:p-7">
        <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-zinc-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function OutboundOperations() {
  return (
    <section id="integrations" className="w-full max-w-7xl pt-16 mt-14">
      <div className="px-1 text-center">
        <h2 className="mx-auto max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-[#1B1B1B] sm:text-4xl lg:text-5xl">
          Built for real outbound operations
        </h2>
        <p className="mx-auto mt-4 max-w-6xl text-sm leading-7 text-zinc-600 sm:text-base">
          Created for teams that treat LinkedIn as a serious outbound channel,
          not a side experiment. Buy, manage, and monitor multiple accounts from
          one dashboard, with the control, visibility, and account coverage
          needed to scale reliably.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
        {OPERATION_CARDS.map((card) => (
          <OperationCardBlock key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}
