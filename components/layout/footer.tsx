"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Send, Mail } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  InstagramIcon,
  type BrandIconProps,
} from "@/components/ui/icons";
import { SOCIAL_LINKS, SITE } from "@/lib/constants";

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

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12">
        <div className="flex gap-2">
          {SOCIAL_LINKS.map((social) => {
            const Icon = iconMap[social.icon] ?? GithubIcon;
            return (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                aria-label={social.name}
              >
                <Icon className="h-[18px] w-[18px]" />
              </Link>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {[
            { href: "/about", label: t("nav.about") },
            { href: "/projects", label: t("nav.projects") },
            { href: "/contact", label: t("nav.contact") },
            { href: "/admin", label: "Admin" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          © {year} {SITE.name}. {t("footer.builtWith")}.
        </p>
      </div>
    </footer>
  );
}
