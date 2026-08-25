import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const DocumentTable = ({
  heading,
  items,
  emptyText,
}: {
  heading: string;
  items: Array<{ date: string; title: string; fileUrl: string }>;
  emptyText: string;
}) => (
  <section className="space-y-4">
    <h3 className="text-2xl font-heading text-foreground">{heading}</h3>
    {items.length > 0 ? (
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-secondary/60">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Document</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Open</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={`${item.date}-${item.title}-${item.fileUrl}`} className="border-t border-border">
                <td className="px-4 py-3 text-sm text-muted-foreground">{item.date}</td>
                <td className="px-4 py-3 text-sm text-foreground">{item.title}</td>
                <td className="px-4 py-3 text-sm">
                  <Button asChild size="sm" variant="outline">
                    <a href={item.fileUrl} target="_blank" rel="noopener noreferrer">
                      Open File
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
        {emptyText}
      </div>
    )}
  </section>
);

const ThisWeek = () => {
  const { content } = useSiteContent("thisWeek");

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-heading text-foreground">
              {content.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{content.intro}</p>
          </div>

          <DocumentTable
            heading={content.weeklyBulletinsHeading}
            items={content.weeklyBulletins}
            emptyText="Weekly bulletins will appear here once they are uploaded."
          />

          <DocumentTable
            heading={content.songSheetsHeading}
            items={content.songSheets}
            emptyText="Song sheets will appear here once they are uploaded."
          />
        </article>
      </div>
    </Layout>
  );
};

export default ThisWeek;
