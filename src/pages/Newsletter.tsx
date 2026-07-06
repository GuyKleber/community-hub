import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const Newsletter = () => {
  const { content } = useSiteContent("newsletter");

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {content.intro}
            </p>
          </div>

          {content.newsletters.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <table className="w-full border-collapse">
                <thead className="bg-secondary/60">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Newsletter</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {content.newsletters.map((item) => (
                    <tr
                      key={`${item.date}-${item.title}-${item.pdfUrl}`}
                      className="border-t border-border"
                    >
                      <td className="px-4 py-3 text-sm text-muted-foreground">{item.date}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{item.title}</td>
                      <td className="px-4 py-3 text-sm">
                        <Button asChild size="sm" variant="outline">
                          <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
                            Open PDF
                          </a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card/50 px-6 py-10 text-center text-muted-foreground">
              Newsletter PDFs will appear here once they are added in the admin editor.
            </div>
          )}
        </article>
      </div>
    </Layout>
  );
};

export default Newsletter;
