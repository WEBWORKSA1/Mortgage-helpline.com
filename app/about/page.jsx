import LegalPage from "@/components/LegalPage";
export const metadata = { title: "About Mortgage Helpline", description: "Why Mortgage Helpline exists, who it's for, and the trust charter every page follows.", alternates: { canonical: "/about" } };
const S = `
Mortgage Helpline exists so that when anyone thinks "I need help with my mortgage," the first answer they find is a straight one.

Mortgages are the largest debt most families ever carry, yet the help on offer is usually a sales funnel: a rate teaser, a form, and five lenders calling the same evening. The questions people actually have — *what will this penalty cost me, can I switch at renewal, my servicer lost my payment, I'm behind and scared* — get the least honest answers.

## What we do
- **Answer first.** Free guides, calculators that show their math, and an AI helpline that gives the full answer before anything else.
- **Stay current automatically.** Rates, regulator data and headlines refresh every day from official sources.
- **Connect only when asked.** If you want a professional, we match you with one licensed person in your area — never an auction.
- **Serve Canada, the United States and India**, in that order of depth today, with more languages on the roadmap.

## The trust charter
1. The full answer comes first — no email walls, no withheld numbers.
2. No one can pay for a ranking, review or recommendation.
3. Referrals go to one party, once, and only when you ask.
4. Every estimate is labelled an estimate, with assumptions shown.
5. Our revenue model is public: [how we make money](/how-we-make-money).

## Who writes this
Guides are written and maintained by the Mortgage Helpline Editorial Team and reviewed against primary sources — statutes, regulations and regulator guidance — which are linked at the end of every guide. Read our [editorial policy](/editorial-policy). Spotted an error? [Tell us](/contact) and we'll fix it.

## What we are not
We are not a lender, broker, law firm or financial advisor. Our information is educational. For decisions that depend on your situation, confirm with your lender in writing or a licensed professional.
`;
export default function Page() { return <LegalPage title="About Mortgage Helpline" source={S} />; }
