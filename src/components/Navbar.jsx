import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useBizora } from "../context/BizoraContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useBizora();

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const actionsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        navRef.current,
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        }
      )
        .fromTo(
          logoRef.current,
          {
            y: 8,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
          },
          "-=0.4"
        )
        .fromTo(
          linksRef.current,
          {
            y: 8,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.08,
          },
          "-=0.3"
        )
        .fromTo(
          actionsRef.current,
          {
            y: 8,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
          },
          "-=0.25"
        );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed left-0 right-0 top-5 z-50 px-4 opacity-0"
    >
      <nav className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#101713]/85 px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a
            ref={logoRef}
            href="/"
            className="font-['DM_Serif_Display'] text-2xl tracking-tight text-white"
          >
            Bizora
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["Browse Businesses", "/businesses"],
              ["How It Works", "/how-it-works"],
              ["About", "/about"],
              ["Contact", "/contact"],
            ].map(([label, href], index) => (
              <Link
                key={label}
                ref={(el) => {
                  linksRef.current[index] = el;
                }}
                to={href}
                className="text-sm font-medium text-white/75 transition-colors duration-200 hover:text-lime-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div
            ref={actionsRef}
            className="hidden items-center gap-4 md:flex"
          >
            {user ? (
              <Link
                to="/dashboard"
                className="text-sm font-semibold text-white transition-colors duration-200 hover:text-lime-200"
              >
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold text-white transition-colors duration-200 hover:text-lime-200"
              >
                Sign in
              </Link>
            )}

            <Link
              to="/sell"
              className="rounded-xl bg-lime-200 px-5 py-2.5 text-sm font-semibold text-[#10150e] transition-all duration-200 hover:-translate-y-0.5 hover:bg-lime-100"
            >
              Sell a Business
            </Link>
          </div>

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </div>
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
            <div className="flex flex-col gap-1">
              <Link
                to="/businesses"
                className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Browse Businesses
              </Link>

              <Link
                to="/how-it-works"
                className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                How It Works
              </Link>

              <Link
                to="/about"
                className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </Link>

              <div className="my-2 h-px bg-white/10" />

              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
              )}

              <Link
                to="/sell"
                className="mt-1 rounded-xl bg-lime-200 px-4 py-3 text-center text-sm font-semibold text-[#10150e]"
                onClick={() => setMobileOpen(false)}
              >
                Sell a Business
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
