import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import churchBuilding from "@/assets/church-building.png";

const Index = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="text-center space-y-6 animate-fade-in">
          {/* Welcome Message */}
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Welcome to the website of the Philomath Community Church!
          </h2>

          {/* Invitation */}
          <p className="text-lg italic text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            No matter where you are in your spiritual journey, you are welcome to come
            and learn with us what it means to follow Jesus, while finding others to
            journey with!
          </p>

          {/* Purpose Statement */}
          <p className="text-lg font-medium text-foreground">
            Our purpose is to love God, love people and make disciples.
          </p>

          {/* About Our Gatherings */}
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Each of our gatherings focuses, and is centered on the Good news of knowing
            and following Jesus. The Word of God is our passion: Both the written Word
            of God, the Bible and the Living Word of God, Jesus.
          </p>

          {/* Call to Action */}
          <p className="text-muted-foreground">
            Please click any tab above to learn more about this local expression of the
            Body of Christ.
          </p>

          <div className="section-divider" />

          {/* Service Times */}
          <p className="text-xl font-heading font-semibold text-foreground">
            See you Sunday mornings at 10:00.
          </p>

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
            <p>PO BOX 1567</p>
            <p>145 North 14th Street</p>
            <p>Philomath, Oregon 97370</p>
          </div>

          <div className="pt-4">
            <p className="font-medium text-foreground">
              CONTACT INFO:{" "}
              <span className="font-normal">
                To Leave a message: Please email{" "}
                <a
                  href="mailto:ray.searose@gmail.com"
                  className="underline hover:no-underline"
                >
                  ray.searose@gmail.com
                </a>
              </span>
            </p>
          </div>

          <div className="pt-6">
            <Button asChild size="lg">
              <Link to="/donations">Tithes</Link>
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Index;
