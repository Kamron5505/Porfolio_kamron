"use client";

import { useEffect, useState } from "react";

export function AOSProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initAOS = async () => {
      try {
        const AOS = (await import("aos")).default;
        AOS.init({
          duration: 600,
          easing: "ease-out-cubic",
          once: true,
          offset: 80,
          delay: 0,
        });
        setReady(true);
      } catch {
        console.warn("AOS not available");
        setReady(true);
      }
    };
    initAOS();
  }, []);

  // Update AOS after page changes
  useEffect(() => {
    if (!ready) return;
    const refreshAOS = async () => {
      try {
        const AOS = (await import("aos")).default;
        AOS.refresh();
      } catch {}
    };
    refreshAOS();
  }, [ready]);

  return <>{children}</>;
}
