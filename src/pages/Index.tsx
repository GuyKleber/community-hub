import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import churchBuilding from "@/assets/church-building.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const Index = () => {
  const { content } = useSiteContent("home");
  const emailListHref = `mailto:${content.emailListButtonEmail}?subject=${encodeURIComponent(content.emailListButtonSubject)}`;

  return (
    <Layout>
      <div className="page-container">
        <article className="text-center space-y-6 animate-fade-in">
          {/* Welcome Message */}
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            {content.title}
          </h2>

          {/* Invitation */}
          <p className="text-lg italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {content.invitation}
          </p>

          {/* Purpose Statement */}
          <p className="text-lg font-medium text-foreground">{content.purpose}</p>

          {content.bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {paragraph}
            </p>
          ))}

          <div className="section-divider" />

          {/* Service Times */}
          <p className="text-xl font-heading font-semibold text-foreground">{content.serviceTime}</p>

          {content.events.length > 0 ? (
            <section className="max-w-2xl mx-auto pt-4 space-y-4">
              <h3 className="text-2xl font-heading text-foreground">{content.eventsHeading}</h3>
              <div className="overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm">
                <table className="w-full border-collapse">
                  <thead className="bg-secondary/60">
                    <tr>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Date</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Time</th>
                      <th className="px-4 py-3 text-sm font-semibold text-foreground">Event</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.events.map((item) => (
                      <tr key={`${item.date}-${item.time}-${item.event}`} className="border-t border-border">
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.time}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{item.event}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {/* Church Image */}
          <div className="max-w-md mx-auto pt-6">
            <img
              src={churchBuilding}
              alt="Philomath Community Church"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Contact Information */}
          <div className="pt-8 space-y-2 text-muted-foreground">
            {content.addressLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="pt-4">
            <p className="font-medium text-foreground">
              <span className="font-normal">
                {content.contactLabel}{" "}
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="underline hover:no-underline"
                >
                  {content.contactEmail}
                </a>
              </span>
            </p>
          </div>

          <div className="pt-6">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/donations">{content.ctaLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={emailListHref}>{content.emailListButtonLabel}</a>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Index;
