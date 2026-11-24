import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="min-h-screen bg-[#080d0b] px-5 pb-24 pt-36">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">ABOUT BIZORA</p>
        <h1 className="mt-4 max-w-4xl font-['DM_Serif_Display'] text-5xl leading-tight sm:text-6xl">
          Built for thoughtful business acquisitions.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-white/55">
          Bizora brings business owners and prospective buyers into one considered marketplace.
          We make opportunities easier to discover, assess and discuss—without hiding the work that
          a responsible acquisition requires.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Clearer discovery", "Search and compare businesses using consistent categories, asking prices and financial context."],
            ["02", "Informed evaluation", "Review performance, customer signals and due-diligence prompts before making an approach."],
            ["03", "Private connection", "Move from interest to a structured conversation with the seller in one secure workspace."],
          ].map(([number, title, body]) => (
            <article key={number} className="border border-white/10 bg-[#111816] p-7">
              <p className="font-['DM_Serif_Display'] text-4xl text-lime-200">{number}</p>
              <h2 className="mt-5 font-['DM_Serif_Display'] text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/55">{body}</p>
            </article>
          ))}
        </div>

        <section className="mt-12 grid gap-8 border-y border-white/10 py-10 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-['DM_Serif_Display'] text-4xl">Our principles</h2>
          <div className="grid gap-6 text-sm leading-7 text-white/55 sm:grid-cols-2">
            <p><strong className="block text-white">Transparency first</strong>Listings should communicate what is known, what is estimated and what still needs verification.</p>
            <p><strong className="block text-white">Buyer-led decisions</strong>Bizora supports evaluation; every buyer remains responsible for independent legal and financial review.</p>
          </div>
        </section>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/businesses" className="inline-flex bg-[#111816] px-6 py-3 text-sm font-semibold text-white hover:bg-lime-200">Browse opportunities →</Link>
          <Link to="/contact" className="inline-flex border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:border-lime-200">Contact Bizora →</Link>
        </div>
      </div>
    </main>
  );
}
