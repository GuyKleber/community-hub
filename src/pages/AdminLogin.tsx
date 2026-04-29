import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { useAdminAuth } from "@/components/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";

const AdminLogin = () => {
  const { user, isLoading, isAdmin } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  if (!isLoading && user && isAdmin) {
    return <Navigate replace to="/admin" />;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setErrorMessage("We couldn't sign you in. Check the email and password, then try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage("");
    setIsGoogleSubmitting(true);

    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());

      if (result.user.email !== "guykleber1@gmail.com") {
        await signOut(auth);
        setErrorMessage("That Google account is not allowed to access the admin area.");
      }
    } catch {
      setErrorMessage("We couldn't sign you in with Google. Please try again.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Sign in with your Firebase email/password admin account to edit site content.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="admin-email">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="admin-password">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
            <Button
              className="w-full"
              disabled={isGoogleSubmitting}
              type="button"
              variant="outline"
              onClick={() => void handleGoogleSignIn()}
            >
              {isGoogleSubmitting ? "Opening Google..." : "Sign In with Google"}
            </Button>
          </form>
          {!isLoading && user && !isAdmin ? (
            <p className="mt-4 text-sm text-destructive">
              You are signed in as {user.email}, but that account is not on the admin allowlist.
            </p>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
