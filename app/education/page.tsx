"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EDUCATION } from "@/lib/constants";

export default function EducationPage() {
  const { t } = useTranslation();

  const totalDuration = EDUCATION.reduce((acc, edu) => {
    const match = edu.period.match(/(\d{4})/g);
    if (match && match.length >= 2) {
      return acc + (parseInt(match[1]) - parseInt(match[0]));
    }
    return acc + 1;
  }, 0);

  // Skills mastered across all education entries
  const skillKeywords = ["Frontend", "Web", "React", "JavaScript", "CSS", "HTML", "Development", "Design"];

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("education.title")}
            subtitle={t("education.subtitle")}
          />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 grid gap-4 sm:grid-cols-3"
          >
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="font-display text-3xl gradient-text-static">{EDUCATION.length}</div>
              <div className="mt-1 text-xs text-muted-foreground">Institutions</div>
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="font-display text-3xl gradient-text-static">{totalDuration}+</div>
              <div className="mt-1 text-xs text-muted-foreground">Years Learning</div>
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="font-display text-3xl gradient-text-static">
                {skillKeywords.length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Skills Mastered</div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl"
          >
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-0 h-full w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />

              <div className="space-y-8">
                {EDUCATION.map((edu, i) => (
                  <motion.div
                    key={edu.id}
                    variants={fadeUp}
                    custom={i}
                    className="relative pl-14"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[15px] top-6 flex h-[18px] w-[18px] items-center justify-center">
                      <div className="h-full w-full rounded-full border-2 border-primary bg-background" />
                      <div className="absolute h-2 w-2 rounded-full bg-primary animate-pulse" />
                    </div>

                    <div className="glass-card group rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-primary/30">
                      <div                      className="mb-3 flex-col sm:flex-row items-start gap-3 sm:gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                            {i === 0 ? <GraduationCap size={20} /> : <BookOpen size={20} />}
                          </div>
                          <div>
                            <h3 className="font-display text-xl group-hover:text-primary transition-colors">
                              {edu.degree}
                            </h3>
                            <p className="text-sm text-primary">{edu.institution}</p>
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full border border-border bg-muted/50 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
                        {edu.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Currently Learning */}
            <motion.div
              variants={fadeUp}
              custom={EDUCATION.length}
              className="mt-10 pl-14"
            >
              <div className="glass-card rounded-2xl border-dashed border-primary/30 p-6 text-center">
                <div className="mb-2 flex items-center justify-center gap-2 text-sm text-primary">
                  <Sparkles size={14} />
                  <span className="font-medium">Always Learning</span>
                  <Sparkles size={14} />
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently expanding knowledge in modern web technologies and best practices
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
