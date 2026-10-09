"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

/** Defers the WebGL fluid sim out of the critical path — it only matters once the pointer moves. */
export default function CursorEffects() {
  return <SplashCursor />;
}
