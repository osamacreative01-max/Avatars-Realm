"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * App Router keeps the visitor where they were after a navigation, so pages
 * open mid-scroll depending on where the previous one was left. Jump to the
 * top of every new route — instantly, overriding the global smooth scroll.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const jump = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    jump();
    // Again on the next frame — the router can restore scroll after effects.
    const frame = window.requestAnimationFrame(jump);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
