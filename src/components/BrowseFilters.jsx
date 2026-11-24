const categories = [
  "SaaS",
  "E-commerce",
  "Website",
  "AI Business",
  "Mobile App",
  "Agency",
  "Content",
  "Other",
];

const countries = [
  "Czech Republic",
  "Germany",
  "United Kingdom",
  "France",
  "Netherlands",
  "Spain",
];

const priceRanges = [
  { label: "Under €5K", min: 0, max: 5000 },
  { label: "€5K–€10K", min: 5000, max: 10000 },
  { label: "€10K–€25K", min: 10000, max: 25000 },
  { label: "€25K–€50K", min: 25000, max: 50000 },
  { label: "€50K–€100K", min: 50000, max: 100000 },
  { label: "€100K+", min: 100000, max: Infinity },
];

const revenueRanges = [
  { label: "Under €1K", min: 0, max: 1000 },
  { label: "€1K–€5K", min: 1000, max: 5000 },
  { label: "€5K–€10K", min: 5000, max: 10000 },
  { label: "€10K+", min: 10000, max: Infinity },
];

const profitRanges = [
  { label: "Under €500", min: 0, max: 500 },
  { label: "€500–€2K", min: 500, max: 2000 },
  { label: "€2K–€5K", min: 2000, max: 5000 },
  { label: "€5K+", min: 5000, max: Infinity },
];

function RadioOption({ checked, onChange, children }) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />

      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
          checked
            ? "border-lime-200"
            : "border-[#C9C5BC] group-hover:border-lime-200"
        }`}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-lime-200" />}
      </span>

      <span
        className={`text-sm ${
          checked ? "font-medium text-white" : "text-white/55"
        }`}
      >
        {children}
      </span>
    </label>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-t border-white/10 py-6 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white">
        {title}
      </h3>

      <div>{children}</div>
    </div>
  );
}

export default function BrowseFilters({
  filters,
  setFilters,
  clearFilters,
}) {
  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <aside className="w-full">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="font-['DM_Serif_Display'] text-2xl text-white">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-white/55 transition-colors hover:text-lime-200"
        >
          Clear all
        </button>
      </div>

      <FilterGroup title="Category">
        <RadioOption
          checked={filters.category === "All"}
          onChange={() => updateFilter("category", "All")}
        >
          All
        </RadioOption>

        {categories.map((category) => (
          <RadioOption
            key={category}
            checked={filters.category === category}
            onChange={() => updateFilter("category", category)}
          >
            {category}
          </RadioOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Asking Price">
        <RadioOption
          checked={!filters.price}
          onChange={() => updateFilter("price", null)}
        >
          Any price
        </RadioOption>

        {priceRanges.map((range) => (
          <RadioOption
            key={range.label}
            checked={filters.price?.label === range.label}
            onChange={() => updateFilter("price", range)}
          >
            {range.label}
          </RadioOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Monthly Revenue">
        <RadioOption
          checked={!filters.revenue}
          onChange={() => updateFilter("revenue", null)}
        >
          Any revenue
        </RadioOption>

        {revenueRanges.map((range) => (
          <RadioOption
            key={range.label}
            checked={filters.revenue?.label === range.label}
            onChange={() => updateFilter("revenue", range)}
          >
            {range.label}
          </RadioOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Monthly Profit">
        <RadioOption
          checked={!filters.profit}
          onChange={() => updateFilter("profit", null)}
        >
          Any profit
        </RadioOption>

        {profitRanges.map((range) => (
          <RadioOption
            key={range.label}
            checked={filters.profit?.label === range.label}
            onChange={() => updateFilter("profit", range)}
          >
            {range.label}
          </RadioOption>
        ))}
      </FilterGroup>

      <FilterGroup title="Country">
        <RadioOption
          checked={!filters.country}
          onChange={() => updateFilter("country", "")}
        >
          Any country
        </RadioOption>

        {countries.map((country) => (
          <RadioOption
            key={country}
            checked={filters.country === country}
            onChange={() => updateFilter("country", country)}
          >
            {country}
          </RadioOption>
        ))}
      </FilterGroup>
    </aside>
  );
}