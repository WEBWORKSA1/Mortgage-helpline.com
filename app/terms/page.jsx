import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Terms of Use", description: "The terms that govern your use of mortgagehelpline.com.", alternates: { canonical: "/terms" } };
const S = `
By using mortgagehelpline.com (the "Site") you agree to these terms. If you don't agree, please don't use the Site.

## Educational information only
The Site, its calculators, guides, live data, AI helpline and letter templates provide general educational information. They are not financial, legal, tax or mortgage advice, and no professional relationship is created. Results are estimates that depend on your inputs and assumptions. Confirm figures with your lender in writing and consult a licensed professional before making decisions.

## Not a lender or broker
Mortgage Helpline does not lend money, arrange mortgages, or act as your broker or agent. When you ask to be matched, any relationship you form with a professional is between you and that professional.

## AI helpline
Answers are generated automatically and may be incomplete or wrong. Don't enter account numbers, government ID numbers or passwords. We may limit use to protect the service.

## Third-party content
Rates, headlines and videos come from third-party sources and are provided as-is with attribution. Links to other sites are for convenience; we don't control them.

## Acceptable use
Don't misuse the Site — no scraping that burdens our systems, no automated form submissions, no attempts to break security, and no unlawful use.

## Intellectual property
The Site's content, code, design and trademarks are protected — see [Trademark & copyright](/legal).

## Contributions and contests
Voluntary contributions are not tax-deductible and are non-refundable. Contests are governed by their official rules.

## Limitation of liability
To the fullest extent permitted by law, the Site is provided "as is" without warranties, and Mortgage Helpline is not liable for losses arising from use of or reliance on the Site. Some jurisdictions don't allow certain limitations, so some may not apply to you.

## Changes and governing law
We may update these terms by posting a new version. These terms are governed by the laws applicable in the Province of Québec and the federal laws of Canada applicable therein, without limiting any mandatory consumer protections where you live.

Questions? [Contact us](/contact).
`;
export default function Page() { return <LegalPage title="Terms of use" source={S} />; }
