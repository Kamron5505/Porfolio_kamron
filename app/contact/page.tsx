"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Send, Mail, MapPin, Clock } from "lucide-react";
import { GithubIcon, LinkedinIcon, TelegramIcon, InstagramIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { SOCIAL_LINKS, SITE } from "@/lib/constants";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  send: TelegramIcon,
  instagram: InstagramIcon,
  mail: Mail,
};

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch {
      alert("Failed to send message. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            title={t("contact.title")}
            subtitle={t("contact.subtitle")}
          />

          <div className="grid gap-8 lg:grid-cols-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {t("contact.name")}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                        placeholder={t("contact.namePlaceholder")}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        {t("contact.email")}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder={t("contact.emailPlaceholder")}
                        className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      {t("contact.message")}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder={t("contact.messagePlaceholder")}
                      className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={sending}
                    className="w-full sm:w-auto"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        {t("contact.sending")}
                      </span>
                    ) : sent ? (
                      t("contact.sent")
                    ) : (
                      <>
                        {t("contact.send")}
                        <Send size={14} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-4 lg:col-span-2"
            >
              <motion.div variants={fadeUp} custom={1}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("contact.email")}</p>
                      <p className="text-sm font-medium">{SITE.email}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={2}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t("contact.location")}</p>
                      <p className="text-sm font-medium">{t("contact.locationValue")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
                <div className="glass-card rounded-2xl p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t("contact.responseTime")}
                      </p>
                      <p className="text-sm font-medium">{t("contact.responseValue")}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={4}>
                <div className="glass-card rounded-2xl p-5">
                  <p className="mb-3 text-sm font-medium">{t("contact.findMe")}</p>
                  <div className="flex gap-2">
                    {SOCIAL_LINKS.map((social) => {
                      const Icon = socialIconMap[social.icon] ?? Mail;
                      return (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}
