"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  ExternalLink,
  X,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { useAdminAuth, useAdminProjects, type AdminProject } from "@/lib/admin/use-admin-projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, Section } from "@/components/ui/container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  tags: "",
  github: "",
  demo: "",
};

type FormData = typeof emptyForm;

export default function AdminProjectsPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAdminAuth();
  const { projects, add, update, remove, reset } = useAdminProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  if (!isAuthenticated) {
    router.replace("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    router.replace("/admin/login");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const openEdit = (p: AdminProject) => {
    setForm({
      title: p.title,
      description: p.description,
      image: p.image,
      tags: p.tags.join(", "),
      github: p.github,
      demo: p.demo,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image.trim() || "/projects/project-placeholder.jpg",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      github: form.github.trim() || "#",
      demo: form.demo.trim() || "#",
    };

    if (editingId) {
      update(editingId, data);
    } else {
      add(data);
    }
    resetForm();
  };

  return (
    <Section>
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl">Admin Panel</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all projects to defaults? Custom projects will be lost."
                  )
                ) {
                  reset();
                }
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => setShowForm(true)}>
              <Plus size={14} />
              Add Project
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              Logout
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl border border-border p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-xl">
                    {editingId ? "Edit Project" : "New Project"}
                  </h2>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="Project Name"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Description
                    </label>
                    <textarea
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      rows={3}
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="Describe your project..."
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) =>
                        setForm({ ...form, image: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="/projects/project.jpg"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) =>
                        setForm({ ...form, tags: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="React, Tailwind, Firebase"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={form.github}
                      onChange={(e) =>
                        setForm({ ...form, github: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted-foreground">
                      Demo URL
                    </label>
                    <input
                      type="text"
                      value={form.demo}
                      onChange={(e) =>
                        setForm({ ...form, demo: e.target.value })
                      }
                      className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                      placeholder="https://demo.vercel.app"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    {editingId ? "Save Changes" : "Add Project"}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              layout
              className="glass-card group relative rounded-2xl border border-border p-5"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-display text-lg">{project.title}</h3>
                <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEdit(project)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(project.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  <GithubIcon className="h-3 w-3" />
                  Code
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  <ExternalLink size={12} />
                  Demo
                </a>
              </div>

              <AnimatePresence>
                {confirmDelete === project.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/90 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <p className="mb-3 text-sm font-medium">
                        Delete this project?
                      </p>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setConfirmDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => {
                            remove(project.id);
                            setConfirmDelete(null);
                          }}
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
