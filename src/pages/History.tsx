import Layout from "@/components/Layout";

const History = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Our History
          </h2>
          
          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Philomath Community Church has been serving the Philomath, Oregon community
            for many years. Our congregation has grown and changed over time, but our
            commitment to following Jesus and serving our community has remained constant.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Through seasons of growth and challenge, God has been faithful to our church
            family. We are grateful for the generations of believers who have built this
            community of faith.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Today, we continue the legacy of those who came before us, seeking to be a
            light in our community and a place where all are welcome to encounter the
            love of Christ.
          </p>

          <div className="pt-4">
            <p className="text-lg font-heading text-foreground italic">
              "For I know the plans I have for you, declares the Lord, plans to prosper
              you and not to harm you, plans to give you hope and a future."
            </p>
            <p className="text-muted-foreground mt-2">— Jeremiah 29:11</p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default History;
