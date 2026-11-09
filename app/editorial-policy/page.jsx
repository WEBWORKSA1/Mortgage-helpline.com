import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Editorial Policy", description: "How Mortgage Helpline researches, writes, sources, updates and corrects its content — and how AI is used.", alternates: { canonical: "/editorial-policy" } };
const S = `
## Independence
No advertiser, sponsor, lender or referral partner can review, approve or change our content before publication, and none can pay to be recommended.

## Sourcing
Guides are built on primary sources — legislation, regulations, and guidance from regulators such as the CFPB, FCAC, OSFI, HUD and the Reserve Bank of India — linked at the end of each guide. Where rules vary by province, state or lender, we say so.

## Numbers and estimates
Calculators state their assumptions. Every estimate is labelled an estimate. Live data shows its source and as-of date.

## Updates and corrections
Each guide shows the date it was last reviewed. When a rule changes, we update the guide. If we make a mistake, we correct it promptly and note material corrections. Report errors through our [contact page](/contact).

## How we use AI
The helpline uses an AI model instructed by our published trust charter: complete answers first, no invented figures, estimates labelled, and referrals only when genuinely useful. Daily market briefs may be drafted automatically from the official data shown beside them, with instructions never to add figures that are not in the data. AI output can still be wrong — confirm anything important with your lender or a licensed professional.

## Advice
Our content is educational and general. It is not personalized financial, legal or tax advice.
`;
export default function Page() { return <LegalPage title="Editorial policy" source={S} />; }
