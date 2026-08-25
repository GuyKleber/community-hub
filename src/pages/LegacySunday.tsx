import Layout from "@/components/Layout";

const legacySundayParagraphs = [
  "September 20, 2026, Philomath Community Church's Legacy Sunday.",
  "Come celebrate the legacy of Philomath Community Church. Old and new members will gather to reflect on the influence of PCC in our community over the years. There will be a short presentation on the history of the church, followed by recollections of past members. After, we will meet in the fellowship hall to share a chicken dinner. The formation of Philomath College was planned by the initial PCC body over a chicken dinner.",
  "Philomath Community Church was founded by families from the Midwest who responded to the call from settlers in the Willamette Valley to form a church. Sixty people responded. They sold homes, bought wagons, and said goodbye to family and friends and embarked on a 2000 mile journey on foot to Oregon. They found their way to Corvallis and scurried to claim the remaining plots of land; some settled as far as Alsea or on the slopes of Mary's Peak. The first church meeting was in a school house on Mount Union, since demoted to Neabeack Hill. The first two churches burnt to the ground. The body persisted and in 1907 built the church we now occupy.",
  "The foyer in the church has pictures of large Sunday School classes, youth groups, and well dressed families. Come share your memories, and see how the church continues to carry the torch of Jesus' love to our community of Philomath.",
];

const LegacySunday = () => {
  return (
    <Layout>
      <div className="page-container">
        <article className="content-card text-center space-y-6 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-heading text-foreground">
            Legacy Sunday
          </h2>

          <div className="section-divider" />

          {legacySundayParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </Layout>
  );
};

export default LegacySunday;
