"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Send, Mail, Sparkles, ArrowUp } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  InstagramIcon,
  type BrandIconProps,
} from "@/components/ui/icons";
import { SOCIAL_LINKS, SITE, NAV_LINKS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<BrandIconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  send: TelegramIcon,
  instagram: InstagramIcon,
  mail: Mail,
};

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border">
      {/* Top wave/gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top section with logo and scroll to top */}
        <div className="mb-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
              &lt;k/&gt;
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              {SITE.name}
            </span>
          </Link>

          <button
            onClick={scrollToTop}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 font-display text-sm font-semibold">{t("about.title")}</h3>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-4 flex gap-2">
              {SOCIAL_LINKS.map((social) => {
                const Icon = iconMap[social.icon] ?? GithubIcon;
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                    aria-label={social.name}
                  >
                    <Icon className="h-[16px] w-[16px]" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t("nav." + (link.href === "/" ? "home" : link.href.slice(1)))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 font-display text-sm font-semibold">{t("contact.title")}</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail size={14} />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/programmer_1107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Send size={14} />
                  @programmer_1107
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Sparkles size={14} />
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-border" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} {SITE.name}. {t("footer.builtWith")}.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Say &quot;Jarvis&quot; for voice control
          </div>
        </div>
      </div>
    </footer>
  );
}
