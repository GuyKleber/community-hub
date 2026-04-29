import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { defaultSiteContent, PageKey, safePageContent, SiteContentMap } from "@/lib/siteContent";

export function useSiteContent<K extends PageKey>(pageKey: K) {
  const [content, setContent] = useState<SiteContentMap[K]>(defaultSiteContent[pageKey]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadContent = async () => {
      try {
        const snapshot = await getDoc(doc(db, "siteContent", pageKey));

        if (!isMounted) {
          return;
        }

        if (!snapshot.exists()) {
          setContent(defaultSiteContent[pageKey]);
          return;
        }

        setContent(safePageContent(pageKey, snapshot.data().content));
      } catch {
        if (isMounted) {
          setContent(defaultSiteContent[pageKey]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadContent();

    return () => {
      isMounted = false;
    };
  }, [pageKey]);

  return { content, isLoading };
}
