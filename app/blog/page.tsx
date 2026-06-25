"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { BLOG_POSTS } from "@/lib/constants";

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("blog.title")}
            subtitle={t("blog.subtitle")}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl space-y-5"
          >
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.id}
                variants={fadeUp}
                custom={i}
                className="glass-card group rounded-2xl p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 font-display text-xl group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-primary">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
