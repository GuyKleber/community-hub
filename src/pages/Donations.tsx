import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const Donations = () => {
  const { content } = useSiteContent("donations");

  return (
    <Layout>
      <div className="page-container">
        <article className="text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.intro}
          </p>

          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.contactText}{" "}
            <a
              href={`mailto:${content.contactEmail}`}
              className="underline hover:no-underline"
            >
              {content.contactEmail}
            </a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Donations;
