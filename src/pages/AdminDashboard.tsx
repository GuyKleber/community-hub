import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { useAdminAuth } from "@/components/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { auth, db } from "@/lib/firebase";
import { defaultSiteContent, editablePageMeta, pageKeys, parsePageContent, PageKey } from "@/lib/siteContent";

const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [drafts, setDrafts] = useState<Record<PageKey, string>>(() =>
    Object.fromEntries(
      pageKeys.map((pageKey) => [pageKey, JSON.stringify(defaultSiteContent[pageKey], null, 2)]),
    ) as Record<PageKey, string>,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [savingPage, setSavingPage] = useState<PageKey | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadDrafts = async () => {
      try {
        const nextEntries = await Promise.all(
          pageKeys.map(async (pageKey) => {
            const snapshot = await getDoc(doc(db, "siteContent", pageKey));
            const content = snapshot.exists() ? snapshot.data().content : defaultSiteContent[pageKey];
            return [pageKey, JSON.stringify(content, null, 2)] as const;
          }),
        );

        if (isMounted) {
          setDrafts(Object.fromEntries(nextEntries) as Record<PageKey, string>);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadDrafts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (pageKey: PageKey) => {
    try {
      setSavingPage(pageKey);
      const parsedJson = JSON.parse(drafts[pageKey]);
      const validatedContent = parsePageContent(pageKey, parsedJson);

      await setDoc(
        doc(db, "siteContent", pageKey),
        {
          content: validatedContent,
          updatedAt: serverTimestamp(),
          updatedBy: user?.uid ?? null,
          updatedByEmail: user?.email ?? null,
        },
        { merge: true },
      );

      setDrafts((current) => ({
        ...current,
        [pageKey]: JSON.stringify(validatedContent, null, 2),
      }));

      toast({
        title: "Saved",
        description: `${editablePageMeta[pageKey].title} is updated.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The content could not be saved.";
      toast({
        title: "Save failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSavingPage(null);
    }
  };

  const handleReset = (pageKey: PageKey) => {
    setDrafts((current) => ({
      ...current,
      [pageKey]: JSON.stringify(defaultSiteContent[pageKey], null, 2),
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-heading">Admin Content Editor</h1>
            <p className="text-muted-foreground">
              Signed in as {user?.email}. Edit the JSON for each page and save when ready.
            </p>
          </div>
          <Button variant="outline" onClick={() => void signOut(auth)}>
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl">How This Works</CardTitle>
            <CardDescription>
              Each box below stores the live content for a page in Firestore. Keep the JSON structure intact and only change the values.
            </CardDescription>
          </CardHeader>
        </Card>

        {pageKeys.map((pageKey) => (
          <Card key={pageKey}>
            <CardHeader>
              <CardTitle className="font-heading text-xl">{editablePageMeta[pageKey].title}</CardTitle>
              <CardDescription>{editablePageMeta[pageKey].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                className="min-h-[22rem] font-mono text-sm"
                value={drafts[pageKey]}
                onChange={(event) =>
                  setDrafts((current) => ({
                    ...current,
                    [pageKey]: event.target.value,
                  }))
                }
                disabled={isLoading}
              />
              <div className="flex flex-wrap gap-3">
                <Button disabled={isLoading || savingPage === pageKey} onClick={() => void handleSave(pageKey)}>
                  {savingPage === pageKey ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" onClick={() => handleReset(pageKey)}>
                  Reset to Default JSON
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
