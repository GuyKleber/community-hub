import Layout from "@/components/Layout";

const Missions = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Missions
          </h2>
          
          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            At Philomath Community Church, we are committed to sharing the love of
            Christ both locally and around the world. We believe that every believer
            is called to participate in God's mission.
          </p>

          <div className="text-left space-y-6 max-w-2xl mx-auto pt-4">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Local Outreach</h3>
              <p className="text-muted-foreground leading-relaxed">
                We actively serve our Philomath community through various outreach
                programs and partnerships with local organizations.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Global Missions</h3>
              <p className="text-muted-foreground leading-relaxed">
                We support missionaries and mission organizations working to share the
                Gospel and meet practical needs around the world.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-4">
            If you would like to learn more about our mission efforts or how you can
            get involved, please contact us.
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Missions;
