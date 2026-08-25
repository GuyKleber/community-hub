import { ChangeEvent, useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { useAdminAuth } from "@/components/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { auth, db, storage } from "@/lib/firebase";
import { defaultSiteContent, editablePageMeta, pageKeys, parsePageContent, PageKey, safePageContent } from "@/lib/siteContent";

type NewsletterUploadDraft = {
  title: string;
  date: string;
  file: File | null;
};

type ThisWeekUploadDraft = {
  section: "weeklyBulletins" | "songSheets";
  title: string;
  date: string;
  file: File | null;
};

const initialNewsletterUploadDraft: NewsletterUploadDraft = {
  title: "",
  date: "",
  file: null,
};

const initialThisWeekUploadDraft: ThisWeekUploadDraft = {
  section: "weeklyBulletins",
  title: "",
  date: "",
  file: null,
};

const allowedThisWeekExtensions = [".pdf", ".doc", ".docx", ".pages", ".ppt", ".pptx", ".key"];

const sanitizeFileName = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");

const AdminDashboard = () => {
  const { user } = useAdminAuth();
  const [drafts, setDrafts] = useState<Record<PageKey, string>>(() =>
    Object.fromEntries(
      pageKeys.map((pageKey) => [pageKey, JSON.stringify(defaultSiteContent[pageKey], null, 2)]),
    ) as Record<PageKey, string>,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [savingPage, setSavingPage] = useState<PageKey | null>(null);
  const [newsletterUpload, setNewsletterUpload] = useState<NewsletterUploadDraft>(initialNewsletterUploadDraft);
  const [isUploadingNewsletter, setIsUploadingNewsletter] = useState(false);
  const [thisWeekUpload, setThisWeekUpload] = useState<ThisWeekUploadDraft>(initialThisWeekUploadDraft);
  const [isUploadingThisWeek, setIsUploadingThisWeek] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDrafts = async () => {
      try {
        const nextEntries = await Promise.all(
          pageKeys.map(async (pageKey) => {
            const snapshot = await getDoc(doc(db, "siteContent", pageKey));
            const content = snapshot.exists()
              ? safePageContent(pageKey, snapshot.data().content)
              : defaultSiteContent[pageKey];
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

  const handleNewsletterFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setNewsletterUpload((current) => ({
      ...current,
      file,
      title: current.title || (file ? file.name.replace(/\.pdf$/i, "") : ""),
    }));
  };

  const handleNewsletterUpload = async () => {
    if (!newsletterUpload.file) {
      toast({
        title: "Choose a PDF",
        description: "Select a newsletter PDF before uploading.",
        variant: "destructive",
      });
      return;
    }

    if (newsletterUpload.file.type && newsletterUpload.file.type !== "application/pdf") {
      toast({
        title: "PDF required",
        description: "Only PDF newsletter files can be uploaded here.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploadingNewsletter(true);

      const currentContent = parsePageContent("newsletter", JSON.parse(drafts.newsletter));
      const title = newsletterUpload.title.trim() || newsletterUpload.file.name.replace(/\.pdf$/i, "");
      const date = newsletterUpload.date.trim() || new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      const safeFileName = sanitizeFileName(newsletterUpload.file.name) || `newsletter-${Date.now()}.pdf`;
      const storageRef = ref(storage, `newsletters/${Date.now()}-${safeFileName}`);

      await uploadBytes(storageRef, newsletterUpload.file, {
        contentType: "application/pdf",
      });

      const pdfUrl = await getDownloadURL(storageRef);
      const nextContent = {
        ...currentContent,
        newsletters: [
          {
            date,
            title,
            pdfUrl,
          },
          ...currentContent.newsletters,
        ],
      };

      setDrafts((current) => ({
        ...current,
        newsletter: JSON.stringify(nextContent, null, 2),
      }));
      setNewsletterUpload(initialNewsletterUploadDraft);

      toast({
        title: "PDF uploaded",
        description: "The newsletter link was added to the draft. Click Save Changes to publish it.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The PDF could not be uploaded.";
      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsUploadingNewsletter(false);
    }
  };

  const handleThisWeekFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setThisWeekUpload((current) => ({
      ...current,
      file,
      title: current.title || (file ? file.name.replace(/\.[^.]+$/i, "") : ""),
    }));
  };

  const handleThisWeekUpload = async () => {
    if (!thisWeekUpload.file) {
      toast({
        title: "Choose a file",
        description: "Select a document before uploading.",
        variant: "destructive",
      });
      return;
    }

    const lowerName = thisWeekUpload.file.name.toLowerCase();
    const hasAllowedExtension = allowedThisWeekExtensions.some((extension) => lowerName.endsWith(extension));

    if (!hasAllowedExtension) {
      toast({
        title: "File type not allowed",
        description: "Use a PDF, Word, Pages, PowerPoint, or Keynote file.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploadingThisWeek(true);

      const currentContent = parsePageContent("thisWeek", JSON.parse(drafts.thisWeek));
      const title = thisWeekUpload.title.trim() || thisWeekUpload.file.name.replace(/\.[^.]+$/i, "");
      const date = thisWeekUpload.date.trim() || new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      const safeFileName = sanitizeFileName(thisWeekUpload.file.name) || `document-${Date.now()}`;
      const storageRef = ref(storage, `this-week/${thisWeekUpload.section}/${Date.now()}-${safeFileName}`);

      await uploadBytes(storageRef, thisWeekUpload.file, {
        contentType: thisWeekUpload.file.type || "application/octet-stream",
      });

      const fileUrl = await getDownloadURL(storageRef);
      const nextItems = [
        {
          date,
          title,
          fileUrl,
        },
        ...currentContent[thisWeekUpload.section],
      ];
      const nextContent = {
        ...currentContent,
        [thisWeekUpload.section]: nextItems,
      };

      setDrafts((current) => ({
        ...current,
        thisWeek: JSON.stringify(nextContent, null, 2),
      }));
      setThisWeekUpload(initialThisWeekUploadDraft);

      toast({
        title: "Document uploaded",
        description: "The file was added to the This Week draft. Click Save Changes to publish it.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "The document could not be uploaded.";
      toast({
        title: "Upload failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsUploadingThisWeek(false);
    }
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
              {pageKey === "newsletter" ? (
                <div className="rounded-lg border border-border bg-card/60 p-4 space-y-4">
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Upload Newsletter PDF</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload a PDF to Firebase Storage and insert its link into the newsletter JSON below.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newsletter-title">Newsletter Title</Label>
                      <Input
                        id="newsletter-title"
                        value={newsletterUpload.title}
                        onChange={(event) =>
                          setNewsletterUpload((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                        placeholder="July Newsletter"
                        disabled={isUploadingNewsletter}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newsletter-date">Date Label</Label>
                      <Input
                        id="newsletter-date"
                        value={newsletterUpload.date}
                        onChange={(event) =>
                          setNewsletterUpload((current) => ({
                            ...current,
                            date: event.target.value,
                          }))
                        }
                        placeholder="July 2026"
                        disabled={isUploadingNewsletter}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newsletter-file">PDF File</Label>
                    <Input
                      id="newsletter-file"
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handleNewsletterFileChange}
                      disabled={isUploadingNewsletter}
                    />
                    <p className="text-sm text-muted-foreground">
                      {newsletterUpload.file
                        ? `Selected file: ${newsletterUpload.file.name}`
                        : "Choose a newsletter PDF to upload."}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    disabled={isLoading || isUploadingNewsletter}
                    onClick={() => void handleNewsletterUpload()}
                  >
                    {isUploadingNewsletter ? "Uploading PDF..." : "Upload PDF and Add to Draft"}
                  </Button>
                </div>
              ) : null}

              {pageKey === "thisWeek" ? (
                <div className="rounded-lg border border-border bg-card/60 p-4 space-y-4">
                  <div>
                    <h3 className="font-heading text-lg text-foreground">Upload This Week Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload weekly bulletins or song sheets and insert them into the This Week JSON below.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="this-week-section">Table</Label>
                      <select
                        id="this-week-section"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={thisWeekUpload.section}
                        onChange={(event) =>
                          setThisWeekUpload((current) => ({
                            ...current,
                            section: event.target.value as ThisWeekUploadDraft["section"],
                          }))
                        }
                        disabled={isUploadingThisWeek}
                      >
                        <option value="weeklyBulletins">Weekly Bulletins</option>
                        <option value="songSheets">Song sheets</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="this-week-title">Document Title</Label>
                      <Input
                        id="this-week-title"
                        value={thisWeekUpload.title}
                        onChange={(event) =>
                          setThisWeekUpload((current) => ({
                            ...current,
                            title: event.target.value,
                          }))
                        }
                        placeholder="September 13 Bulletin"
                        disabled={isUploadingThisWeek}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="this-week-date">Date Label</Label>
                      <Input
                        id="this-week-date"
                        value={thisWeekUpload.date}
                        onChange={(event) =>
                          setThisWeekUpload((current) => ({
                            ...current,
                            date: event.target.value,
                          }))
                        }
                        placeholder="September 13, 2026"
                        disabled={isUploadingThisWeek}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="this-week-file">Document File</Label>
                    <Input
                      id="this-week-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.pages,.key,.ppt,.pptx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                      onChange={handleThisWeekFileChange}
                      disabled={isUploadingThisWeek}
                    />
                    <p className="text-sm text-muted-foreground">
                      {thisWeekUpload.file
                        ? `Selected file: ${thisWeekUpload.file.name}`
                        : "Choose a PDF, Word, Pages, Keynote, or PowerPoint file."}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    disabled={isLoading || isUploadingThisWeek}
                    onClick={() => void handleThisWeekUpload()}
                  >
                    {isUploadingThisWeek ? "Uploading Document..." : "Upload Document and Add to Draft"}
                  </Button>
                </div>
              ) : null}

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
