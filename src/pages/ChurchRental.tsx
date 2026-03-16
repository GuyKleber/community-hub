import Layout from "@/components/Layout";

const ChurchRental = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Church Rental
          </h2>

          <div className="section-divider" />

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Philomath Community Church is available for rental for weddings,
            receptions, meetings, and other community events. Our facility
            offers a welcoming space for your special occasion.
          </p>

          <div className="text-left space-y-6 max-w-2xl mx-auto pt-4">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-2">Facility Details</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our church building includes a main sanctuary, fellowship hall,
                and kitchen facilities. Please contact us for availability and
                pricing information.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-4">
            For rental inquiries, please contact us at{" "}
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

export default ChurchRental;
