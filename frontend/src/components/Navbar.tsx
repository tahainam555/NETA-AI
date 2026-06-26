"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { routes } from "@/lib/routes";

const links = [
  { to: routes.services, label: "Services" },
  { to: routes.aiSolutions, label: "AI Solutions" },
  { to: routes.caseStudies, label: "Case Studies" },
  { to: routes.about, label: "About Us" },
  { to: routes.blogs, label: "Blogs" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const pathname = usePathname();
  const mobileOpenSurface = isOverDark
    ? "bg-white border-black/10 text-black shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)]"
    : "bg-[rgba(10,11,16,0.96)] border-white/[0.10] text-white shadow-[0_18px_55px_-24px_rgba(0,0,0,0.75)]";

  useLayoutEffect(() => {
    const updateNavbarState = () => {
      setScrolled(window.scrollY > 8);
      const header = document.querySelector("header");
      if (header) {
        const rect = header.getBoundingClientRect();
        const y = rect.top + rect.height / 2;
        let overDark = false;
        const darkSections = document.querySelectorAll(".section-dark, footer");
        for (let i = 0; i < darkSections.length; i++) {
          const sRect = darkSections[i].getBoundingClientRect();
          if (y >= sRect.top && y <= sRect.bottom) {
            overDark = true;
            break;
          }
        }
        setIsOverDark(overDark);
      }
    };
    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);
    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed z-50 ${open ? "transition-colors duration-100" : "transition-all duration-500"} ${
        open
          ? `top-2 left-0 right-0 mx-auto w-[92%] max-w-6xl overflow-hidden rounded-3xl border backdrop-blur-2xl ${mobileOpenSurface} lg:top-0 lg:w-full lg:rounded-none`
          : scrolled
          ? `top-2 md:top-4 left-0 right-0 mx-auto w-[92%] md:w-[85%] max-w-6xl rounded-full border shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] ${isOverDark ? "bg-white border-black/10 text-black" : "bg-black border-white/[0.08] text-white"}`
          : `top-0 left-0 right-0 w-full border-b ${isOverDark ? "bg-white border-black/10 text-black" : "bg-black border-transparent text-white"}`
      }`}
    >
      {/* Hairline top accent */}
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px hairline-top opacity-60" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className={isOverDark ? "text-black" : "text-white"}>
          <Logo dark={!isOverDark} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              className={`group relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                pathname === l.to
                  ? "text-[#2563eb]"
                  : isOverDark
                  ? "text-black/70 hover:text-[#2563eb]"
                  : "text-white/65 hover:text-[#2563eb]"
              }`}
            >
              <span className="relative z-10">{l.label}</span>
              <span className={`absolute inset-0 -z-0 scale-95 rounded-full opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${isOverDark ? "bg-black/[0.06]" : "bg-white/[0.06]"}`} />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Link href={routes.contact} className="btn-primary group">
            Contact Us
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          className={`lg:hidden rounded-md p-2 ${isOverDark ? "text-black" : "text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className={`lg:hidden border-t ${isOverDark ? "border-black/10 bg-white" : "border-white/[0.08] bg-[rgba(10,11,16,0.96)]"}`}>
          <div className="flex flex-col gap-1 px-4 pb-4 pt-3">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                  isOverDark
                    ? "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
                    : "text-white/80 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={routes.contact}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
