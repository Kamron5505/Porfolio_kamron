"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Search } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useAllProjects } from "@/lib/admin/use-admin-projects";
import { GithubIcon } from "@/components/ui/icons";

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { projects } = useAllProjects();
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filtered = projects.filter((p) => {
    if (filter && !p.tags.includes(filter)) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 space-y-4"
          >
            <div className="relative mx-auto max-w-md">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder={t("projects.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setFilter(null)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  filter === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {t("projects.all")}
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(filter === tag ? null : tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    filter === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={fadeUp}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card group flex h-full flex-col rounded-2xl p-6">
                    <div className="mb-5 h-44 overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-accent/10">
                      <div className="flex h-full items-center justify-center text-5xl text-muted-foreground/30 transition-transform duration-500 group-hover:scale-110">
                        🚀
                      </div>
                    </div>

                    <h3 className="mb-2 font-display text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4 pt-3 border-t border-border">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        {t("projects.source")}
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={14} />
                        {t("projects.liveDemo")}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              {t("projects.noResults")}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
