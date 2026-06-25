"use client";

import { useCallback } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const initEngine = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initEngine}>{children}</ParticlesProvider>
  );
}
