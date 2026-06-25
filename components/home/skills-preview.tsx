"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SKILLS } from "@/lib/constants";

const topSkills = SKILLS.frontend.slice(0, 5);

export function SkillsPreview() {
  const { t } = useTranslation();
  return (
    <Section className="bg-surface/50">
      <Container>
        <SectionHeading
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl space-y-5"
        >
          {topSkills.map((skill, i) => (
            <motion.div key={skill.name} variants={fadeUp} custom={i}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">{skill.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: i * 0.12,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
