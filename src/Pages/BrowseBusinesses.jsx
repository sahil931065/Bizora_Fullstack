import { useMemo, useState } from "react";

import BrowseBusinessCard from "../components/BrowseBusinessCard";
import BrowseFilters from "../components/BrowseFilters";
import BrowseSearch from "../components/BrowseSearch";
import { useBizora } from "../context/BizoraContext";

const initialFilters = {
  category: "All",
  price: null,
  revenue: null,
  profit: null,
  country: "",
};

function matchesRange(value, range) {
  if (!range) return true;

  return value >= range.min && value < range.max;
}

function sortBusinesses(businesses, sort) {
  const sorted = [...businesses];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );

    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);

    case "revenue":
      return sorted.sort((a, b) => b.revenue - a.revenue);

    case "profit":
      return sorted.sort((a, b) => b.profit - a.profit);

    default:
      return sorted;
  }
}

function SortIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M7 4v16" />
      <path d="m4 7 3-3 3 3" />
      <path d="M17 20V4" />
      <path d="m14 17 3 3 3-3" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M7 12h10" />
      <path d="M10 18h4" />
    </svg>
  );
}

export default function BrowseBusinesses() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState("recommended");
  const { listings, saved: favorites, toggleSaved } = useBizora();
  const browseBusinesses = useMemo(() => listings.filter((business) => !business.status || business.status === "published"), [listings]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredBusinesses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = browseBusinesses.filter((business) => {
      const matchesSearch =
        !query ||
        business.name.toLowerCase().includes(query) ||
        business.category.toLowerCase().includes(query) ||
        business.description.toLowerCase().includes(query) ||
        business.country.toLowerCase().includes(query);

      const matchesCategory =
        filters.category === "All" ||
        business.category === filters.category;

      const matchesPrice = matchesRange(
        business.price,
        filters.price
      );

      const matchesRevenue = matchesRange(
        business.revenue,
        filters.revenue
      );

      const matchesProfit = matchesRange(
        business.profit,
        filters.profit
      );

      const matchesCountry =
        !filters.country ||
        business.country === filters.country;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesRevenue &&
        matchesProfit &&
        matchesCountry
      );
    });

    return sortBusinesses(filtered, sort);
  }, [search, filters, sort, browseBusinesses]);

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearch("");
  };



  const hasActiveFilters =
    search ||
    filters.category !== "All" ||
    filters.price ||
    filters.revenue ||
    filters.profit ||
    filters.country;

  return (
    <main className="min-h-screen bg-[#080d0b] text-white">
      {/* Header */}
      <section className="border-b border-white/10 pb-12 pt-36 sm:pb-14 sm:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-lime-200">
                Businesses For Sale
              </p>

              <h1 className="mt-5 max-w-3xl font-['DM_Serif_Display'] text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                Find your next business.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">
                Explore businesses, digital products and companies
                available for acquisition.
              </p>
            </div>

            <div className="lg:pb-2">
              <p className="font-['DM_Serif_Display'] text-4xl text-white">
                {browseBusinesses.length}
              </p>

              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/55">
                Opportunities
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-4xl">
            <BrowseSearch
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Mobile controls */}
          <div className="mb-7 flex items-center justify-between gap-4 lg:hidden">
            <p className="text-sm text-white/55">
              <span className="font-semibold text-white">
                {filteredBusinesses.length}
              </span>{" "}
              businesses
            </p>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex h-10 items-center gap-2 border border-white/10 bg-[#111816] px-4 text-sm font-semibold text-white"
            >
              <FilterIcon />
              Filters
            </button>
          </div>

          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            {/* Desktop filters */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <BrowseFilters
                  filters={filters}
                  setFilters={setFilters}
                  clearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="mb-7 flex flex-col justify-between gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-white/55">
                    Showing{" "}
                    <span className="font-semibold text-white">
                      {filteredBusinesses.length}
                    </span>{" "}
                    businesses
                  </p>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-1 text-xs font-medium text-lime-200"
                    >
                      Clear search & filters
                    </button>
                  )}
                </div>

                <label className="flex items-center gap-3 text-sm text-white/55">
                  <span className="hidden sm:inline">
                    Sort:
                  </span>

                  <span className="sr-only">
                    Sort businesses
                  </span>

                  <span className="pointer-events-none">
                    <SortIcon />
                  </span>

                  <select
                    value={sort}
                    onChange={(event) =>
                      setSort(event.target.value)
                    }
                    className="cursor-pointer border-0 bg-transparent pr-7 text-sm font-semibold text-white outline-none"
                  >
                    <option value="recommended">
                      Recommended
                    </option>
                    <option value="newest">
                      Newest
                    </option>
                    <option value="price-low">
                      Price: Low to High
                    </option>
                    <option value="price-high">
                      Price: High to Low
                    </option>
                    <option value="revenue">
                      Revenue: High to Low
                    </option>
                    <option value="profit">
                      Profit: High to Low
                    </option>
                  </select>
                </label>
              </div>

              {filteredBusinesses.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredBusinesses.map((business) => (
                    <BrowseBusinessCard
                      key={business.id}
                      business={business}
                      isFavorite={favorites.includes(
                        business.id
                      )}
                      onFavorite={toggleSaved}
                    />
                  ))}
                </div>
              ) : (
                <div className="border border-white/10 bg-[#111816] px-6 py-20 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
                    No opportunities found
                  </p>

                  <h2 className="mt-4 font-['DM_Serif_Display'] text-3xl text-white">
                    Try adjusting your search.
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/55">
                    Remove some filters or search for another
                    category, business or country.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-7 bg-[#111816] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-200"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-100 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-[#171717]/40"
          />

          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-[#080d0b] px-6 pb-8 pt-6">
            <div className="mb-7 flex items-center justify-between">
              <h2 className="font-['DM_Serif_Display'] text-3xl text-white">
                Filter businesses
              </h2>

              <button
                type="button"
                onClick={() =>
                  setMobileFiltersOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center border border-white/10 bg-[#111816] text-lg"
                aria-label="Close filters"
              >
                ×
              </button>
            </div>

            <BrowseFilters
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
            />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-7 w-full bg-[#111816] py-3.5 text-sm font-semibold text-white"
            >
              Show {filteredBusinesses.length} businesses
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
