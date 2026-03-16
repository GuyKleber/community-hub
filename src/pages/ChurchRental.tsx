import Layout from "@/components/Layout";
import outside1 from "@/assets/rental-outside-1.jpeg";
import outside2 from "@/assets/rental-outside-2.jpeg";
import outside3 from "@/assets/rental-outside-3.jpeg";
import fellowshipKitchen from "@/assets/rental-fellowship-kitchen.jpeg";
import fellowshipSeating from "@/assets/rental-fellowship-seating.jpeg";
import sanctuaryBack from "@/assets/rental-sanctuary-back.jpeg";
import sanctuaryFront from "@/assets/rental-sanctuary-front.jpeg";
import hangar from "@/assets/rental-hangar.jpeg";

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

          {/* Outside Section */}
          <div className="pt-6">
            <h3 className="font-heading text-xl text-foreground mb-4">Outside</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <img src={outside1} alt="Church exterior view" className="w-full h-64 object-cover rounded-lg" />
              <img src={outside2} alt="Church side view" className="w-full h-64 object-cover rounded-lg" />
              <img src={outside3} alt="Church front entrance" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>

          {/* Sanctuary Section */}
          <div className="pt-6">
            <h3 className="font-heading text-xl text-foreground mb-4">Sanctuary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img src={sanctuaryBack} alt="Sanctuary view from back" className="w-full h-64 object-cover rounded-lg" />
              <img src={sanctuaryFront} alt="Sanctuary view from front" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>

          {/* Fellowship Hall Section */}
          <div className="pt-6">
            <h3 className="font-heading text-xl text-foreground mb-4">Fellowship Hall</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img src={fellowshipKitchen} alt="Fellowship hall kitchen" className="w-full h-64 object-cover rounded-lg" />
              <img src={fellowshipSeating} alt="Fellowship hall seating area" className="w-full h-64 object-cover rounded-lg" />
            </div>
          </div>

          {/* Hangar Section */}
          <div className="pt-6">
            <h3 className="font-heading text-xl text-foreground mb-4">Hangar</h3>
            <div className="max-w-2xl mx-auto">
              <img src={hangar} alt="Hangar interior" className="w-full h-72 object-cover rounded-lg" />
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto pt-4">
            For rental inquiries, please contact us at{" "}
            <a
              href="mailto:segullah@mac.com"
              className="underline hover:no-underline"
            >
              segullah@mac.com
            </a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default ChurchRental;
