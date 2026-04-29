import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const Calendar = () => {
  const { content } = useSiteContent("calendar");

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground text-center">
            {content.title}
          </h2>

          <p className="text-center text-muted-foreground">
            {content.intro}
          </p>

          <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden shadow-md">
            <iframe
              src={content.embedUrl}
              className="w-full h-full border-0"
              title="Church Calendar"
              loading="lazy"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            {content.fallbackText}{" "}
            <a 
              href={content.embedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              {content.fallbackLinkLabel}
            </a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Calendar;
