"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { CERTIFICATES } from "@/lib/constants";

export default function CertificatesPage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("certificates.title")}
            subtitle={t("certificates.subtitle")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2"
          >
            {CERTIFICATES.map((cert, i) => (
              <motion.a
                key={cert.id}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                custom={i}
                className="glass-card group flex items-start gap-4 rounded-2xl p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Award size={22} />
                </div>

                <div className="flex-1">
                  <h3 className="mb-1 font-display text-lg group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="outline">{cert.date}</Badge>
                    <ExternalLink
                      size={12}
                      className="text-muted-foreground/50"
                    />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
