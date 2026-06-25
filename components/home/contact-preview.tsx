"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { fadeUp } from "@/lib/motion";

export function ContactPreview() {
  const { t } = useTranslation();

  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Mail size={28} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl">
            {t("contact.letsWorkTitle")}{" "}
            <span className="gradient-text">{t("contact.letsWorkHighlight")}</span>
          </h2>

          <p className="mt-4 text-muted-foreground sm:text-lg">
            {t("contact.letsWorkDesc")}
          </p>

          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">
                {t("hero.getInTouch")}
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
