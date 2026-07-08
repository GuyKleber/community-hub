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

          {content.videoTitle && content.videoUrl ? (
            <div className="max-w-2xl mx-auto pt-2">
              <a
                href={content.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-border bg-card shadow-md hover:shadow-lg transition-shadow"
                aria-label={content.videoTitle}
              >
                <div className="relative aspect-video overflow-hidden bg-[linear-gradient(135deg,hsl(var(--nav-bg))_0%,hsl(var(--primary))_45%,hsl(var(--accent))_100%)]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_30%)]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/92 shadow-lg transition-transform group-hover:scale-105">
                      <div className="ml-1 h-0 w-0 border-y-[14px] border-y-transparent border-l-[22px] border-l-[hsl(var(--nav-bg))]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-heading text-white md:text-2xl">
                        {content.videoTitle}
                      </p>
                      <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/85">
                        Watch on Facebook
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ) : null}
        </article>
      </div>
    </Layout>
  );
};

export default Missions;
