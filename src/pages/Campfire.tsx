import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const Campfire = () => {
  const { content } = useSiteContent("campfire");

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-6 animate-fade-in">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-xl text-foreground">{content.churchAddressLabel}</h3>
              <p className="mt-2 text-muted-foreground">{content.churchAddress}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <h3 className="font-heading text-xl text-foreground">{content.destinationAddressLabel}</h3>
              <p className="mt-2 text-muted-foreground">{content.destinationAddress}</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-md">
            <div className="aspect-[4/3] md:aspect-[16/9]">
              <iframe
                src={content.mapEmbedUrl}
                className="h-full w-full border-0"
                title="Campfire directions map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg">
              <a href={content.directionsUrl} target="_blank" rel="noopener noreferrer">
                Open Directions
              </a>
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Campfire;
