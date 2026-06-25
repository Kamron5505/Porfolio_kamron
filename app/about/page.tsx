"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EXPERIENCE, EDUCATION } from "@/lib/constants";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("about.title")}
            subtitle={t("about.subtitle")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-2"
          >
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <div className="mx-auto aspect-square max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 lg:mx-0">
                <div className="flex h-full flex-col items-center justify-center text-6xl">
                  <span>👨‍💻</span>
                  <span className="mt-2 text-sm font-medium text-primary">{t("common.marsSchool")}</span>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("about.bio1")}</p>
                <p>{t("about.bio2")}</p>
                <p>{t("about.bio3")}</p>
              </div>

              <Button variant="outline" size="lg">
                <Download size={16} />
                {t("about.downloadResume")}
              </Button>
            </motion.div>

            <div className="space-y-10">
              <motion.div variants={fadeUp} custom={1}>
                <h3 className="mb-6 font-display text-2xl">{t("about.experience")}</h3>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.id} className="glass-card rounded-2xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{exp.role}</h4>
                          <p className="text-sm text-primary">{exp.company}</p>
                        </div>
                        <Badge variant="primary">{exp.period}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {exp.description}
                      </p>
                      <ul className="mt-3 space-y-1">
                        {exp.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <h3 className="mb-6 font-display text-2xl">{t("about.education")}</h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu) => (
                    <div key={edu.id} className="glass-card rounded-2xl p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{edu.degree}</h4>
                          <p className="text-sm text-primary">
                            {edu.institution}
                          </p>
                        </div>
                        <Badge variant="accent">{edu.period}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
