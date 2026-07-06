import { z } from "zod";

const paragraphListSchema = z.array(z.string());
const addressListSchema = z.array(z.string());
const navSectionSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const beliefSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const serviceTimeSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const eventItemSchema = z.object({
  date: z.string(),
  time: z.string().default(""),
  event: z.string(),
});

const churchRentalSectionSchema = z.object({
  title: z.string(),
});

export const siteContentSchemas = {
  siteSettings: z.object({
    churchName: z.string(),
  }),
  home: z.object({
    title: z.string(),
    invitation: z.string(),
    purpose: z.string(),
    bodyParagraphs: paragraphListSchema,
    serviceTime: z.string(),
    addressLines: addressListSchema,
    contactLabel: z.string(),
    contactEmail: z.string().email(),
    ctaLabel: z.string(),
    emailListButtonLabel: z.string().default("Add to church email list"),
    emailListButtonEmail: z.string().email().default("pccchurchoffice145@gmail.com"),
    emailListButtonSubject: z.string().default("add to PhilomathCommunity group email."),
    eventsHeading: z.string().default("Coming Events"),
    events: z.array(eventItemSchema).default([]),
  }),
  about: z.object({
    title: z.string(),
    paragraphs: paragraphListSchema,
    serviceTimes: z.array(serviceTimeSchema),
  }),
  beliefs: z.object({
    title: z.string(),
    beliefs: z.array(beliefSchema),
  }),
  missions: z.object({
    title: z.string(),
    intro: z.string(),
    sections: z.array(navSectionSchema),
    outro: z.string(),
  }),
  purpose: z.object({
    title: z.string(),
    quote: z.string(),
    sections: z.array(navSectionSchema),
  }),
  history: z.object({
    title: z.string(),
    paragraphs: paragraphListSchema,
    scriptureQuote: z.string(),
    scriptureReference: z.string(),
  }),
  calendar: z.object({
    title: z.string(),
    intro: z.string(),
    embedUrl: z.string().url(),
    publicCalendarUrl: z.string().url(),
    fallbackText: z.string(),
    fallbackLinkLabel: z.string(),
  }),
  donations: z.object({
    title: z.string(),
    intro: z.string(),
    contactText: z.string(),
    contactEmail: z.string().email(),
  }),
  churchRental: z.object({
    title: z.string(),
    paragraphs: paragraphListSchema,
    facilityTitle: z.string(),
    facilityBody: z.string(),
    gallerySections: z.array(churchRentalSectionSchema),
    inquiryText: z.string(),
    inquiryEmail: z.string().email(),
  }),
  tacoBarSignup: z.object({
    title: z.string(),
    intro: z.string(),
    formDescription: z.string(),
    tableDescription: z.string(),
  }),
} as const;

export type PageKey = keyof typeof siteContentSchemas;

type InferContentMap = {
  [K in PageKey]: z.infer<(typeof siteContentSchemas)[K]>;
};

export type SiteContentMap = InferContentMap;

export const defaultSiteContent: SiteContentMap = {
  siteSettings: {
    churchName: "Philomath Community Church",
  },
  home: {
    title: "Welcome to the website of the Philomath Community Church!",
    invitation:
      "No matter where you are in your spiritual journey, you are welcome to come and learn with us what it means to follow Jesus, while finding others to journey with!",
    purpose: "Our purpose is to love God, love people and make disciples.",
    bodyParagraphs: [
      "Each of our gatherings focuses, and is centered on the Good news of knowing and following Jesus. The Word of God is our passion: Both the written Word of God, the Bible and the Living Word of God, Jesus.",
      "Please click any tab above to learn more about this local expression of the Body of Christ.",
    ],
    serviceTime: "See you Sunday mornings at 10:00.",
    addressLines: ["PO BOX 1567", "145 North 14th Street", "Philomath, Oregon 97370"],
    contactLabel: "CONTACT INFO: To Leave a message: Please email",
    contactEmail: "ray.searose@gmail.com",
    ctaLabel: "Tithes",
    emailListButtonLabel: "Add to church email list",
    emailListButtonEmail: "pccchurchoffice145@gmail.com",
    emailListButtonSubject: "add to PhilomathCommunity group email.",
    eventsHeading: "Coming Events",
    events: [
      { date: "May 10, 2026", time: "10am-11am", event: "Church meeting" },
      { date: "May 17, 2026", time: "10am-11am", event: "Church meeting" },
      { date: "May 24, 2026", time: "10am-11am", event: "Church meeting" },
      { date: "May 31, 2026", time: "10am-11am", event: "Church meeting" },
    ],
  },
  about: {
    title: "About Us",
    paragraphs: [
      "Philomath Community Church is a welcoming congregation dedicated to sharing the love of Christ with our community. We believe in the power of authentic relationships and growing together in faith.",
      "Our church family is made up of people from all walks of life, united by our common faith in Jesus Christ and our desire to serve Him and one another.",
      "We invite you to join us for worship and discover the warmth and fellowship of our community.",
    ],
    serviceTimes: [
      { label: "Join us Sundays", value: "10:00 AM" },
      { label: "Sunday School", value: "11:30 AM" },
    ],
  },
  beliefs: {
    title: "Our Beliefs",
    beliefs: [
      {
        title: "The Bible",
        body: "We believe the Bible is the inspired Word of God, our ultimate authority for faith and practice.",
      },
      {
        title: "God",
        body: "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.",
      },
      {
        title: "Jesus Christ",
        body: "We believe in Jesus Christ, God's only Son, who lived a sinless life, died for our sins, rose from the dead, and will return in glory.",
      },
      {
        title: "Salvation",
        body: "We believe salvation is a gift from God, received through faith in Jesus Christ alone.",
      },
    ],
  },
  missions: {
    title: "Missions",
    intro:
      "At Philomath Community Church, we are committed to sharing the love of Christ both locally and around the world. We believe that every believer is called to participate in God's mission.",
    sections: [
      {
        title: "Local Outreach",
        body: "We actively serve our Philomath community through various outreach programs and partnerships with local organizations.",
      },
      {
        title: "Global Missions",
        body: "We support missionaries and mission organizations working to share the Gospel and meet practical needs around the world.",
      },
    ],
    outro:
      "If you would like to learn more about our mission efforts or how you can get involved, please contact us.",
  },
  purpose: {
    title: "Our Purpose",
    quote: "\"To love God, love people and make disciples.\"",
    sections: [
      {
        title: "Love God",
        body: "We worship God wholeheartedly, seeking to know Him more deeply through prayer, Scripture, and fellowship. Our gatherings are centered on glorifying God and experiencing His presence.",
      },
      {
        title: "Love People",
        body: "We are called to love one another as Christ has loved us. This means serving each other, caring for those in need, and building authentic relationships within our church family and community.",
      },
      {
        title: "Make Disciples",
        body: "Following Jesus' Great Commission, we are committed to helping people grow in their faith and equipping them to share the Gospel with others. We believe every believer is called to be a disciple who makes disciples.",
      },
    ],
  },
  history: {
    title: "Our History",
    paragraphs: [
      "Philomath Community Church has been serving the Philomath, Oregon community for many years. Our congregation has grown and changed over time, but our commitment to following Jesus and serving our community has remained constant.",
      "Through seasons of growth and challenge, God has been faithful to our church family. We are grateful for the generations of believers who have built this community of faith.",
      "Today, we continue the legacy of those who came before us, seeking to be a light in our community and a place where all are welcome to encounter the love of Christ.",
    ],
    scriptureQuote:
      "\"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.\"",
    scriptureReference: "Jeremiah 29:11",
  },
  calendar: {
    title: "Church Calendar",
    intro: "View our upcoming events, services, and activities.",
    embedUrl:
      "https://calendar.google.com/calendar/embed?src=pccchurchoffice145%40gmail.com&ctz=America%2FLos_Angeles",
    publicCalendarUrl:
      "https://calendar.google.com/calendar/u/0/r?cid=pccchurchoffice145%40gmail.com",
    fallbackText: "Can't see the calendar?",
    fallbackLinkLabel: "Open in Google Calendar",
  },
  donations: {
    title: "Tithes & Donations",
    intro:
      "Thank you for your generous support of Philomath Community Church. Your tithes and offerings help us continue our mission to love God, love people, and make disciples.",
    contactText: "For information on how to give, please contact us at",
    contactEmail: "ray.searose@gmail.com",
  },
  churchRental: {
    title: "Church Rental",
    paragraphs: [
      "Philomath Community Church is available for rental for weddings, receptions, meetings, and other community events. Our facility offers a welcoming space for your special occasion.",
      "Our sanctuary was built in 1907 and it sits approximately 120 adults comfortably. It is equipped with audio and video equipment. Our church bell can be rung for weddings.",
    ],
    facilityTitle: "Facility Details",
    facilityBody:
      "Our church campus includes a main sanctuary, fellowship hall, kitchen facilities and a hangar/gym. Please contact us for availability and pricing information.",
    gallerySections: [
      { title: "Outside" },
      { title: "Sanctuary" },
      { title: "Fellowship Hall" },
      { title: "Hangar" },
    ],
    inquiryText: "For rental inquiries, please contact us at",
    inquiryEmail: "segullah@mac.com",
  },
  tacoBarSignup: {
    title: "Men's Fishing Trip",
    intro:
      "Sign up with your name and the item you plan to bring. The table updates live as people add their food items.",
    formDescription: "Bring tacos, toppings, sides, drinks, or dessert.",
    tableDescription: "Everyone can see what has already been claimed.",
  },
};

export const editablePageMeta: Record<PageKey, { title: string; description: string }> = {
  siteSettings: {
    title: "Site Settings",
    description: "Header-level content that appears across the site.",
  },
  home: {
    title: "Home Page",
    description: "Landing page welcome message, address, and contact content.",
  },
  about: {
    title: "About Page",
    description: "About copy and service-time text.",
  },
  beliefs: {
    title: "Beliefs Page",
    description: "Belief statements and descriptions.",
  },
  missions: {
    title: "Missions Page",
    description: "Mission overview and sections.",
  },
  purpose: {
    title: "Purpose Page",
    description: "Purpose statement and discipleship sections.",
  },
  history: {
    title: "History Page",
    description: "Historical text and featured scripture.",
  },
  calendar: {
    title: "Calendar Page",
    description: "Calendar intro text, embed URL, and public Google Calendar link.",
  },
  donations: {
    title: "Donations Page",
    description: "Giving page messaging and contact information.",
  },
  churchRental: {
    title: "Church Rental Page",
    description: "Rental page copy and section headings.",
  },
  tacoBarSignup: {
    title: "Men's Fishing Trip Page",
    description: "Signup page intro and helper text.",
  },
};

export const pageKeys = Object.keys(siteContentSchemas) as PageKey[];

export function parsePageContent<K extends PageKey>(pageKey: K, value: unknown): SiteContentMap[K] {
  return siteContentSchemas[pageKey].parse(value);
}

export function safePageContent<K extends PageKey>(pageKey: K, value: unknown): SiteContentMap[K] {
  const parsed = siteContentSchemas[pageKey].safeParse(value);
  return parsed.success ? parsed.data : defaultSiteContent[pageKey];
}
