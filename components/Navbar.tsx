"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/Button";
import Logo from "@/components/Logo";
import { NAV } from "@/lib/site";

function normalise(pathname: string) {
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const current = normalise(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The header CTA must never point at the page the visitor is already on:
  // on Academy programmes it becomes a registration prompt instead.
  const onAcademy = current === "/academy-programmes/";
  const ctaHref = onAcademy ? "/contact/" : "/academy-programmes/";
  const ctaLabel = onAcademy ? "Register Interest" : "View Programmes";

  const linkClass = (href: string) =>
    `group relative py-2 text-[0.875rem] font-medium tracking-[0.01em] whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flame-500 ${
      current === href
        ? "text-paper-50"
        : "text-paper-300 hover:text-paper-50"
    }`;

  const underline = (href: string) => (
    <span
      aria-hidden="true"
      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-flame-600 transition-transform duration-300 ${
        current === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/92 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink-950/85 to-transparent"
      }`}
    >
      {/* Header is full-bleed like the body content: no centred max-width,
         so wide monitors show no empty side margins. min-w-0 on the logo
         lets its column shrink, and the nav keeps its intrinsic width so
         items never wrap or overlap — the CTA is pushed to the right edge. */}
      <div className="container-page flex h-[var(--header-h)] items-center gap-4">
        <Link href="/" aria-label="Avatars Realm — home" className="min-w-0">
          <Logo priority />
        </Link>

        {/* Desktop navigation — sits next to the logo, CTA pushed right */}
        <nav
          aria-label="Primary"
          className="hidden shrink-0 items-center gap-4 whitespace-nowrap xl:flex 2xl:gap-6"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
              {underline(item.href)}
            </Link>
          ))}
        </nav>

        {/* ml-auto pushes this to the right edge of the flex row */}
        <div className="ml-auto hidden xl:block">
          <Button href={ctaHref} size="sm">{ctaLabel}</Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded border border-white/15 text-paper-50 transition-colors hover:border-flame-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-500 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Tablet / mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-ink-950/98 backdrop-blur-md xl:hidden"
      >
        <nav
          aria-label="Mobile"
          className="container-page flex flex-col gap-1 py-5"
        >
          {NAV.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border-b border-white/[0.06] py-4 text-[1.0625rem] font-medium transition-colors ${
                current === item.href
                  ? "text-flame-400"
                  : "text-paper-200 hover:text-paper-50"
              }`}
              onClick={() => setOpen(false)}
              style={{
                animation: open ? `rise 0.35s ease ${index * 40}ms both` : undefined,
              }}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button href={ctaHref} className="w-full">
              {ctaLabel}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
