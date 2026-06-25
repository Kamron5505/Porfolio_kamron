"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Award, ExternalLink, Calendar, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { CERTIFICATES } from "@/lib/constants";

const certificateIcons = [Award, Shield, Award, Shield];

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
            {CERTIFICATES.map((cert, i) => {
              const IconComponent = certificateIcons[i % certificateIcons.length];
              return (
                <motion.a
                  key={cert.id}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  custom={i}
                  className="glass-card group relative flex items-start gap-4 overflow-hidden rounded-2xl p-6"
                >
                  {/* Background decoration */}
                  <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/20">
                    <IconComponent size={22} />
                  </div>

                  <div className="flex-1 relative z-10">
                    <h3 className="mb-1 font-display text-lg group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <Badge variant="outline" className="flex items-center gap-1.5">
                        <Calendar size={10} />
                        {cert.date}
                      </Badge>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/50 transition-colors group-hover:text-primary/70">
                        View Certificate
                        <ExternalLink size={10} />
                      </span>
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>


        </Container>
      </Section>
    </>
  );
}
