"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Download, Code2, Palette, Zap, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { techIcons } from "@/components/ui/tech-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { EXPERIENCE, EDUCATION, SKILLS } from "@/lib/constants";

export default function AboutPage() {
  const { t } = useTranslation();

  const allTechnologies = [
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Tailwind CSS" },
    { name: "Next.js" },
    { name: "Figma" },
    { name: "GitHub" },
  ];

  const whatIDo = [
    {
      icon: Code2,
      title: "High-Quality Development",
      desc: "Develop websites with top-notch quality and modern standards",
    },
    {
      icon: Palette,
      title: "Strong Design",
      desc: "Focus on elegance and attention to small details in design",
    },
    {
      icon: Zap,
      title: "SEO Optimization",
      desc: "Boost website ranking in search engine results",
    },
    {
      icon: Sparkles,
      title: "Efficiency",
      desc: "Create websites quickly and efficiently within short timeframes",
    },
  ];

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
            {/* Bio section */}
            <motion.div variants={fadeUp} custom={0} className="space-y-6">
              <div className="mx-auto aspect-square max-w-[200px] sm:max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 lg:mx-0 animate-float">
                <img
                  src="/images/avatar.png"
                  alt="Kamron Fazilov"
                  className="h-full w-full object-cover"
                />
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

            {/* Experience & Education */}
            <div className="space-y-10">
              <motion.div variants={fadeUp} custom={1}>
                <h3 className="mb-6 font-display text-2xl">{t("about.experience")}</h3>
                <div className="space-y-4">
                  {EXPERIENCE.map((exp) => (
                    <div key={exp.id} className="glass-card rounded-2xl p-5 sm:p-6">
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
                    <div key={edu.id} className="glass-card rounded-2xl p-5 sm:p-6">
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

          {/* Technologies Section (like sardoruz.vercel.app) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-24"
          >
            <SectionHeading
              title="Technologies"
              subtitle="Technologies and tools I work with"
            />

            <div className="flex flex-wrap justify-center gap-3">
              {allTechnologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="glass-card group flex items-center gap-2 rounded-xl px-3.5 py-2.5 sm:gap-2.5 sm:px-5 sm:py-3"
                >
                  {(() => {
                    const Icon = techIcons[tech.name];
                    return Icon ? <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" /> : null;
                  })()}
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* What I Can Do Section (like sardoruz.vercel.app) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-24"
          >
            <SectionHeading
              title="What I Can Do?"
              subtitle="Services and expertise I offer"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {whatIDo.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-2 font-display text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
