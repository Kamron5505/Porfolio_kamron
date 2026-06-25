"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Code2, Palette, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const features = [
  {
    icon: Code2,
    titleKey: "about.feature1Title",
    descKey: "about.feature1Desc",
  },
  {
    icon: Palette,
    titleKey: "about.feature2Title",
    descKey: "about.feature2Desc",
  },
  {
    icon: Zap,
    titleKey: "about.feature3Title",
    descKey: "about.feature3Desc",
  },
];

export function AboutPreview() {
  const { t } = useTranslation();
  return (
    <Section>
      <Container>
        <SectionHeading
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-5 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div key={feature.titleKey} variants={fadeUp} custom={i}>
              <div className="glass-card rounded-2xl p-6 h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-display text-xl">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(feature.descKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
