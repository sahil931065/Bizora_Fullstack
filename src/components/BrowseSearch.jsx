function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

export default function BrowseSearch({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/55">
        <SearchIcon />
      </span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search businesses, industries, or keywords..."
        aria-label="Search businesses"
        className="h-14 w-full border border-white/10 bg-[#111816] pl-14 pr-5 text-sm text-white outline-none transition-colors placeholder:text-[#99948B] focus:border-lime-200"
      />
    </div>
  );
}