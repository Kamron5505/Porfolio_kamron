"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EXPERIENCE } from "@/lib/constants";

export default function ExperiencePage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("experience.title")}
            subtitle={t("experience.subtitle")}
          />

          <div className="mx-auto max-w-3xl space-y-8">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl">{exp.role}</h3>
                      <p className="text-sm text-primary">{exp.company}</p>
                    </div>
                  </div>
                  <Badge variant="primary">{exp.period}</Badge>
                </div>

                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("experience.keyAchievements")}
                  </p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
