"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { useAllProjects } from "@/lib/admin/use-admin-projects";
import { GithubIcon } from "@/components/ui/icons";

export function ProjectsPreview() {
  const { t } = useTranslation();
  const { projects } = useAllProjects();
  const featuredProjects = projects.slice(0, 3);
  return (
    <Section>
      <Container>
        <SectionHeading
          title={t("projects.featured")}
          subtitle={t("projects.featuredSubtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project, i) => (
            <motion.div key={project.id} variants={fadeUp} custom={i}>
              <div className="glass-card group flex h-full flex-col rounded-2xl p-6">
                <div className="mb-5 h-44 overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-accent/10">
                  <div className="flex h-full items-center justify-center text-4xl text-muted-foreground/30 transition-transform duration-500 group-hover:scale-110">
                    🚀
                  </div>
                </div>

                <h3 className="mb-2 font-display text-xl group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
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
                    {t("projects.code")}
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={14} />
                    {t("projects.demo")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            {t("projects.viewAll")}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
