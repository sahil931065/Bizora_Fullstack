import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SiteMotion() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const main = document.querySelector("main");
    if (!main) return undefined;
    const eventCleanups = [];

    const context = gsap.context(() => {
      // The homepage already has its own editorial GSAP timelines.
      if (pathname !== "/" && !reduceMotion) {
        const sections = gsap.utils.toArray("main section");
        sections.forEach((section, index) => {
          gsap.fromTo(section,
            { y: 22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              delay: index === 0 ? 0.08 : 0,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: section,
                start: "top 92%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray("main article, main .grid > div[class*='border']").forEach((card, index) => {
          gsap.fromTo(card,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              delay: index * 0.06,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: {
                trigger: card,
                start: "top 94%",
                once: true,
              },
            },
          );
        });
      }

      if (pathname !== "/" && finePointer && !reduceMotion) {
        gsap.utils.toArray("main article, main .grid > div[class*='border']").forEach((card) => {
          card.style.transformStyle = "preserve-3d";
          const handleMove = (event) => {
            const bounds = card.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            gsap.to(card, {
              rotationY: x * 4,
              rotationX: y * -4,
              transformPerspective: 1100,
              duration: 0.35,
              ease: "power2.out",
              overwrite: true,
            });
          };
          const handleLeave = () => gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.65)",
            overwrite: true,
          });
          card.addEventListener("pointermove", handleMove);
          card.addEventListener("pointerleave", handleLeave);
          eventCleanups.push(() => {
            card.removeEventListener("pointermove", handleMove);
            card.removeEventListener("pointerleave", handleLeave);
            card.style.transformStyle = "";
          });
        });
      }
    }, main);

    if (pathname !== "/") {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      context.revert();
      eventCleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
