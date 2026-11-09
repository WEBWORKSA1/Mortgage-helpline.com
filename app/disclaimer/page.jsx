import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Disclaimer", description: "Important limits on the information, estimates and data on Mortgage Helpline.", alternates: { canonical: "/disclaimer" } };
const S = `
## General information, not advice
Everything on this site is general educational information about mortgages and home loans in Canada, the United States and India. It does not consider your personal circumstances and is not financial, legal, tax or mortgage advice.

## Estimates
Calculator results are estimates based on the inputs and assumptions shown. Lenders' contracts, formulas, fees and rounding differ. The only binding figures are those your lender provides in writing.

## Live data
Rates are published market averages (for example the Freddie Mac Primary Mortgage Market Survey® via FRED® and Bank of Canada data) shown for information. They are not offers, quotes or rate locks, and may be delayed or contain errors.

## Rules change
Laws, regulations, program limits and tax rules change. Each guide shows when it was last reviewed; always check the official source linked in the guide.

## No endorsement
References to regulators, lenders, programs or companies are for identification only and do not imply endorsement or affiliation.

## Professional help
For hardship, foreclosure, legal disputes or complex decisions, contact your lender, a HUD-approved housing counselor (US, 1-800-569-4287), a non-profit credit counsellor, or a lawyer.
`;
export default function Page() { return <LegalPage title="Disclaimer" source={S} />; }
