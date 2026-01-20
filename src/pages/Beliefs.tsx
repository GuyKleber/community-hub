import Layout from "@/components/Layout";

const Beliefs = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Our Beliefs
          </h2>
          
          <div className="section-divider" />

          <div className="text-left space-y-6 max-w-2xl mx-auto">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">The Bible</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe the Bible is the inspired Word of God, our ultimate authority
                for faith and practice.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">God</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in one God, eternally existing in three persons: Father, Son,
                and Holy Spirit.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Jesus Christ</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe in Jesus Christ, God's only Son, who lived a sinless life,
                died for our sins, rose from the dead, and will return in glory.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Salvation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe salvation is a gift from God, received through faith in Jesus
                Christ alone.
              </p>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Beliefs;
