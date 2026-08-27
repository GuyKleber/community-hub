import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const WomensTea = () => {
  const { content } = useSiteContent("womensTea");

  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>

          <div className="section-divider" />

          {content.bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {paragraph}
            </p>
          ))}

          <p className="text-lg font-medium text-foreground">{content.closingText}</p>
        </article>
      </div>
    </Layout>
  );
};

export default WomensTea;
