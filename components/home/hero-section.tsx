"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { SITE } from "@/lib/constants";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-gradient" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-6xl px-6 py-20"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            {t("hero.badge")}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="mt-4 max-w-4xl font-display text-6xl leading-[1] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]"
        >
          {t("hero.greeting")}{" "}
          <span className="gradient-text">{t("hero.name")}</span>
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          custom={2}
          className="mt-3 max-w-3xl font-display text-2xl font-normal text-muted-foreground sm:text-3xl md:text-4xl"
        >
          <span className="text-foreground">{t("hero.role")}</span> {t("hero.roleSuffix")}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {SITE.description}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href="/projects">
            <Button size="lg">
              {t("hero.viewProjects")}
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              {t("hero.getInTouch")}
            </Button>
          </Link>
          <Button variant="ghost" size="lg">
            <Download size={16} />
            {t("hero.resume")}
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={5}
          className="mt-20 flex gap-12 border-t border-border pt-8"
        >
          {[
            { value: "1+", label: t("hero.yearsExp") },
            { value: "10+", label: t("hero.projectsBuilt") },
            { value: "3+", label: t("hero.technologies") },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-3xl font-normal sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
