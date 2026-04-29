import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { content } = useSiteContent("about");

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
            {content.serviceTimes.map((item) => (
              <p key={item.label} className="text-lg font-heading font-semibold text-foreground">
                {item.label} {item.value}
              </p>
            ))}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default About;
