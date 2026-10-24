export default function BusinessOverview({ business }) {
  const information = [
    ["Business Type", business.category],
    ["Business Age", business.age],
    ["Location", business.country],
    ["Customers", business.customers.toLocaleString()],
  ];

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
        OVERVIEW
      </p>

      <h2 className="mt-3 font-['DM_Serif_Display'] text-4xl text-white">
        About the business
      </h2>

      <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">
        {business.description}
      </p>

      <div className="mt-10 grid border-t border-white/10 sm:grid-cols-2">
        {information.map(([label, value]) => (
          <div
            key={label}
            className="border-b border-white/10 py-5 sm:pr-8"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
              {label}
            </p>

            <p className="mt-2 text-sm font-semibold text-white">
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}