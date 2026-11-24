import BusinessCard from "../components/BusinessCard";
import { getBusinessImage } from "../Data/businessImages";
import {
  featuredBusinesses,
  marketPulse,
  businessTypes,
} from "../Data/demoBusinesses";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);






function HeroVisual({ ref }) {
  return (
    <div className="relative mx-auto w-full max-w-155">
      {/* Editorial visual */}
      <div className="relative aspect-[4/4.2] overflow-hidden bg-[#26231f]">
        <img
          src={getBusinessImage({ visual: "analytics" })}
          alt="Analytics dashboard open on a laptop in a modern workspace"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/75 via-[#171717]/10 to-[#171717]/15" />

        {/* Editorial label */}
        <div className="absolute bottom-7 left-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B08D57]">
            The next chapter
          </p>
          <p className="mt-2 font-['DM_Serif_Display'] text-3xl text-[#F7F5F0]">
            Starts with ownership.
          </p>
        </div>
      </div>

      {/* Floating opportunity card */}
      <div   ref={ref} className="absolute -bottom-7 -left-5 w-62.5 border border-[#E5E1D8] bg-white p-5 shadow-[0_20px_50px_rgba(23,23,23,0.12)] sm:-left-8 sm:w-70">
        <div className="relative -mx-5 -mt-5 mb-4 h-28 overflow-hidden bg-[#26231F]">
          <img
            src={getBusinessImage({ visual: "analytics" })}
            alt="Analytics dashboard on a laptop"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/55 to-transparent" />
          <span className="absolute bottom-3 left-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
            SaaS opportunity
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B08D57]">
            Verified Opportunity
          </span>

          <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
        </div>

        <h3 className="mt-4 font-['DM_Serif_Display'] text-xl text-[#171717]">
          AI Analytics SaaS
        </h3>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-[#6B6B6B]">Asking price</p>
            <p className="mt-1 text-lg font-semibold text-[#171717]">
              €42,000
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-[#6B6B6B]">Monthly profit</p>
            <p className="mt-1 text-sm font-semibold text-[#171717]">
              €2,800
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-[#E5E1D8] pt-3 text-xs text-[#6B6B6B]">
          Revenue verified
        </div>
      </div>
    </div>
  );
}

function MarketPulse() {
  return (
    <section className="market-pulse border-y border-[#E5E1D8] bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col border-b border-[#E5E1D8] py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Market Pulse
          </p>

          <p className="mt-2 text-xs text-[#6B6B6B] sm:mt-0">
            Development data · Replace with live marketplace data
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {marketPulse.map((item, index) => (
            <div
              key={item.label}
              className={`py-8 ${
                index !== 0 ? "border-l border-[#E5E1D8] pl-6 md:pl-8" : ""
              } ${
                index >= 2
                  ? "border-t border-[#E5E1D8] md:border-t-0"
                  : ""
              }`}
            >
              <p className="font-['DM_Serif_Display'] text-3xl text-[#171717] sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-[#6B6B6B]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedBusinesses() {
  return (
    <section className="gsap-section py-24 sm:py-28">
      <div className=" mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              Featured Opportunities
            </p>

            <h2 className="mt-4 max-w-2xl font-['DM_Serif_Display'] text-4xl leading-tight text-[#171717] sm:text-5xl">
              Businesses worth looking at.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#6B6B6B]">
              A curated selection of businesses currently available for
              acquisition.
            </p>
          </div>

          <a
            href="/businesses"
            className="shrink-0 text-sm font-semibold text-[#171717] transition-colors hover:text-[#B08D57]"
          >
            View All Businesses →
          </a>
        </div>

        <div className="business-cards-grid mt-12 grid gap-6 lg:grid-cols-3">
          {featuredBusinesses.map((business) => (
            <div key={business.id} className="business-card">
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessTypes() {
  return (
    <section className="gsap-section border-y border-[#E5E1D8] bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              Explore
            </p>

            <h2 className="mt-4 font-['DM_Serif_Display'] text-4xl leading-tight text-[#171717] sm:text-5xl">
              What are you looking to acquire?
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-[#6B6B6B]">
              Explore opportunities across established digital business
              models and industries.
            </p>
          </div>

          <div className="business-types-list border-t border-[#E5E1D8]">
            {businessTypes.map((type) => (
              <a
                key={type.number}
                href={`/businesses?category=${encodeURIComponent(type.name)}`}
                className="business-type-row  group grid grid-cols-[48px_1fr_auto] items-center gap-5 border-b border-[#E5E1D8] py-6 transition-colors hover:bg-[#F7F5F0] sm:grid-cols-[60px_1fr_1fr_auto]"
              >
                <span className="text-xs font-semibold text-[#B08D57]">
                  {type.number}
                </span>

                <span className="font-['DM_Serif_Display'] text-2xl text-[#171717] sm:text-3xl">
                  {type.name}
                </span>

                <span className="hidden text-sm text-[#6B6B6B] sm:block">
                  {type.description}
                </span>

                <span className="text-xl text-[#171717] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#B08D57]">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      text: "Explore businesses by industry, price, revenue and other criteria.",
    },
    {
      number: "02",
      title: "Connect",
      text: "Review the opportunity and connect directly with the owner.",
    },
    {
      number: "03",
      title: "Acquire",
      text: "Perform your due diligence and complete the transaction.",
    },
  ];

  return (
    <section className=" gsap-section  py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            The Process
          </p>

          <h2 className="mt-4 font-['DM_Serif_Display'] text-4xl leading-tight text-[#171717] sm:text-5xl">
            From discovery to ownership.
          </h2>
        </div>

        <div className="process-steps  mt-16 grid border-t border-[#E5E1D8] md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`process-step  py-8 md:pr-10 ${
                index !== 0 ? "border-t md:border-l md:border-t-0 md:pl-10" : ""
              } border-[#E5E1D8]`}
            >
              <p className="text-sm font-semibold text-[#B08D57]">
                {step.number}
              </p>

              <h3 className="mt-8 font-['DM_Serif_Display'] text-3xl text-[#171717]">
                {step.title}
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#6B6B6B]">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellerCTA() {
  return (
    <section className="bg-[#171717] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
              For Sellers
            </p>

            <h2 className="mt-5 max-w-2xl font-['DM_Serif_Display'] text-5xl leading-[1.05] text-[#F7F5F0] sm:text-6xl">
              Built something valuable?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#F7F5F0]/65">
              Find the next owner for your business and connect with buyers
              looking for their next acquisition.
            </p>

            <a
              href="/sell"
              className="mt-9 inline-flex items-center gap-3 border border-[#B08D57] px-6 py-3.5 text-sm font-semibold text-[#F7F5F0] transition-colors hover:bg-[#B08D57]"
            >
              Sell Your Business
              <span>→</span>
            </a>
          </div>

          <div className="relative min-h-75 overflow-hidden border border-white/10">
            <div className="absolute inset-8 border border-[#B08D57]/30" />
            <div className="absolute left-12 top-12 text-xs uppercase tracking-[0.2em] text-white/35">
              Your business
            </div>

            <div className="absolute bottom-12 left-12 right-12">
              <div className="flex items-end gap-2">
                <div className="h-16 w-1/5 bg-white/10" />
                <div className="h-24 w-1/5 bg-white/15" />
                <div className="h-20 w-1/5 bg-[#B08D57]/60" />
                <div className="h-32 w-1/5 bg-white/20" />
                <div className="h-40 w-1/5 bg-[#B08D57]" />
              </div>

              <div className="mt-5 h-px bg-white/10" />
              <p className="mt-4 text-xs text-white/40">
                A new owner. A new chapter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const features = [
    {
      number: "01",
      title: "Revenue Transparency",
      text: "Clear financial information for every listing.",
    },
    {
      number: "02",
      title: "Seller Verification",
      text: "Know who you're dealing with.",
    },
    {
      number: "03",
      title: "Business Insights",
      text: "Understand the opportunity before making contact.",
    },
    {
      number: "04",
      title: "Secure Communication",
      text: "Keep buyer and seller conversations organized.",
    },
  ];

  return (
    <section className="trust-features  border-b border-[#E5E1D8] bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
            Built Around Trust
          </p>

          <h2 className="mt-4 font-['DM_Serif_Display'] text-4xl leading-tight text-[#171717] sm:text-5xl">
            Better information. Better decisions.
          </h2>
        </div>

        <div className="trust-feature mt-14 grid border-t border-[#E5E1D8] sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="trust-feature  border-b border-[#E5E1D8] py-7 sm:px-7 lg:border-b-0 lg:border-l"
            >
              <p className="text-xs font-semibold text-[#B08D57]">
                {feature.number}
              </p>

              <h3 className="mt-7 text-base font-semibold text-[#171717]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#6B6B6B]">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B08D57]">
          Start Exploring
        </p>

        <h2 className="mt-5 font-['DM_Serif_Display'] text-5xl leading-[1.05] text-[#171717] sm:text-7xl">
          Your next business might already exist.
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#6B6B6B]">
          Explore businesses available for acquisition on Bizora.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <a
            href="/businesses"
            className="inline-flex min-h-12 items-center justify-center bg-[#171717] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#B08D57]"
          >
            Explore Businesses
            <span className="ml-3">→</span>
          </a>

          <a
            href="/sell"
            className="text-sm font-semibold text-[#171717] transition-colors hover:text-[#B08D57]"
          >
            Have something to sell? Sell your business →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const homeRef = useRef(null);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroVisualRef = useRef(null);
  const floatingCardRef = useRef(null);

  useEffect(() => {

    const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  gsap.set(
    [
      heroContentRef.current.children,
      heroVisualRef.current,
      floatingCardRef.current,
    ],
    {
      opacity: 1,
      y: 0,
      x: 0,
    }
  );

  return;
}



    const ctx = gsap.context(() => {
      // --------------------------------
      // Hero entrance
      // --------------------------------

      const heroTimeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      heroTimeline
        .fromTo(
          heroContentRef.current.children,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
          }
        )
        .fromTo(
          heroVisualRef.current,
          {
            x: 40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.65"
        )
        .fromTo(
          floatingCardRef.current,
          {
            y: 25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.45"
        );

      // --------------------------------
      // Floating acquisition card
      // --------------------------------

      gsap.to(floatingCardRef.current, {
        y: -8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // --------------------------------
      // Scroll reveal sections
      // --------------------------------

      gsap.utils.toArray(".gsap-section").forEach((section) => {
        gsap.fromTo(
          section,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      // --------------------------------
      // Business cards
      // --------------------------------

      gsap.fromTo(
        ".business-card",
        {
          y: 45,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".business-cards-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      // --------------------------------
      // Market pulse
      // --------------------------------

      gsap.fromTo(
        ".market-stat",
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".market-pulse",
            start: "top 85%",
            once: true,
          },
        }
      );

      // --------------------------------
      // Business types
      // --------------------------------

      gsap.fromTo(
        ".business-type-row",
        {
          x: -25,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".business-types-list",
            start: "top 82%",
            once: true,
          },
        }
      );

      // --------------------------------
      // Process steps
      // --------------------------------

      gsap.fromTo(
        ".process-step",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 82%",
            once: true,
          },
        }
      );

      // --------------------------------
      // Trust features
      // --------------------------------

      gsap.fromTo(
        ".trust-feature",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".trust-features",
            start: "top 82%",
            once: true,
          },
        }
      );
    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <main   ref={homeRef} className="overflow-hidden bg-[#F7F5F0] text-[#171717]">
      {/* Hero */}
      <section   ref={heroRef}  className="pt-36 pb-24 sm:pt-44 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
            <div ref={heroContentRef}  className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B08D57]">
                The Business Acquisition Marketplace
              </p>

              <h1 className="mt-6 font-['DM_Serif_Display'] text-6xl leading-[0.98] tracking-tight text-[#171717] sm:text-7xl lg:text-[82px]">
                Own something
                <br />
                worth building.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[#6B6B6B] sm:text-lg">
                Discover profitable businesses, explore new opportunities, or
                find the right owner for what you've built.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/businesses"
                  className="inline-flex min-h-12 items-center justify-center bg-[#171717] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#B08D57]"
                >
                  Explore Businesses
                  <span className="ml-3">→</span>
                </a>

                <a
                  href="/sell"
                  className="inline-flex min-h-12 items-center justify-center border border-[#171717]/15 bg-white px-6 text-sm font-semibold text-[#171717] transition-colors hover:border-[#B08D57] hover:text-[#B08D57]"
                >
                  Sell Your Business
                </a>
              </div>

              <div className="mt-10 flex items-center gap-3 text-xs text-[#6B6B6B]">
                <span className="h-2 w-2 rounded-full bg-[#B08D57]" />
                SaaS · E-commerce · AI · Apps · Agencies
              </div>
            </div>

            <div ref={heroVisualRef}><HeroVisual ref={floatingCardRef} /></div>
          </div>
        </div>
      </section>

      <MarketPulse />
      <FeaturedBusinesses />
      <BusinessTypes />
      <HowItWorks />
      <SellerCTA />
      <TrustSection />
      <FinalCTA />
    </main>
  );
}
