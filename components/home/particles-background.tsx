"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";

export function ParticlesBackground() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark" || theme === "hacker" || theme === "ocean" || theme === "neon" || theme === "amethyst" || !theme);
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Light mode: darker/subtle particles, Dark mode: bright/neon particles
  const particleColors = isDark
    ? ["#00d4ff", "#7c3aed", "#10b981", "#ffffff"]
    : ["#0088aa", "#5b21b6", "#059669", "#6b7280"];

  const linkColor = isDark ? "#00d4ff" : "#0088aa";
  const opacityValue = isDark ? 0.4 : 0.25;
  const linkOpacity = isDark ? 0.2 : 0.12;

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: particleColors,
          },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: linkOpacity,
            width: 1,
          },
          move: {
            direction: "none" as const,
            enable: true,
            outModes: {
              default: "bounce" as const,
            },
            random: false,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 50,
          },
          opacity: {
            value: opacityValue,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
