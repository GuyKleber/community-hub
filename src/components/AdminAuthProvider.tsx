import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

type AdminAuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
};

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const ADMIN_EMAILS = ["guykleber1@gmail.com", "pccchurchoffice145@gmail.com"];

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: !!user?.email && ADMIN_EMAILS.includes(user.email),
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }

  return context;
}
