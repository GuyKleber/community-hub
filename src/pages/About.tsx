import Layout from "@/components/Layout";
import { useSiteContent } from "@/hooks/useSiteContent";

const About = () => {
  const { content } = useSiteContent("about");
  const { content: purposeContent } = useSiteContent("purpose");
  const { content: historyContent } = useSiteContent("history");
  const { content: beliefsContent } = useSiteContent("beliefs");

  return (
    <Layout>
      <div className="page-container">
        <div className="content-card animate-fade-in lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <aside className="mb-8 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-xl font-heading text-foreground text-center lg:text-left">On This Page</h2>
              <nav className="mt-4 flex flex-wrap justify-center gap-3 text-sm md:text-base lg:flex-col lg:items-start lg:justify-start">
                <a href="#about-overview" className="text-primary underline-offset-4 hover:underline">
                  About
                </a>
                <a href="#our-purpose" className="text-primary underline-offset-4 hover:underline">
                  Our Purpose
                </a>
                <a href="#history" className="text-primary underline-offset-4 hover:underline">
                  History
                </a>
                <a href="#beliefs" className="text-primary underline-offset-4 hover:underline">
                  Beliefs
                </a>
              </nav>
            </div>
          </aside>

          <article className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">
              {content.title}
            </h2>

            <div className="section-divider" />

            <section id="about-overview" className="space-y-6 scroll-mt-24">
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
            </section>

            <div className="section-divider" />

            <section id="our-purpose" className="space-y-6 max-w-2xl mx-auto scroll-mt-24">
              <h3 className="text-2xl font-heading text-foreground text-center">Our Purpose</h3>
              <p className="text-xl font-heading text-foreground italic">{purposeContent.quote}</p>

              <div className="text-left space-y-6">
                {purposeContent.sections.map((section) => (
                  <div key={section.title}>
                    <h4 className="font-heading text-xl text-foreground mb-2">{section.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="section-divider" />

            <section id="history" className="space-y-6 max-w-2xl mx-auto scroll-mt-24">
              <h3 className="text-2xl font-heading text-foreground text-center">History</h3>

              {historyContent.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4">
                <p className="text-lg font-heading text-foreground italic">{historyContent.scriptureQuote}</p>
                <p className="text-muted-foreground mt-2">— {historyContent.scriptureReference}</p>
              </div>
            </section>

            <div className="section-divider" />

            <section id="beliefs" className="space-y-6 max-w-2xl mx-auto scroll-mt-24">
              <h3 className="text-2xl font-heading text-foreground text-center">Beliefs</h3>

              <div className="text-left space-y-6">
                {beliefsContent.beliefs.map((belief) => (
                  <div key={belief.title}>
                    <h4 className="font-heading text-xl text-foreground mb-2">{belief.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{belief.body}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default About;
