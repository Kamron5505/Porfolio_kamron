"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/admin/use-admin-projects";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/projects");
    } else {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  return null;
}
