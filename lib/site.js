export const SITE = {
  name: "Mortgage Helpline",
  domain: "mortgagehelpline.com",
  url: "https://www.mortgagehelpline.com",
  tagline: "Straight answers for your mortgage",
  description:
    "Free, unbiased mortgage help for Canada, the USA and India — penalties, renewals, refinancing, home equity, servicer problems and hardship. Full answers first, live rates updated daily.",
  adsenseClient: "ca-pub-6620975821265271",
  sponsorUrl: "https://web.works/contact",
  sponsorText:
    "Contact, if you are interested in this website / domain name / sponsorship / advertisement / partnership",
  youtubeChannelUrl: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || "",
  year: new Date().getFullYear(),
};

export const NAV = [
  { label: "Tools", items: [
    ["Mortgage payment", "/tools/mortgage-calculator"],
    ["Affordability", "/tools/affordability-calculator"],
    ["Renewal shock", "/tools/renewal-calculator"],
    ["Breaking-penalty (CA)", "/tools/penalty-calculator"],
    ["Refinance break-even", "/tools/refinance-calculator"],
    ["Home equity: 3 paths", "/tools/equity-calculator"],
    ["Home loan EMI (India)", "/tools/emi-calculator"],
    ["Dispute letter generator", "/tools/letter-generator"],
    ["All tools →", "/tools"],
  ]},
  { label: "Guides", items: [
    ["Canada", "/canada"],
    ["United States", "/usa"],
    ["India", "/india"],
    ["All guides", "/guides"],
    ["Glossary", "/glossary"],
    ["FAQ", "/faq"],
  ]},
  { label: "Live", items: [
    ["Today's rates", "/rates"],
    ["Mortgage news", "/news"],
    ["Videos", "/videos"],
  ]},
  { label: "Community", items: [
    ["Support us", "/support"],
    ["Contests & prizes", "/contests"],
    ["Careers & talent", "/careers"],
    ["Advertise & partner", "/advertise"],
    ["About", "/about"],
    ["Contact", "/contact"],
  ]},
];

export const FOOTER = [
  ["Get help", [["Ask the Helpline", "/helpline"], ["Get matched with a pro", "/get-help"], ["Behind on payments", "/guides/behind-on-mortgage-payments"], ["Dispute letter generator", "/tools/letter-generator"], ["Avoid relief scams", "/guides/mortgage-relief-scams"]]],
  ["Tools", [["Mortgage payment", "/tools/mortgage-calculator"], ["Affordability", "/tools/affordability-calculator"], ["Renewal", "/tools/renewal-calculator"], ["Penalty (CA)", "/tools/penalty-calculator"], ["Refinance", "/tools/refinance-calculator"], ["Home equity", "/tools/equity-calculator"], ["EMI (India)", "/tools/emi-calculator"]]],
  ["Learn", [["All guides", "/guides"], ["Today's rates", "/rates"], ["News", "/news"], ["Videos", "/videos"], ["Glossary", "/glossary"], ["FAQ", "/faq"]]],
  ["Company", [["About", "/about"], ["How we make money", "/how-we-make-money"], ["Editorial policy", "/editorial-policy"], ["Support us", "/support"], ["Contests", "/contests"], ["Careers", "/careers"], ["Advertise", "/advertise"], ["Contact", "/contact"]]],
  ["Legal", [["Privacy policy", "/privacy"], ["Terms of use", "/terms"], ["Disclaimer", "/disclaimer"], ["Trademark & copyright", "/legal"]]],
];
