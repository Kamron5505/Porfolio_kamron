"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAdminAuth } from "@/lib/admin/use-admin-projects";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated, login } = useAdminAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/projects");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!password.trim()) {
      setError("Enter password");
      return;
    }
    if (login(password)) {
      router.replace("/admin/projects");
    } else {
      setError("Wrong password");
    }
  };

  return (
    <Section>
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-20 max-w-sm"
        >
          <div className="glass-card rounded-2xl border border-border p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-display text-2xl">Admin Login</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter password to access admin panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Password"
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                  autoFocus
                />
                {error && (
                  <p className="mt-1.5 text-xs text-red-500">{error}</p>
                )}
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
