import Layout from "@/components/Layout";

const Purpose = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Our Purpose
          </h2>
          
          <div className="section-divider" />

          <p className="text-xl font-heading text-foreground italic">
            "To love God, love people and make disciples."
          </p>

          <div className="text-left space-y-6 max-w-2xl mx-auto pt-4">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Love God</h3>
              <p className="text-muted-foreground leading-relaxed">
                We worship God wholeheartedly, seeking to know Him more deeply through
                prayer, Scripture, and fellowship. Our gatherings are centered on
                glorifying God and experiencing His presence.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Love People</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are called to love one another as Christ has loved us. This means
                serving each other, caring for those in need, and building authentic
                relationships within our church family and community.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Make Disciples</h3>
              <p className="text-muted-foreground leading-relaxed">
                Following Jesus' Great Commission, we are committed to helping people
                grow in their faith and equipping them to share the Gospel with others.
                We believe every believer is called to be a disciple who makes disciples.
              </p>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Purpose;
