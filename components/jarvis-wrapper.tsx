"use client";

import dynamic from "next/dynamic";

const JarvisComponent = dynamic(
  () => import("@/components/jarvis").then((mod) => ({ default: mod.Jarvis })),
  { ssr: false }
);

export function JarvisWrapper() {
  return <JarvisComponent />;
}
