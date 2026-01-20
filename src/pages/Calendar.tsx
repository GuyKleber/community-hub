import Layout from "@/components/Layout";

const Calendar = () => {
  // Replace this with your actual Google Calendar embed URL
  // To get the embed URL: Open Google Calendar → Settings → Select your calendar → "Integrate calendar" → Copy the embed code src URL
  const googleCalendarEmbedUrl = "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles";

  return (
    <Layout>
      <div className="page-container">
        <article className="space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground text-center">
            Church Calendar
          </h2>

          <p className="text-center text-muted-foreground">
            View our upcoming events, services, and activities.
          </p>

          <div className="w-full aspect-[4/3] md:aspect-[16/9] rounded-lg overflow-hidden shadow-md">
            <iframe
              src={googleCalendarEmbedUrl}
              className="w-full h-full border-0"
              title="Church Calendar"
              loading="lazy"
            />
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            Can't see the calendar? <a 
              href={googleCalendarEmbedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Open in Google Calendar
            </a>
          </p>
        </article>
      </div>
    </Layout>
  );
};

export default Calendar;
