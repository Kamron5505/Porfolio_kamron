"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        // Slow down as it approaches 100
        const increment = Math.max(1, (100 - prev) * 0.08);
        return Math.min(100, prev + increment);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Animated background gradient */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-br from-secondary/10 via-accent/5 to-primary/10 blur-3xl"
            />
          </div>

          {/* Logo / Initial */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 mb-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0,212,255,0.3)",
                  "0 0 40px rgba(0,212,255,0.5)",
                  "0 0 20px rgba(0,212,255,0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent"
            >
              <span className="font-mono text-2xl font-bold text-white">
                &lt;k/&gt;
              </span>
            </motion.div>
          </motion.div>

          {/* Loading text */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 mb-6 text-sm text-muted-foreground"
          >
            {t("loader.text")}
          </motion.p>

          {/* Progress bar */}
          <div className="relative z-10 h-1 w-48 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ width: `${progress}%` }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Dots */}
          <div className="relative z-10 mt-6 flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full bg-primary"
              />
            ))}
          </div>

          {/* Progress percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 mt-4 font-mono text-xs text-muted-foreground"
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
