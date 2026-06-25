"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SKILLS } from "@/lib/constants";

const categoryLabels: Record<string, string> = {
  frontend: "skills.frontend",
  backend: "skills.backend",
  tools: "skills.tools",
};

const categoryColors: Record<string, string> = {
  frontend: "from-primary to-secondary",
  backend: "from-secondary to-accent",
  tools: "from-accent to-primary",
};

export default function SkillsPage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("skills.title")}
            subtitle={t("skills.subtitle")}
          />

          <div className="space-y-16">
            {(Object.keys(SKILLS) as Array<keyof typeof SKILLS>).map(
              (category, catIdx) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  custom={catIdx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                >
                  <h3 className="mb-8 flex items-center gap-3 font-display text-2xl">
                    <span
                      className={`h-1 w-8 rounded-full bg-gradient-to-r ${categoryColors[category]}`}
                    />
                    {t(categoryLabels[category])}
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILLS[category].map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        variants={fadeUp}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="glass-card rounded-2xl p-5"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <span className="font-medium">{skill.name}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: catIdx * 0.2 + i * 0.1,
                              ease: [0.25, 0.4, 0.25, 1],
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category]}`}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-8 text-center"
          >
            <h3 className="mb-3 font-display text-2xl">
              {t("skills.currentlyLearning")}
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              {t("skills.learningDesc")}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Rust", "WebAssembly", "Three.js", "AI/ML"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
