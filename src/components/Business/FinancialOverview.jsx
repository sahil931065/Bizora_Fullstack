export default function FinancialOverview({ business }) {
  const rows = [
    ["Monthly Revenue", `€${business.revenue.toLocaleString()}`],
    ["Monthly Profit", `€${business.profit.toLocaleString()}`],
    ["Annual Revenue", `€${(business.revenue * 12).toLocaleString()}`],
    ["Annual Profit", `€${(business.profit * 12).toLocaleString()}`],
    ["Customers", business.customers.toLocaleString()],
  ];

  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
        FINANCIALS
      </p>

      <h2 className="mt-3 font-['DM_Serif_Display'] text-4xl text-white">
        Financial overview
      </h2>

      <div className="mt-8 border-t border-white/10">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-6 border-b border-white/10 py-5"
          >
            <span className="text-sm text-white/55">{label}</span>

            <span className="text-sm font-semibold text-white">
              {value}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs leading-6 text-white/55">
        Financial information is provided by the seller and should be
        independently verified during due diligence.
      </p>
    </section>
  );
}