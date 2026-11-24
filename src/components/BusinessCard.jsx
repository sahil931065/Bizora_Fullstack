import { Link } from "react-router-dom";
import { getBusinessImage } from "../Data/businessImages";

export default function BusinessCard({ business }) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-[#111816] transition-all duration-300 hover:-translate-y-1 hover:border-lime-200/50 hover:shadow-[0_18px_45px_rgba(23,23,23,0.08)]">
      {/* Visual */}
      <div className="relative aspect-16/10 overflow-hidden bg-[#111816]">
        <img
          src={getBusinessImage(business)}
          alt={`${business.category} business preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-[#171717]/10 to-transparent" />

        <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
          {business.category}
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
          <span className="font-['DM_Serif_Display'] text-3xl text-white sm:text-4xl">
            {business.name}
          </span>
          <span className="mb-1 h-2 w-2 shrink-0 rounded-full bg-lime-200" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-['DM_Serif_Display'] text-2xl text-white">
              {business.name}
            </h3>

            <p className="mt-1 text-sm text-white/55">
              {business.description}
            </p>
          </div>

          <span
            className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-lime-200"
            title="Verified opportunity"
            aria-label="Verified opportunity"
          >
            <span className="h-2 w-2 rounded-full bg-lime-200" />
          </span>
        </div>

        <div className="grid grid-cols-3 border-y border-white/10 py-4">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
              Asking
            </p>
            <p className="font-semibold text-white">{business.price}</p>
          </div>

          <div className="border-l border-white/10 pl-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
              Revenue
            </p>
            <p className="font-semibold text-white">
              {business.revenue}
              <span className="text-xs font-normal text-white/55">/mo</span>
            </p>
          </div>

          <div className="border-l border-white/10 pl-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-white/55">
              Profit
            </p>
            <p className="font-semibold text-white">
              {business.profit}
              <span className="text-xs font-normal text-white/55">/mo</span>
            </p>
          </div>
        </div>

        <Link
          to={`/businesses/${business.id}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-lime-200"
        >
          View Opportunity
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
