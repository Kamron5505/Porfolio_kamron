"use client";

import { useState, useCallback, useEffect } from "react";
import { PROJECTS } from "@/lib/constants";

export interface AdminProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
}

const STORAGE_KEY = "engineer-portfolio-projects";
const AUTH_KEY = "engineer-portfolio-auth";

function loadProjects(): AdminProject[] {
  if (typeof window === "undefined") return PROJECTS as unknown as AdminProject[];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return PROJECTS as unknown as AdminProject[];
}

function loadAuth(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function useAdminProjects() {
  const [projects, setProjects] = useState<AdminProject[]>(loadProjects);
  const [loaded] = useState(true);

  const save = useCallback((list: AdminProject[]) => {
    setProjects(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, []);

  const add = useCallback(
    (project: Omit<AdminProject, "id">) => {
      const maxId = projects.reduce((m, p) => Math.max(m, p.id), 0);
      const newProject = { ...project, id: maxId + 1 };
      save([...projects, newProject]);
      return newProject;
    },
    [projects, save]
  );

  const update = useCallback(
    (id: number, data: Partial<AdminProject>) => {
      save(projects.map((p) => (p.id === id ? { ...p, ...data } : p)));
    },
    [projects, save]
  );

  const remove = useCallback(
    (id: number) => {
      save(projects.filter((p) => p.id !== id));
    },
    [projects, save]
  );

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProjects(PROJECTS as unknown as AdminProject[]);
  }, []);

  return { projects, loaded, add, update, remove, reset };
}

export function getStoredProjects(): AdminProject[] {
  return loadProjects();
}

export function getAllProjects(): AdminProject[] {
  return loadProjects();
}

export function useAllProjects() {
  const [projects, setProjects] = useState<AdminProject[]>(loadProjects);

  useEffect(() => {
    const handler = () => {
      setProjects(loadProjects());
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return { projects, loaded: true };
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(loadAuth);

  const login = useCallback((password: string) => {
    if (password === "admin123") {
      localStorage.setItem(AUTH_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
