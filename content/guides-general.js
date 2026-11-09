const U = "2026-11-09";

export const GUIDES_GENERAL = [
{
  slug: "home-equity",
  title: "Using your home equity, explained straight",
  description: "HELOC vs home equity loan vs cash-out refinance — what each is, who each fits, the trap of repricing a cheap first mortgage, and when the answer is none of them.",
  country: "ALL", topic: "Home equity", updated: U, minutes: 7,
  tools: ["/tools/equity-calculator", "/tools/refinance-calculator"],
  sources: [["CFPB — Home equity", "https://www.consumerfinance.gov/owning-a-home/"], ["FCAC — Mortgages", "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html"]],
  body: `
## The one idea that matters most
Your equity is your home's value minus what you still owe. If you locked in a low rate on your mortgage, that rate is an asset. A HELOC or home equity loan borrows **new** money at today's rate while leaving your cheap mortgage untouched. A cash-out refinance replaces your **entire** mortgage at today's rate to get the cash — you reprice money you already borrowed cheaply. With a large balance and a big rate gap, that single difference is routinely worth tens of thousands of dollars. It is also why a refinance can win when your existing rate is already high. The math decides, not the product name — [run your numbers](/tools/equity-calculator).

## HELOC — a revolving line secured by your home
Works like a credit card with your house as collateral: borrow, repay, borrow again during the draw period. Rates are variable, so your cost moves with the market. Fits staged or uncertain amounts — a renovation billed in phases, a safety buffer you may never draw. The risks: payments can climb, and easy re-borrowing quietly rebuilds the balance. In Canada, federally regulated lenders cap the revolving portion at 65% of your home's value.

## Home equity loan — a fixed second mortgage
One lump sum, fixed rate, fixed payment, fixed end date. Usually priced a little above a HELOC in exchange for certainty. Fits a single known expense — a firm contractor bid, consolidating a specific debt — when you want a payment that never changes and a loan that actually ends.

## Cash-out refinance — replace the whole mortgage
You take a new, larger mortgage; the difference arrives as cash; you carry one payment at one rate. Closing costs typically run 2–5% of the whole new loan, not just the cash portion (in Canada, add any prepayment penalty if you break mid-term). It fits when your current rate is at or above today's, or when you were refinancing anyway.

## When the right answer is none of them
All three secure the debt against your home: fall far enough behind and foreclosure or power of sale is the legal endpoint, which is never true of unsecured debt. Equity into an asset (a needed repair, retiring 24% credit-card debt) can make sense. Equity into consumption — vacations, vehicles, monthly bills — converts short-term spending into long-term secured debt. If the bills already don't balance, free help comes first: a HUD-approved housing counselor (1-800-569-4287) in the US, or an accredited non-profit credit counsellor in Canada. Be wary of anyone who charges an upfront fee to "unlock your equity."

## Before you sign anything
- Get written quotes from at least three lenders per product.
- Price the refinance against a second-lien path over your real horizon in the [calculator](/tools/equity-calculator).
- Ask what a HELOC rate can rise to, not just what it starts at.
- Count closing costs as part of the cost of the cash, because they are.
`},
{
  slug: "mortgage-relief-scams",
  title: "Mortgage relief, foreclosure and title scams: the red flags",
  description: "How foreclosure-rescue, loan-modification, payment-redirect and title-fraud scams work, the US law that bans upfront fees, and how to protect yourself.",
  country: "ALL", topic: "Hardship", updated: U, minutes: 5,
  tools: [],
  sources: [["FTC — Mortgage relief scams", "https://consumer.ftc.gov/articles/mortgage-relief-scams"], ["Canadian Anti-Fraud Centre", "https://antifraudcentre-centreantifraude.ca/"], ["CFPB — Submit a complaint", "https://www.consumerfinance.gov/complaint/"]],
  body: `
## Why homeowners in trouble are targeted
Foreclosure filings are public records. Within days of a notice, borrowers often receive letters and calls from "relief" companies — some legitimate, many not. Scammers impersonate lenders, government programs, and even nonprofit counselors.

## The biggest red flag: an upfront fee
In the United States, the Mortgage Assistance Relief Services rule (Regulation O) makes it illegal for most for-profit companies to collect any fee for loan-modification or foreclosure-relief services **until you have a written offer from your lender that you accept**. A demand for money first is your signal to walk away. HUD-approved housing counselors help for free.

## Other warning signs
- "Guaranteed" approval or a promise to stop foreclosure.
- Instructions to stop paying your lender, or to pay the company instead.
- Pressure to sign documents you have not read, especially anything that transfers your **deed or title**.
- A "lease-back" or "rent-to-own" rescue where you give up ownership.
- A letter telling you your loan was transferred and to send payments to a new address — verify by calling the number on an old statement.
- Requests for payment by wire, gift card, or cryptocurrency.

## Title and identity fraud
Fraudsters sometimes forge documents to sell or mortgage a property they do not own, often targeting vacant homes, rentals, or mortgage-free properties. Protection: monitor your property records (many US counties and Canadian land registries offer free alerts), consider title insurance, keep your contact information current with the land registry, and act fast on any unexpected mail about your property.

## If you think you've been targeted
- **US:** report to the FTC (ReportFraud.ftc.gov), the CFPB, and your state attorney general.
- **Canada:** report to the Canadian Anti-Fraud Centre and your local police; tell your lender and land registry.
- **India:** report cyber fraud at cybercrime.gov.in or by calling 1930, and complaint to your bank.

The safe path is always the free one: call your servicer directly, and if you need help, a HUD-approved counselor (1-800-569-4287) or a non-profit credit counsellor.
`},
{
  slug: "how-amortization-works",
  title: "How mortgage interest and amortization work",
  description: "Why early payments are mostly interest, how term and amortization differ, what extra payments do, and Canadian vs US compounding.",
  country: "ALL", topic: "Basics", updated: U, minutes: 5,
  tools: ["/tools/mortgage-calculator"],
  sources: [["CFPB — Owning a Home", "https://www.consumerfinance.gov/owning-a-home/"], ["Interest Act (Canada), s.6", "https://laws-lois.justice.gc.ca/eng/acts/i-15/page-1.html"]],
  body: `
## Every payment has two parts
A standard mortgage payment is fixed, but its contents change. Interest is charged on the outstanding balance, so early on the balance is high and most of each payment is interest. As the balance falls, the interest portion shrinks and more goes to principal. On a 25- or 30-year loan, you typically do not pay down half the balance until well past the halfway point in time.

## Amortization vs term
- **Amortization** is how long it would take to pay off the loan entirely at the current payment — commonly 25 or 30 years.
- **Term** is how long your rate and conditions are locked. In the US the term usually equals the amortization (a 30-year fixed). In Canada, terms are usually five years or less, so you renew several times within one amortization.

## Compounding: a Canada vs US difference
US mortgages compound monthly. Canadian fixed-rate mortgages must, under the Interest Act, state the rate compounded no more often than semi-annually. At the same quoted rate, a Canadian fixed mortgage costs slightly less than the US equivalent. Our [mortgage calculator](/tools/mortgage-calculator) handles both.

## What extra payments do
Every extra dollar of principal stops interest from accruing on that dollar for the rest of the loan, which is why small, early extra payments have outsized effects. Common options:
- **Accelerated bi-weekly payments** — half the monthly payment every two weeks, which adds up to one extra monthly payment a year.
- **Annual lump sums** — in Canada, check your prepayment privileges (often 10–20% a year without penalty).
- **Rounding up** each payment.

Confirm that extra payments are applied to principal, and check whether your mortgage has prepayment penalties before paying large amounts.

## Reading your amortization schedule
The schedule shows, for each payment, the interest, the principal, and the remaining balance. Use it to see where you will be at renewal, when you reach 20% or 22% equity (relevant to removing PMI in the US), and how much interest you will pay over the term. Generate yours in the [calculator](/tools/mortgage-calculator).
`},
{
  slug: "home-loans-india",
  title: "Home loans in India: EMI, repo-linked rates, prepayment and your rights",
  description: "How EMIs and floating rates work, the RBI rules on foreclosure charges and rate resets, tax treatment basics, and how to escalate a complaint.",
  country: "IN", topic: "Basics", updated: U, minutes: 7,
  tools: ["/tools/emi-calculator"],
  sources: [["Reserve Bank of India", "https://www.rbi.org.in/"], ["RBI Complaint Management System", "https://cms.rbi.org.in/"], ["National Cybercrime Reporting Portal", "https://cybercrime.gov.in/"]],
  body: `
## How an EMI works
An equated monthly instalment (EMI) repays a home loan over its tenure in equal payments. As with mortgages elsewhere, early EMIs are mostly interest. A ₹50 lakh loan at 8.5% over 20 years has an EMI of roughly ₹43,400; over the full tenure you would repay about ₹1.04 crore, more than double the amount borrowed. Try your own numbers in the [EMI calculator](/tools/emi-calculator).

## Floating rates are linked to an external benchmark
Since October 2019, banks' new floating-rate retail loans, including home loans, must be linked to an external benchmark — most use the RBI repo rate. Your rate is the benchmark plus a spread. When the RBI changes the repo rate, your rate changes at the reset dates in your agreement. Housing finance companies follow their own reference rates, so read how yours is set.

## When rates rise: EMI or tenure?
Lenders often keep the EMI the same and extend the tenure when rates rise, which can add years and lakhs of interest. RBI rules on resetting floating rates require lenders to explain the impact, and to offer options at reset — such as increasing the EMI, extending the tenure, or a combination, switching to a fixed rate where offered, and prepaying. Ask your lender for an updated amortization schedule whenever your rate changes.

## Prepayment and foreclosure charges
Under RBI directions, banks and NBFCs may not levy foreclosure charges or prepayment penalties on floating-rate term loans to individual borrowers for non-business purposes. Fixed-rate loans can carry charges — check your sanction letter. Part-prepayments early in the tenure save the most interest.

## Balance transfer
Moving your loan to another lender at a lower rate can save substantially, but compare processing fees, legal and valuation charges, and any insurance products bundled with the new loan. The break-even logic is the same as a refinance — see [when refinancing makes sense](/guides/when-to-refinance).

## Tax basics
Under the old tax regime, interest on a self-occupied home loan has been deductible up to ₹2 lakh a year, and principal repayment counts toward the ₹1.5 lakh investment deduction; the new default regime does not allow these deductions for a self-occupied home. Tax law was consolidated into the Income-tax Act, 2025 from April 2026 — confirm the current rules and section references with a tax professional.

## How to complain
1. Write to your lender's grievance redressal officer (details must be on its website) and keep the complaint number.
2. If it is not resolved within 30 days, or you are unhappy with the reply, file with the RBI Integrated Ombudsman through cms.rbi.org.in. The service is free.
3. For fraud, report at cybercrime.gov.in or call 1930 immediately.
`},
];
