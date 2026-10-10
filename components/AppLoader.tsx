"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import DragonLoader from "@/components/DragonLoader";
import { GridBackdrop } from "@/components/Marks";

/**
 * Full-screen loading state shown once when the site first opens, and again
 * briefly on every route change. Renders in the server HTML (visible from the
 * first paint) and fades itself out once the page is ready.
 */
export default function AppLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const mounted = useRef(false);

  // First open: hold the loader until the page has loaded (min 700ms, 4s cap).
  useEffect(() => {
    const start = Date.now();
    const hide = () => {
      const wait = Math.max(0, 700 - (Date.now() - start));
      window.setTimeout(() => setVisible(false), wait);
    };

    if (document.readyState === "complete") {
      hide();
      return;
    }

    window.addEventListener("load", hide);
    const fallback = window.setTimeout(hide, 4000);
    return () => {
      window.removeEventListener("load", hide);
      window.clearTimeout(fallback);
    };
  }, []);

  // Every page navigation: bring the loader back for a short beat.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <noscript>
        <style>{`#route-loader{display:none!important}`}</style>
      </noscript>
      <div
        id="route-loader"
        role="status"
        aria-live="polite"
        aria-label="Loading"
        className={`fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-ink-950 transition-[opacity,visibility] duration-500 ${
          visible ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <GridBackdrop className="opacity-50" />
        <DragonLoader className="relative" />

        <p className="relative mt-10 text-[0.7rem] font-semibold tracking-[0.42em] text-paper-400 uppercase">
          Loading
        </p>
        <div className="relative mt-4 h-px w-44 overflow-hidden bg-white/10">
          <div className="loader-bar h-full w-1/2 bg-gradient-to-r from-transparent via-flame-500 to-transparent" />
        </div>
      </div>
    </>
  );
}

