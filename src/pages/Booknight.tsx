import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import booknightCover from "@/assets/booknight-cover.png";

const Booknight = () => {
  const { content } = useSiteContent("booknight");

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">
              {content.title}
            </h2>
          </div>

          <div className="space-y-4 text-center max-w-3xl mx-auto">
            {content.bodyParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <img
              src={booknightCover}
              alt="The Practice of the Presence of God with Spiritual Maxims book cover"
              className="w-full rounded-lg border border-border shadow-md"
            />
          </div>

          <blockquote className="max-w-3xl mx-auto rounded-lg border border-border bg-card px-6 py-8 text-center text-lg italic leading-relaxed text-foreground shadow-sm">
            "{content.quote}"
          </blockquote>

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <a href={content.linkUrl} target="_blank" rel="noopener noreferrer">
                {content.linkLabel}
              </a>
            </Button>
          </div>

          <p className="text-center text-muted-foreground">
            {content.pdfLabel}{" "}
            <a
              href={content.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Open PDF
            </a>
          </p>

          <p className="text-center text-lg font-medium text-foreground">
            {content.closingText}
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Booknight;
