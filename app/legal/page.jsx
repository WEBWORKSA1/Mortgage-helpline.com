import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Trademark & Copyright Notice", description: "Trademark, copyright and content-use notice for Mortgage Helpline.", alternates: { canonical: "/legal" } };
const S = `
## Trademarks
**Mortgage Helpline™**, **MortgageHelpline.com™**, the pulse-line logo, and the slogan **"Straight answers for your mortgage"™** are trademarks of Mortgage Helpline. The ™ symbol indicates trademark rights claimed in these marks. You may not use them in a way that suggests sponsorship, endorsement or affiliation, or that is likely to cause confusion, without written permission.

## Copyright
© 2026 Mortgage Helpline. All rights reserved. All original text, guides, glossary definitions, calculators and their logic, letter templates, software code, data compilations, graphics, page layouts and the overall look and feel of this website are owned by Mortgage Helpline and protected by Canadian, US and international copyright law.

## What you may do
- Read, print and share links to our pages for personal, non-commercial use.
- Quote short excerpts with attribution and a link to the original page.
- Use the letter templates you generate for your own mortgage matters.

## What requires permission
Republishing full guides, copying calculators or code, framing the site, scraping content at scale, or commercial use of our content. Ask through our [contact page](/contact).

## Third-party material
Third-party names, logos and marks (including those of regulators, central banks, lenders and publishers) belong to their respective owners and are used only to identify them; no endorsement or affiliation is implied. Rate data is attributed to its sources, including the Freddie Mac Primary Mortgage Market Survey® (via FRED®, Federal Reserve Bank of St. Louis) and the Bank of Canada. News headlines link to and remain the property of their publishers. Videos are embedded from YouTube and belong to their creators.

## Copyright complaints
If you believe content on this site infringes your copyright, send a notice through our [contact page](/contact) identifying the work, the page, your contact details, and a statement of good-faith belief and accuracy. We will review and respond promptly.
`;
export default function Page() { return <LegalPage title="Trademark & copyright notice" source={S} />; }
