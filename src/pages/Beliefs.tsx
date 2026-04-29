import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const Beliefs = () => {
  const { content } = useSiteContent("beliefs");

  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>
          
          <div className="section-divider" />

          <div className="text-left space-y-6 max-w-2xl mx-auto">
            {content.beliefs.map((belief) => (
              <div key={belief.title}>
                <h3 className="font-heading text-xl text-foreground mb-2">{belief.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{belief.body}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Beliefs;
