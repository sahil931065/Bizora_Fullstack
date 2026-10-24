export default function BusinessHeader({
  business,
  isSaved,
  onSave,
  onContact,
}) {
  return (
    <section className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1fr_320px] lg:items-end">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
            {business.category}
          </span>

          {business.verified && (
            <span className="inline-flex items-center gap-2 border border-lime-200/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-200" />
              Verified
            </span>
          )}
        </div>

        <h1 className="mt-5 max-w-4xl font-['DM_Serif_Display'] text-5xl leading-[0.95] text-white sm:text-6xl lg:text-7xl">
          {business.name}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-white/55">
          {business.description}
        </p>

        <div className="mt-6 flex items-center gap-2 text-sm text-white/55">
          <span>●</span>
          {business.country}
        </div>
      </div>

      <div className="lg:border-l lg:border-white/10 lg:pl-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
          Asking Price
        </p>

        <p className="mt-2 font-['DM_Serif_Display'] text-4xl text-white sm:text-5xl">
          €{business.price.toLocaleString()}
        </p>

        <button
          type="button"
          onClick={onContact}
          className="mt-7 flex w-full items-center justify-center bg-[#111816] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-lime-200"
        >
          Contact Seller →
        </button>

        <button
          type="button"
          onClick={onSave}
          aria-pressed={isSaved}
          className={`mt-3 flex w-full items-center justify-center gap-2 border px-6 py-3.5 text-sm font-semibold transition-colors ${
            isSaved
              ? "border-lime-200 text-lime-200"
              : "border-white/10 text-white hover:border-lime-200"
          }`}
        >
          <span>{isSaved ? "♥" : "♡"}</span>
          {isSaved ? "Saved" : "Save Opportunity"}
        </button>
      </div>
    </section>
  );
}