import Layout from "@/components/Layout";

const Donations = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Tithes & Donations
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Thank you for your generous support of Philomath Community Church.
            Your tithes and offerings help us continue our mission to love God,
            love people, and make disciples.
          </p>

          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            For information on how to give, please contact us at{" "}
            <a
              href="mailto:ray.searose@gmail.com"
              className="underline hover:no-underline"
            >
              ray.searose@gmail.com
            </a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Donations;
