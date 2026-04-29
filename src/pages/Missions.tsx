import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const Missions = () => {
  const { content } = useSiteContent("missions");

  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>
          
          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.intro}
          </p>

          <div className="text-left space-y-6 max-w-2xl mx-auto pt-4">
            {content.sections.map((section) => (
              <div key={section.title}>
                <h3 className="font-heading text-xl text-foreground mb-2">{section.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-4">
            {content.outro}
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Missions;
