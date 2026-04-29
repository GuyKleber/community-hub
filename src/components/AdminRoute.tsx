import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAdminAuth } from "@/components/AdminAuthProvider";

export function AdminRoute({ children }: { children: ReactNode }) {
  const { user, isLoading, isAdmin } = useAdminAuth();

  if (isLoading) {
    return <div className="min-h-screen bg-background text-foreground flex items-center justify-center">Checking admin session...</div>;
  }

  if (!user) {
    return <Navigate replace to="/admin/login" />;
  }

  if (!isAdmin) {
    return <Navigate replace to="/admin/login" />;
  }

  return <>{children}</>;
}
