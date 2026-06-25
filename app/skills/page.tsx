"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp } from "@/lib/motion";
import { SKILLS } from "@/lib/constants";
import { techIcons } from "@/components/ui/tech-icons";

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

const skillIconMap: Record<string, string> = {
  React: "React",
  JavaScript: "JavaScript",
  "Tailwind CSS": "Tailwind CSS",
  "Next.js": "Next.js",
  "Node.js": "Node.js",
  "Git / GitHub": "GitHub",
  Figma: "Figma",
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
                  <div className="mb-8 flex items-center gap-4">
                    <span
                      className={`h-8 w-1 rounded-full bg-gradient-to-b ${categoryColors[category]}`}
                    />
                    <h3 className="font-display text-2xl">
                      {t(categoryLabels[category])}
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILLS[category].map((skill, i) => {
                      const iconName = skillIconMap[skill.name];
                      const Icon = iconName ? techIcons[iconName] : null;

                      return (
                        <motion.div
                          key={skill.name}
                          variants={fadeUp}
                          custom={i}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <div className="glass-card group rounded-2xl p-5">
                            <div className="mb-3 flex items-center gap-3">
                              {Icon && (
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted p-1.5 transition-colors group-hover:bg-primary/10">
                                  <Icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                </span>
                              )}
                              <span className="flex-1 font-medium">{skill.name}</span>
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
                          </div>
                        </motion.div>
                      );
                    })}
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

          {/* Skills Overview Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <SectionHeading
              title={t("skills.skillsOverview")}
              subtitle="Quick overview of my technical expertise"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Frontend", value: "92%", color: "from-primary to-secondary" },
                { label: "Backend", value: "76%", color: "from-secondary to-accent" },
                { label: "Tools", value: "84%", color: "from-accent to-primary" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-2xl p-6 text-center">
                  <div className={`mb-3 mx-auto h-1 w-16 rounded-full bg-gradient-to-r ${stat.color}`} />
                  <div className="font-display text-4xl gradient-text-static">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
