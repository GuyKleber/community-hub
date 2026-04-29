import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const History = () => {
  const { content } = useSiteContent("history");

  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>
          
          <div className="section-divider" />

          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {paragraph}
            </p>
          ))}

          <div className="pt-4">
            <p className="text-lg font-heading text-foreground italic">{content.scriptureQuote}</p>
            <p className="text-muted-foreground mt-2">— {content.scriptureReference}</p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default History;
