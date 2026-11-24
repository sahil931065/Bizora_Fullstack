import { Link } from "react-router-dom";
import { getBusinessImage } from "../Data/businessImages";

function BusinessVisual({ business }) {
  const visualLayouts = {
    analytics: {
      label: "ANALYTICS",
      bars: [35, 55, 44, 72, 88],
    },
    commerce: {
      label: "COMMERCE",
      bars: [48, 70, 58, 82, 65],
    },
    agency: {
      label: "STUDIO",
      bars: [75, 48, 82, 60, 92],
    },
    finance: {
      label: "FINANCE",
      bars: [42, 62, 55, 74, 68],
    },
    ai: {
      label: "INTELLIGENCE",
      bars: [30, 52, 78, 58, 90],
    },
    content: {
      label: "PUBLISHING",
      bars: [65, 42, 72, 50, 82],
    },
    software: {
      label: "SOFTWARE",
      bars: [45, 68, 52, 85, 72],
    },
    travel: {
      label: "TRAVEL",
      bars: [58, 40, 70, 55, 78],
    },
    mobile: {
      label: "MOBILE",
      bars: [35, 65, 48, 80, 62],
    },
  };

  const layout = visualLayouts[business.visual] || visualLayouts.analytics;

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#26231F]">
      <img
        src={getBusinessImage(business)}
        alt={`${business.category} business preview`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-[#171717]/10 to-[#171717]/15" />
      <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-[#171717]/25 px-3 py-1.5 backdrop-blur-sm">
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-lime-200">
          {layout.label}
        </p>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
        <div>
          <span className="text-xs uppercase tracking-[0.18em] text-white/75">{business.category}</span>
          <h3 className="mt-1 font-['DM_Serif_Display'] text-3xl">{business.name}</h3>
        </div>
        <span className="mb-1 rounded-full bg-white/15 px-3 py-1 text-xs backdrop-blur-sm">{business.country}</span>
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-lime-200">
      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-lime-200">
        <span className="h-1.5 w-1.5 rounded-full bg-lime-200" />
      </span>
      Verified
    </span>
  );
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function BookmarkIcon({ active }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.7L6 21V4.5Z" />
    </svg>
  );
}

export default function BrowseBusinessCard({
  business,
  isFavorite,
  onFavorite,
}) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-[#111816] transition-all duration-300 hover:-translate-y-1 hover:border-lime-200/50 hover:shadow-[0_18px_45px_rgba(23,23,23,0.08)]">
      <div className="relative">
        <BusinessVisual business={business} />

        <button
          type="button"
          onClick={() => onFavorite(business.id)}
          aria-label={
            isFavorite
              ? `Remove ${business.name} from saved businesses`
              : `Save ${business.name}`
          }
          aria-pressed={isFavorite}
          className="absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center bg-[#111816] text-white shadow-sm transition-colors hover:text-lime-200"
        >
          <BookmarkIcon active={isFavorite} />
        </button>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex min-h-5 items-center justify-between gap-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.13em] text-white/55">
            {business.category}
            <span className="mx-1.5 text-[#BDB8AF]">·</span>
            {business.country}
          </div>

          {business.verified && <VerifiedBadge />}
        </div>

        <p className="mt-2 min-h-12 text-sm leading-6 text-white/55">
          {business.description}
        </p>

        <div className="mt-5 border-y border-white/10 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
            Asking price
          </p>

          <p className="mt-1 font-['DM_Serif_Display'] text-3xl text-white">
            {formatPrice(business.price)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Revenue
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {formatPrice(business.revenue)}
              <span className="font-normal text-white/55">/mo</span>
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/55">
              Profit
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {formatPrice(business.profit)}
              <span className="font-normal text-white/55">/mo</span>
            </p>
          </div>
        </div>

        <Link
          to={`/businesses/${business.id}`}
          className="mt-2 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-white transition-colors group-hover:text-lime-200"
        >
          View Opportunity

          <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
