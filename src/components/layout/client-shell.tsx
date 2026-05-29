"use client";

import dynamic from "next/dynamic";

const StickyCompareBar = dynamic(
  () => import("@/components/compare/sticky-compare-bar").then((mod) => mod.StickyCompareBar),
  { ssr: false }
);

const DebugNetworkToggle = dynamic(
  () => import("@/components/ui/debug-network-toggle").then((mod) => mod.DebugNetworkToggle),
  { ssr: false }
);

export function ClientShell() {
  return (
    <>
      <StickyCompareBar />
      <DebugNetworkToggle />
    </>
  );
}
