import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

import Layout from "@/components/Layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";

type SignupEntry = {
  id: string;
  name: string;
  bringing: string;
};

const tacoBarCollection = collection(db, "tacoBarSignups");

const TacoBarSignup = () => {
  const [name, setName] = useState("");
  const [bringing, setBringing] = useState("");
  const [entries, setEntries] = useState<SignupEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const signupQuery = query(tacoBarCollection, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      signupQuery,
      (snapshot) => {
        setEntries(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: String(doc.data().name ?? ""),
            bringing: String(doc.data().bringing ?? ""),
          })),
        );
        setLoadError(null);
        setIsLoading(false);
      },
      () => {
        setLoadError("We couldn't load the signup list right now. Please try again in a moment.");
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedBringing = bringing.trim();

    if (!trimmedName || !trimmedBringing) {
      toast({
        title: "Missing information",
        description: "Please enter both your name and what you're bringing.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      await addDoc(tacoBarCollection, {
        name: trimmedName,
        bringing: trimmedBringing,
        createdAt: serverTimestamp(),
      });

      setName("");
      setBringing("");

      toast({
        title: "Signed up",
        description: "Your Taco Bar item has been added to the list.",
      });
    } catch {
      toast({
        title: "Signup failed",
        description: "We couldn't save your signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">
              Taco Bar Signup
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sign up with your name and the item you plan to bring. The table updates live as people add their food items.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,22rem)_1fr]">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl">Add Your Signup</CardTitle>
                <CardDescription>
                  Bring tacos, toppings, sides, drinks, or dessert.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="signup-name">
                      Name
                    </label>
                    <Input
                      id="signup-name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="signup-bringing">
                      Bringing
                    </label>
                    <Input
                      id="signup-bringing"
                      value={bringing}
                      onChange={(event) => setBringing(event.target.value)}
                      placeholder="Chips, salsa, ground beef..."
                    />
                  </div>

                  <Button className="w-full" disabled={isSaving} type="submit">
                    {isSaving ? "Saving..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-xl">Current Signups</CardTitle>
                <CardDescription>
                  Everyone can see what has already been claimed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadError ? (
                  <Alert variant="destructive">
                    <AlertTitle>Signup list unavailable</AlertTitle>
                    <AlertDescription>{loadError}</AlertDescription>
                  </Alert>
                ) : null}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Bringing</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">{entry.name}</TableCell>
                        <TableCell>{entry.bringing}</TableCell>
                      </TableRow>
                    ))}
                    {!isLoading && entries.length === 0 ? (
                      <TableRow>
                        <TableCell className="text-muted-foreground" colSpan={2}>
                          No one has signed up yet. Be the first.
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {isLoading ? (
                      <TableRow>
                        <TableCell className="text-muted-foreground" colSpan={2}>
                          Loading signups...
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default TacoBarSignup;
