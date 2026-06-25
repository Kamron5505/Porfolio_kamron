"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, PanelRightClose, Home, User, Code2, FolderGit2, Briefcase, GraduationCap, Award, Mail, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

const sidebarLinks = [
  ...NAV_LINKS,
  { href: "/blog", label: "Blog" },
];

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  "/": Home,
  "/about": User,
  "/skills": Code2,
  "/projects": FolderGit2,
  "/experience": Briefcase,
  "/education": GraduationCap,
  "/certificates": Award,
  "/contact": Mail,
  "/blog": BookOpen,
};

const navLabels: Record<string, string> = {
  "/": "nav.home",
  "/about": "nav.about",
  "/skills": "nav.skills",
  "/projects": "nav.projects",
  "/experience": "nav.experience",
  "/education": "nav.education",
  "/certificates": "nav.certificates",
  "/contact": "nav.contact",
};

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Sidebar toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-20 z-40 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Open sidebar"
      >
        <PanelRightClose size={18} />
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sidebar-overlay fixed inset-0 z-[60]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-72 flex-col border-l border-border bg-sidebar shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-display text-sm font-semibold text-sidebar-foreground">
                Navigation
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-1">
                {sidebarLinks.map((link) => {
                  const active = pathname === link.href;
                  const Icon = iconMap[link.href] || Home;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                        <Icon size={16} />
                      </span>
                      <span>{t(navLabels[link.href] ?? link.label)}</span>
                      {active && (
                        <motion.div
                          layoutId="sidebar-active"
                          className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t border-border px-5 py-4">
              <p className="text-xs text-muted-foreground">
                Say &quot;Jarvis&quot; for voice control
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
