"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EDUCATION } from "@/lib/constants";

export default function EducationPage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("education.title")}
            subtitle={t("education.subtitle")}
          />

          <div className="mx-auto max-w-2xl space-y-8">
            {EDUCATION.map((edu, i) => (
              <motion.div
                key={edu.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative pl-8"
              >
                {i < EDUCATION.length - 1 && (
                  <div className="absolute left-[11px] top-10 h-[calc(100%+2rem)] w-px bg-gradient-to-b from-primary/50 to-transparent" />
                )}

                <div className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl">{edu.degree}</h3>
                        <p className="text-sm text-primary">{edu.institution}</p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
