import LegalPage from "@/components/LegalPage";
export const metadata = { title: "How We Make Money", description: "Every way Mortgage Helpline earns revenue, in plain language, and the commitments that never bend.", alternates: { canonical: "/how-we-make-money" } };
const S = `
Free help still costs money to run, so here is our entire revenue model. If a way of earning ever appears on this site that isn't on this page, hold us to it.

## 1. Display advertising (Google AdSense)
Pages carry ads served by Google AdSense, labelled as advertisements. Advertisers have no influence on what we write, and we block ad categories we consider predatory in this space where the ad platform allows it. You can choose non-personalized ads at any time — see our [privacy policy](/privacy).

## 2. Optional referrals to licensed professionals
After you've received the full answer, you can ask to be matched with one licensed mortgage professional. If you do, that professional may pay us a referral fee. You are never required to connect with anyone to use any tool or read any guide.

## 3. Clearly labelled sponsorships and partnerships
Some businesses pay for spaces marked *Sponsored* or to fund contest prizes. Sponsorship buys a labelled spot — never a ranking, a recommendation, or a kinder review.

## 4. Voluntary support
Readers can [support the site](/support). Contributions fund operations, tools, expert contributors, outreach and contests. They are not tax-deductible and never buy influence.

## What we will not do
- Sell or auction your information to multiple parties. If you ask to be connected, your details go to one professional, once.
- Gate a calculator result or an answer behind an email address.
- Accept payment to alter a recommendation, a ranking, or a helpline answer.
- Tell you to do a transaction the numbers say you shouldn't. Sometimes the right answer costs us a referral. That's the deal.

> The test every page is held to: would this answer be identical if no one paid us anything? If not, it doesn't ship.

Questions? [Contact us](/contact). This page changes only by addition, never by quiet deletion.
`;
export default function Page() { return <LegalPage title="How we make money" source={S} />; }
