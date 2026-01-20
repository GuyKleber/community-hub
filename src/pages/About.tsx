import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            About Us
          </h2>
          
          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Philomath Community Church is a welcoming congregation dedicated to sharing
            the love of Christ with our community. We believe in the power of authentic
            relationships and growing together in faith.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Our church family is made up of people from all walks of life, united by
            our common faith in Jesus Christ and our desire to serve Him and one another.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We invite you to join us for worship and discover the warmth and fellowship
            of our community.
          </p>

          <div className="pt-4">
            <p className="text-lg font-heading font-semibold text-foreground">
              Join us Sundays at 10:00 AM
            </p>
            <p className="text-lg font-heading font-semibold text-foreground">
              Sunday School 11:30 AM
            </p>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default About;
