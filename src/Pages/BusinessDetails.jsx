import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useBizora } from "../context/BizoraContext";

import BusinessHeader from "../components/Business/BusinessHeader";
import BusinessGallery from "../components/Business/BusinessGallery";
import FinancialMetrics from "../components/Business/FinancialMetrics";
import BusinessOverview from "../components/Business/BusinessOverview";
import FinancialOverview from "../components/Business/FinancialOverview";
import BusinessHighlights from "../components/Business/BusinessHighlights";
import SellerCard from "../components/Business/SellerCard";
import ContactSellerModal from "../components/Business/ContactSellerModal";
import SimilarBusinesses from "../components/Business/SimilarBusinesses";
import DueDiligenceNotice from "../components/Business/DueDiligenceNotice";

export default function BusinessDetails() {
  const { id } = useParams();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { listings: browseBusinesses, saved, toggleSaved } = useBizora();

  const business = useMemo(
    () => browseBusinesses.find((item) => String(item.id) === String(id)),
    [browseBusinesses, id]
  );
  const isSaved = saved.includes(business?.id);

  if (!business) {
    return (
      <main className="min-h-screen bg-[#080d0b] px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-200">
            BUSINESS NOT FOUND
          </p>

          <h1 className="mt-5 font-['DM_Serif_Display'] text-5xl text-white md:text-6xl">
            This opportunity doesn't exist.
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-white/55">
            The business may have been removed or the URL may be incorrect.
          </p>

          <Link
            to="/businesses"
            className="mt-8 inline-flex bg-[#111816] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lime-200"
          >
            Browse Businesses →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[#080d0b]">
        <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/55"
          >
            <Link
              to="/businesses"
              className="transition-colors hover:text-lime-200"
            >
              Businesses
            </Link>

            <span>/</span>

            <Link
              to={`/businesses?category=${encodeURIComponent(
                business.category
              )}`}
              className="transition-colors hover:text-lime-200"
            >
              {business.category}
            </Link>

            <span>/</span>

            <span className="text-white">{business.name}</span>
          </nav>

          <BusinessHeader
            business={business}
            isSaved={isSaved}
            onSave={() => toggleSaved(business.id)}
            onContact={() => setIsContactOpen(true)}
          />

          <BusinessGallery business={business} />

          <FinancialMetrics business={business} />

          <div className="mt-20 grid gap-16 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-16">
              <BusinessOverview business={business} />

              <FinancialOverview business={business} />

              <BusinessHighlights business={business} />

              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
                  SELLER NOTE
                </p>

                <h2 className="mt-3 font-['DM_Serif_Display'] text-4xl text-white">
                  Why is the owner selling?
                </h2>

                <p className="mt-6 max-w-3xl text-base leading-8 text-white/55">
                  The seller is exploring a transition to a new project and is
                  looking for a buyer who can continue developing the business.
                </p>
              </section>

              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
                  POTENTIAL
                </p>

                <h2 className="mt-3 font-['DM_Serif_Display'] text-4xl text-white">
                  Growth opportunities
                </h2>

                <ul className="mt-7 space-y-4 border-t border-white/10">
                  {[
                    "Expand into additional European markets",
                    "Introduce higher-value subscription tiers",
                    "Improve automated reporting",
                    "Expand integrations",
                    "Increase customer acquisition",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex gap-4 border-b border-white/10 py-4 text-sm text-white/55"
                    >
                      <span className="text-lime-200">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="lg:pt-2">
              <SellerCard
                business={business}
                onContact={() => setIsContactOpen(true)}
              />
            </aside>
          </div>

          <section className="mt-24 border-t border-white/10 pt-16">
            <div className="mb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lime-200">
                DISCOVER MORE
              </p>

              <h2 className="mt-3 font-['DM_Serif_Display'] text-4xl text-white">
                You may also be interested in
              </h2>
            </div>

            <SimilarBusinesses
              business={business}
              businesses={browseBusinesses}
            />
          </section>

          <DueDiligenceNotice />
        </div>
      </main>

      <ContactSellerModal
        business={business}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
