"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Theme = "dark" | "light" | "hacker" | "ocean" | "neon" | "amethyst";

const THEMES: Theme[] = ["dark", "light", "hacker", "ocean", "neon", "amethyst"];

const THEME_LABELS: Record<Theme, string> = {
  dark: "Dark",
  light: "Light",
  hacker: "Hacker",
  ocean: "Ocean",
  neon: "Neon",
  amethyst: "Amethyst",
};

const THEME_ICONS: Record<Theme, string> = {
  dark: "🌙",
  light: "☀️",
  hacker: "💚",
  ocean: "🌊",
  neon: "💜",
  amethyst: "🔮",
};

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cycleTheme: () => void;
  themes: typeof THEMES;
  themeLabels: typeof THEME_LABELS;
  themeIcons: typeof THEME_ICONS;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const preferred = stored && THEMES.includes(stored) ? stored : "dark";
    setThemeState(preferred);
    applyTheme(preferred);
  }, [applyTheme]);

  const setTheme = useCallback(
    (t: Theme) => {
      setThemeState(t);
      applyTheme(t);
    },
    [applyTheme]
  );

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const idx = THEMES.indexOf(prev);
      const next = THEMES[(idx + 1) % THEMES.length];
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, cycleTheme, themes: THEMES, themeLabels: THEME_LABELS, themeIcons: THEME_ICONS }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const defaultTheme: ThemeContextValue = {
  theme: "dark",
  setTheme: () => {},
  cycleTheme: () => {},
  themes: THEMES,
  themeLabels: THEME_LABELS,
  themeIcons: THEME_ICONS,
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  return ctx ?? defaultTheme;
}
