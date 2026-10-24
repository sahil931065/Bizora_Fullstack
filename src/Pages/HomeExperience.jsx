import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { browseBusinesses, businessTypes, featuredBusinesses } from "../Data/demoBusinesses";
import { getBusinessImage } from "../Data/businessImages";

gsap.registerPlugin(ScrollTrigger);

function Eyebrow({ children }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-lime-300">{children}</p>;
}

function OpportunityCard({ business }) {
  return (
    <Link to={`/businesses/${business.id}`} className="home-deal-card group block overflow-hidden rounded-2xl border border-white/10 bg-[#111816] transition duration-300 hover:-translate-y-1 hover:border-lime-200/40">
      <div className="relative h-52 overflow-hidden sm:h-60">
        <img src={getBusinessImage(business)} alt={`${business.category} business preview`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e0d] via-transparent to-black/10" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">{business.category}</span>
        <span className="absolute bottom-4 left-5 font-['DM_Serif_Display'] text-3xl text-white">{business.name}</span>
      </div>
      <div className="p-5 sm:p-6">
        <p className="min-h-10 text-sm leading-5 text-white/55">{business.description}</p>
        <div className="mt-5 grid grid-cols-2 border-y border-white/10 py-4">
          <div><p className="text-[10px] uppercase tracking-wider text-white/40">Asking price</p><p className="mt-1 text-lg font-semibold text-white">{business.price}</p></div>
          <div className="border-l border-white/10 pl-5"><p className="text-[10px] uppercase tracking-wider text-white/40">Monthly revenue</p><p className="mt-1 text-lg font-semibold text-white">{business.revenue}</p></div>
        </div>
        <div className="mt-4 flex items-center justify-between text-sm font-semibold text-lime-200">
          <span>{business.country || "Explore opportunity"}</span><span className="transition-transform group-hover:translate-x-1">View details →</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomeExperience() {
  const pageRef = useRef(null);
  const heroCopyRef = useRef(null);
  const heroSceneRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (prefersReducedMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(heroCopyRef.current.children, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 })
        .fromTo(heroSceneRef.current, { opacity: 0, y: 24, rotateY: -12, rotateX: 7 }, { opacity: 1, y: 0, rotateY: 0, rotateX: 0, duration: 1.1, transformPerspective: 1400 }, "-=0.6");

      gsap.to(".home-orbit-chip", { y: -12, rotateZ: 3, duration: 2.6, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.35 });
      gsap.utils.toArray(".home-reveal").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 34 }, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, pageRef);

    const scene = dashboardRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const handleMove = (event) => {
      if (prefersReducedMotion || !finePointer || !scene) return;
      const bounds = scene.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      gsap.to(scene, { rotateY: x * 10, rotateX: y * -8, duration: 0.45, ease: "power2.out", overwrite: true });
    };
    const handleLeave = () => {
      if (!scene) return;
      gsap.to(scene, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.7)", overwrite: true });
    };
    scene?.addEventListener("pointermove", handleMove);
    scene?.addEventListener("pointerleave", handleLeave);

    return () => {
      scene?.removeEventListener("pointermove", handleMove);
      scene?.removeEventListener("pointerleave", handleLeave);
      context.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="home-v3 overflow-hidden bg-[#080d0b] text-[#f4f5ec] selection:bg-lime-200 selection:text-[#080d0b]">
      <section className="relative isolate min-h-[760px] overflow-hidden pb-24 pt-32 sm:pt-40 lg:min-h-[850px] lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_74%_38%,rgba(132,158,88,0.2),transparent_42%),radial-gradient(ellipse_at_12%_78%,rgba(39,97,75,0.18),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8">
          <div ref={heroCopyRef} className="relative z-10 max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,.8)]" />
              The business acquisition marketplace
            </div>
            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">
              Buy the next<br /><span className="bg-gradient-to-r from-lime-200 via-[#d4edaa] to-white bg-clip-text text-transparent">great thing.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              Discover established digital businesses, understand the numbers, and meet the people behind the opportunity.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/businesses" className="inline-flex min-h-13 items-center justify-center rounded-full bg-lime-200 px-7 text-sm font-bold text-[#10150e] shadow-[0_8px_40px_rgba(190,242,100,.18)] transition hover:-translate-y-0.5 hover:bg-lime-100">Explore businesses <span className="ml-3">↗</span></Link>
              <Link to="/sell" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/[0.05]">Sell a business</Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-xs text-white/40">
              <div className="flex -space-x-2"><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#080d0b] bg-[#435349] text-[10px] text-white">S</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#080d0b] bg-[#8b7258] text-[10px] text-white">B</span><span className="grid h-8 w-8 place-items-center rounded-full border-2 border-[#080d0b] bg-[#576279] text-[10px] text-white">A</span></div>
              <span>From SaaS to ecommerce, find a business that fits your ambition.</span>
            </div>
          </div>

          <div ref={heroSceneRef} className="relative mx-auto w-full max-w-[610px] opacity-0 [perspective:1400px]">
            <div className="absolute -inset-8 rounded-full bg-lime-300/[0.08] blur-3xl" />
            <div className="absolute -left-10 top-12 h-[78%] w-[78%] rounded-full border border-white/[0.08] [transform:rotateX(64deg)_rotateZ(-28deg)]" />
            <div ref={dashboardRef} className="relative ml-auto w-[92%] overflow-hidden rounded-[28px] border border-white/20 bg-[#101714] shadow-[0_50px_120px_rgba(0,0,0,.55)] [transform-style:preserve-3d]">
              <img src={getBusinessImage({ visual: "analytics" })} alt="A digital business analytics dashboard on a laptop" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#0b100e]/55 via-[#0b100e]/40 to-[#0b100e]/90" />
              <div className="relative p-5 sm:p-7 lg:p-8">
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-200 text-sm font-black text-[#10150e]">B</span><div><p className="text-xs font-semibold text-white">Bizora Intelligence</p><p className="mt-1 text-[10px] text-white/45">Opportunity overview</p></div></div>
                  <span className="rounded-full border border-lime-200/25 bg-lime-200/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-lime-100">Sample deal</span>
                </div>
                <div className="mt-7 flex items-end justify-between gap-3">
                  <div><p className="text-xs text-white/55">AI Analytics SaaS</p><p className="mt-2 font-['DM_Serif_Display'] text-3xl text-white sm:text-4xl">€42,000</p><p className="mt-1 text-[10px] text-white/40">Illustrative asking price</p></div>
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-3 text-right backdrop-blur"><p className="text-[9px] uppercase tracking-wider text-white/45">Monthly profit</p><p className="mt-1 text-sm font-semibold text-lime-100">€2,800</p></div>
                </div>
                <div className="mt-7 rounded-2xl border border-white/10 bg-[#09100c]/70 p-4 backdrop-blur-md sm:p-5">
                  <div className="mb-5 flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Revenue trend</p><p className="mt-1 text-xs text-white/70">Recurring income · sample data</p></div><span className="text-[10px] text-lime-200">Last 6 months</span></div>
                  <div className="flex h-28 items-end gap-2 sm:h-36 sm:gap-3" aria-label="Illustrative revenue chart">
                  {[36, 52, 43, 68, 61, 82, 74, 96, 88, 100].map((height, index) => <div key={index} className="h-full flex-1 rounded-t-md bg-gradient-to-t from-lime-300/20 to-lime-200/90" style={{ height: `${height}%`, alignSelf: "end", opacity: index > 6 ? 1 : 0.48 }} />)}
                  </div>
                  <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-[9px] text-white/35"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                  {[ ["Revenue / mo", "€8.4k"], ["Customers", "1,240"], ["Model", "SaaS"] ].map(([label, value]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[0.05] p-3"><p className="text-[8px] text-white/40 sm:text-[9px]">{label}</p><p className="mt-1 text-xs font-semibold text-white sm:text-sm">{value}</p></div>)}
                </div>
              </div>
            </div>
            <div className="home-orbit-chip absolute -left-2 top-12 rounded-2xl border border-white/15 bg-[#18221a]/90 px-4 py-3 shadow-2xl backdrop-blur-xl sm:-left-8"><p className="text-[9px] uppercase tracking-wider text-white/45">Explore</p><p className="mt-1 text-sm font-semibold text-lime-100">Digital-first deals</p></div>
            <div className="home-orbit-chip absolute -bottom-6 right-2 rounded-2xl border border-lime-200/20 bg-[#172019]/95 px-4 py-3 shadow-2xl backdrop-blur-xl sm:right-[-20px]"><p className="text-[9px] uppercase tracking-wider text-white/45">Your next chapter</p><p className="mt-1 text-sm font-semibold text-white">Starts with ownership ↗</p></div>
          </div>
        </div>
        <div className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35"><span>Explore by business model</span><span>SaaS</span><span>E-commerce</span><span>AI products</span><span>Agencies</span><span>Digital properties</span></div>
        </div>
      </section>

      <section className="home-reveal border-y border-white/[0.08] bg-[#0d1310] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div><Eyebrow>Curated opportunities</Eyebrow><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">A closer look at what’s for sale.</h2><p className="mt-4 max-w-xl text-sm leading-6 text-white/50">Explore the numbers, understand the business, and decide which opportunity deserves a closer look.</p></div>
            <Link to="/businesses" className="text-sm font-semibold text-lime-200 transition hover:text-white">Browse all {browseBusinesses.length} sample listings ↗</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{featuredBusinesses.map((business) => <OpportunityCard key={business.id} business={business} />)}</div>
          <p className="mt-5 text-[10px] text-white/30">Sample listings and financial figures are illustrative demo content.</p>
        </div>
      </section>

      <section className="home-reveal py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div className="lg:sticky lg:top-32 lg:self-start"><Eyebrow>Choose your lane</Eyebrow><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">Find the model that fits.</h2><p className="mt-5 max-w-sm text-sm leading-6 text-white/50">From subscription software to established online stores, explore the kind of business you want to own.</p><Link to="/businesses" className="mt-7 inline-flex text-sm font-semibold text-lime-200 hover:text-white">Explore marketplace <span className="ml-2">↗</span></Link></div>
          <div className="grid gap-3 sm:grid-cols-2">{businessTypes.map((type) => <Link key={type.number} to={`/businesses?category=${encodeURIComponent(type.name)}`} className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.015] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime-200/35 hover:bg-lime-200/[0.06] sm:p-7"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-lime-200">{type.number}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/50 transition group-hover:rotate-45 group-hover:border-lime-200/40 group-hover:text-lime-200">↗</span></div><h3 className="mt-8 text-2xl font-semibold tracking-tight text-white">{type.name}</h3><p className="mt-2 text-sm text-white/45">{type.description}</p><div className="mt-6 h-px origin-left scale-x-0 bg-lime-200/70 transition-transform duration-500 group-hover:scale-x-100" /></Link>)}</div>
        </div>
      </section>

      <section className="home-reveal border-y border-white/[0.08] bg-[#dafa9e] py-24 text-[#11170e] sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#465d2c]">A clearer path to ownership</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Three steps.<br />One new chapter.</h2></div>
          <div className="grid gap-3 sm:grid-cols-3">{[["01", "Discover", "Search by industry, price, revenue and the details that matter to you."], ["02", "Connect", "Review the opportunity and start a direct conversation with its owner."], ["03", "Acquire", "Do your diligence, agree terms and move toward a new ownership chapter."]].map(([number, title, text]) => <article key={number} className="rounded-2xl border border-black/10 bg-white/35 p-6 backdrop-blur-sm"><p className="text-xs font-bold text-[#58743a]">{number}</p><h3 className="mt-8 text-2xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#26311f]/70">{text}</p></article>)}</div>
        </div></div>
      </section>

      <section className="home-reveal py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#111816] lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 sm:p-12 lg:p-16"><Eyebrow>For business owners</Eyebrow><h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">You built it.<br /><span className="text-lime-200">Choose what’s next.</span></h2><p className="mt-5 max-w-md text-sm leading-7 text-white/50">Present your business clearly and connect with buyers who are looking for their next opportunity.</p><Link to="/sell" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-lime-200 px-6 text-sm font-bold text-[#11170e] transition hover:-translate-y-0.5 hover:bg-white">Start a listing <span className="ml-3">↗</span></Link></div>
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-full"><img src={getBusinessImage({ visual: "agency" })} alt="Modern independent business workspace" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-65" /><div className="absolute inset-0 bg-gradient-to-r from-[#111816] via-[#111816]/35 to-transparent lg:bg-gradient-to-r" /><div className="absolute bottom-7 left-7 rounded-2xl border border-white/15 bg-black/25 px-4 py-3 backdrop-blur-md"><p className="text-[9px] uppercase tracking-widest text-white/50">Your next chapter</p><p className="mt-1 text-sm font-semibold text-white">Starts with a conversation.</p></div></div>
        </div></div>
      </section>

      <section className="border-t border-white/[0.08] py-16 sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 sm:flex-row sm:items-end lg:px-8"><div><Eyebrow>Make your next move</Eyebrow><h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl">Your next business is out there.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-white/50">Start with a search. Stay for the opportunity.</p></div><Link to="/businesses" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-6 text-sm font-bold text-[#11170e] transition hover:bg-lime-200">Explore businesses ↗</Link></div>
      </section>
      <footer className="border-t border-white/[0.08] py-7"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-8"><span className="font-['DM_Serif_Display'] text-lg text-white">Bizora</span><span>Business acquisition, with a clearer point of view.</span><Link to="/about" className="transition hover:text-white">About Bizora ↗</Link></div></footer>
    </main>
  );
}
