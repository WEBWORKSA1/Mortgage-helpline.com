const U = "2026-11-09";

export const GUIDES_US = [
{
  slug: "behind-on-mortgage-payments",
  title: "Behind on mortgage payments: your options and your rights",
  description: "What happens at 30, 45, 120 days late, the loss-mitigation options servicers must consider, foreclosure protections, and where to get free help — US and Canada.",
  country: "US", topic: "Hardship", updated: U, minutes: 9,
  tools: ["/tools/letter-generator"],
  sources: [["CFPB — Help for homeowners", "https://www.consumerfinance.gov/housing/"], ["HUD — Find a housing counselor", "https://www.hud.gov/findacounselor"], ["Regulation X, 12 CFR 1024.39–1024.41", "https://www.consumerfinance.gov/rules-policy/regulations/1024/"]],
  body: `
## Act before the first missed payment if you can
If you can see trouble coming — job loss, illness, divorce, a payment jump — call your servicer **before** you miss a payment. Options are wider and your credit is still intact. Have your income, expenses, and the reason for the hardship ready. Write down who you spoke with, when, and what they said.

> Free, expert help: in the US, a HUD-approved housing counselor costs nothing — call **1-800-569-4287** or search HUD's counselor finder. Never pay anyone an upfront fee to "save your home."

## The federal timeline (most US mortgages)
- **By day 36 of delinquency:** your servicer must try to contact you (live contact) about loss-mitigation options.
- **By day 45:** it must send a written notice describing options and how to apply, and assign personnel to help you.
- **Before day 120:** the servicer generally cannot make the first legal filing to start foreclosure.
- **Complete application more than 37 days before a scheduled sale:** the servicer must evaluate you for all available options within 30 days and generally cannot move ahead with the sale while the application is pending ("dual tracking" protections).

## Options servicers commonly offer
1. **Forbearance:** payments are paused or reduced for a set period. The missed amount does not disappear — ask exactly how it will be repaid before you agree.
2. **Repayment plan:** you pay your regular payment plus part of the arrears each month until you are current.
3. **Deferral or partial claim:** missed payments are moved to the end of the loan (or into a separate interest-free lien for FHA loans), due when you sell, refinance, or pay off.
4. **Loan modification:** the servicer permanently changes the terms — rate, term, or balance — to make the payment affordable.
5. **Short sale or deed-in-lieu:** if keeping the home is not realistic, these exit options typically do less damage than a completed foreclosure.

## How to apply well
Submit a **complete** loss-mitigation application — incomplete files are the most common reason for delays. Send documents by a trackable method or upload through the servicer's portal and save confirmations. If the servicer loses documents or misapplies payments, send a written [Notice of Error](/guides/mortgage-servicer-errors) — it triggers legal response deadlines.

## In Canada
Contact your lender early. Federally regulated lenders are expected under FCAC's guideline on existing mortgages in exceptional circumstances to offer relief measures such as extending the amortization, allowing lump-sum payments, adjusting the payment schedule, or waiving certain fees. Non-profit credit counselling agencies offer free budgeting help. Power-of-sale and judicial foreclosure timelines differ by province, so get legal advice quickly if you receive a demand letter.

## Watch for scams
Anyone promising to stop foreclosure for an upfront fee, asking you to sign over your deed, or telling you to stop talking to your servicer is a red flag. Read [mortgage relief and title scams](/guides/mortgage-relief-scams).
`},
{
  slug: "mortgage-servicer-errors",
  title: "Fixing servicer errors: Notices of Error and Requests for Information",
  description: "The two federal letters that force a written response from a US mortgage servicer, the deadlines, what to include, and where to send them.",
  country: "US", topic: "Servicer problems", updated: U, minutes: 7,
  tools: ["/tools/letter-generator"],
  sources: [["12 CFR 1024.35 — Error resolution", "https://www.consumerfinance.gov/rules-policy/regulations/1024/35/"], ["12 CFR 1024.36 — Requests for information", "https://www.consumerfinance.gov/rules-policy/regulations/1024/36/"], ["CFPB — Submit a complaint", "https://www.consumerfinance.gov/complaint/"]],
  body: `
## Why phone calls fail and letters work
More than half of US mortgage complaints to the CFPB involve the payment process — misapplied payments, escrow mistakes, fees, and problems after a servicing transfer. Calls create no paper trail and no deadline. A written **Notice of Error** or **Request for Information** under Regulation X does both.

## Notice of Error (12 CFR 1024.35)
Use it when you believe the servicer made a mistake, such as:
- failing to credit a payment, or applying it incorrectly;
- charging a fee without a reasonable basis;
- failing to pay taxes or insurance from escrow on time;
- failing to provide an accurate payoff balance;
- errors in loss-mitigation handling or foreclosure.

**Deadlines:** the servicer must acknowledge in writing within **5 business days** and, in most cases, either correct the error or explain in writing why it believes no error occurred within **30 business days** (extendable once by 15 business days with notice). Payoff-balance errors must be addressed within **7 business days**. While it investigates certain payment errors, the servicer cannot report the disputed amount as late to credit bureaus for 60 days.

## Request for Information (12 CFR 1024.36)
Use it to get documents and facts: the owner of your loan, the payment history, the escrow analysis, the fee breakdown, or copies of notes and documents relevant to your account. Same 5-business-day acknowledgment; the response is generally due within 30 business days. A request for the identity of the loan owner must be answered within 10 business days.

## Getting it right
1. **Send it to the designated address.** Many servicers designate a specific address for errors and information requests — it is on your statement or the servicer's website. Letters sent elsewhere may not trigger the deadlines.
2. **Include** your name, property address, and loan number, and describe the error or the information you want specifically.
3. **Keep proof**: certified mail with return receipt, or the servicer's portal confirmation.
4. **Keep paying** what you can and document everything while the dispute is open.

Generate a ready-to-send letter with our [dispute letter generator](/tools/letter-generator) — it runs in your browser and sends nothing to us.

## If the servicer does not respond
File a complaint with the CFPB (consumerfinance.gov/complaint) and your state's banking or mortgage regulator. Servicers typically respond to CFPB complaints within 15 days. Repeated violations can give you a private right of action under RESPA — talk to a consumer attorney or legal aid office.
`},
{
  slug: "escrow-shortage",
  title: "Escrow shortage or surplus: what the rules say",
  description: "Why your payment changed, how annual escrow analysis works, your options when there is a shortage, and when you are owed a refund.",
  country: "US", topic: "Servicer problems", updated: U, minutes: 5,
  tools: ["/tools/letter-generator", "/tools/mortgage-calculator"],
  sources: [["12 CFR 1024.17 — Escrow accounts", "https://www.consumerfinance.gov/rules-policy/regulations/1024/17/"]],
  body: `
## What escrow is
Many US mortgages include an escrow account: part of each monthly payment is held by the servicer to pay property taxes and homeowners insurance when they are due. Your payment = principal and interest + one-twelfth of the estimated yearly taxes and insurance (+ mortgage insurance, if any).

## The annual analysis
At least once a year the servicer must analyze the account, project the next 12 months of bills, and send you an annual escrow statement. Servicers may keep a cushion of up to one-sixth of the year's estimated disbursements (about two months).

## Shortage, deficiency, surplus
- **Shortage:** the projected balance is too low for next year's bills, usually because taxes or insurance went up. If the shortage is at least one month's escrow payment, the servicer can spread repayment over at least **12 months** (it may offer the option to pay a lump sum instead).
- **Deficiency:** the account actually went negative because the servicer advanced money for you.
- **Surplus:** if the analysis shows a surplus of **$50 or more** and you are current on payments, the servicer must refund it within **30 days**; smaller surpluses may be credited.

## Why your payment jumped — and what you can do
Insurance premiums and reassessed property taxes are the usual causes. Steps:
1. Check the escrow statement line by line — the amounts paid out and the projected bills.
2. Shop your homeowners insurance; you can change carriers and send the servicer the new declarations page.
3. Check your property-tax assessment and appeal deadline with your county.
4. If the servicer paid the wrong amount, paid late (triggering penalties), or used the wrong figures, send a **Notice of Error** — see [servicer errors](/guides/mortgage-servicer-errors).

## Can you drop escrow?
Some conventional loans allow you to waive escrow once you have enough equity and a clean payment history, sometimes for a fee. FHA loans and many others require it. If you waive it, you must pay large tax and insurance bills yourself on time.
`},
{
  slug: "remove-pmi",
  title: "How to remove PMI — and when FHA mortgage insurance stays",
  description: "The Homeowners Protection Act rules for cancelling private mortgage insurance, getting there faster, and how FHA's MIP works differently.",
  country: "US", topic: "Saving money", updated: U, minutes: 5,
  tools: ["/tools/mortgage-calculator", "/tools/letter-generator"],
  sources: [["CFPB — When can I remove PMI?", "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/"], ["HUD — FHA mortgage insurance premiums", "https://www.hud.gov/"]],
  body: `
## What PMI is
Conventional lenders usually require private mortgage insurance when you put down less than 20%. Like Canadian default insurance, it protects the lender. Unlike Canada's model, it is usually paid monthly — and it can come off.

## The Homeowners Protection Act rules (most conventional loans since 1999)
- **Request cancellation at 80%:** you can ask in writing to cancel PMI when your balance reaches 80% of the home's **original** value (the lower of purchase price or appraisal), based on the original amortization schedule or through extra payments. You must be current, have a good payment history, and the lender can require proof the value has not fallen and no second liens exist.
- **Automatic termination at 78%:** PMI must end automatically when the balance is scheduled to reach 78% of original value, if you are current.
- **Final termination:** PMI ends at the midpoint of the loan term regardless of balance, if you are current.

## Getting there faster
- **Extra principal payments** move you to 80% sooner. Our [mortgage calculator](/tools/mortgage-calculator) shows how extra payments change the timeline.
- **Rising home value:** many investors (e.g., Fannie Mae and Freddie Mac guidelines) allow cancellation based on a new appraisal after a seasoning period, typically with lower loan-to-value thresholds. Ask your servicer for its exact rules before paying for an appraisal.

## FHA is different
FHA loans carry an upfront premium and an annual MIP. For most FHA loans originated since June 2013, annual MIP lasts **11 years** if you put down 10% or more, and **for the life of the loan** if you put down less. Removing life-of-loan MIP usually means refinancing into a conventional loan once you have enough equity — worth pricing when rates allow.

Send your cancellation request with our [letter generator](/tools/letter-generator) ("PMI cancellation request").
`},
{
  slug: "loan-sold-servicing-transfer",
  title: "Your mortgage was sold or transferred: what changes",
  description: "Goodbye and hello letters, the 60-day grace period, autopay, escrow and how to avoid the most common transfer problems.",
  country: "US", topic: "Servicer problems", updated: U, minutes: 4,
  tools: ["/tools/letter-generator"],
  sources: [["12 CFR 1024.33 — Mortgage servicing transfers", "https://www.consumerfinance.gov/rules-policy/regulations/1024/33/"]],
  body: `
## What does not change
Your interest rate, balance, term, and payment amount stay the same when servicing moves. Only the company collecting payments changes.

## The notices
Your old servicer must generally notify you at least **15 days before** the transfer takes effect, and the new servicer within **15 days after** (they can send one combined notice). Each notice should state the effective date, the new servicer's contact details, and when the old servicer stops accepting payments.

> Verify a transfer notice by calling the number on a statement you already have — not a number in an unexpected letter. Payment-redirect scams use fake transfer letters.

## The 60-day protection
For **60 days** after the transfer date, a payment you send to the old servicer on time cannot be treated as late by the new servicer, and no late fee can be charged for it.

## Checklist
1. Set up payment with the new servicer; cancel the old autopay only once the new one is confirmed.
2. Confirm your escrow balance transferred and that tax and insurance due dates are on file.
3. If you were in a loss-mitigation review, forbearance, or repayment plan, send the new servicer your paperwork — it must honor loss-mitigation applications in progress, but documents get lost.
4. Check the first statement against your records. Missing payments or new fees? Send a [Notice of Error](/guides/mortgage-servicer-errors).
`},
{
  slug: "when-to-refinance",
  title: "When refinancing actually makes sense",
  description: "The break-even test, rate-and-term vs cash-out, closing costs, resetting the clock, and the cases where refinancing loses money.",
  country: "ALL", topic: "Refinancing", updated: U, minutes: 6,
  tools: ["/tools/refinance-calculator", "/tools/equity-calculator", "/tools/penalty-calculator"],
  sources: [["CFPB — Refinancing", "https://www.consumerfinance.gov/owning-a-home/"], ["FCAC — Mortgages", "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html"]],
  body: `
## The only test that matters: break-even
Refinancing costs money up front — closing costs in the US (often 2–5% of the loan), and in Canada a prepayment penalty plus legal, appraisal, and discharge fees if you break mid-term. The refinance pays off only if your monthly savings recover those costs before you sell or refinance again.

**Break-even months = total refinance costs ÷ monthly savings.** If costs are $6,000 and you save $250 a month, break-even is 24 months. Plan to stay five years? Worth considering. Moving in 18 months? It loses money. Our [refinance calculator](/tools/refinance-calculator) does this with your numbers.

## Watch the clock reset
Refinancing a loan with 22 years left into a new 30-year loan lowers the payment partly by stretching the debt — total interest can rise even at a lower rate. Compare **total interest over the time you will actually keep the loan**, or choose a term that matches your remaining years.

## Rate-and-term vs cash-out
- **Rate-and-term:** replaces the loan to change the rate or term, without taking extra money.
- **Cash-out:** borrows more than you owe and gives you the difference. If your current rate is well below today's, a cash-out refinance reprices your whole balance — a HELOC or home equity loan that leaves your first mortgage alone is often cheaper. Price all three paths in the [home equity calculator](/tools/equity-calculator).

## Good reasons to refinance
- A meaningfully lower rate with a short break-even.
- Moving from an adjustable to a fixed rate to remove payment risk.
- Removing FHA mortgage insurance by refinancing to conventional once you have enough equity.
- Consolidating high-interest debt — only with a plan to avoid building that debt again, since the new debt is secured by your home.

## Red flags
- A lender pitching "skip a payment" (you still pay the interest).
- No-closing-cost offers that bury costs in a higher rate — fine if you will move soon, expensive if you stay.
- Pressure to refinance repeatedly; each round adds costs.
`},
{
  slug: "mortgage-points-explained",
  title: "Discount points: is paying to lower your rate worth it?",
  description: "How points work, the break-even math, lender credits, and when buying down the rate pays off.",
  country: "US", topic: "Saving money", updated: U, minutes: 4,
  tools: ["/tools/mortgage-calculator", "/tools/refinance-calculator"],
  sources: [["CFPB — What are discount points?", "https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-and-how-do-they-work-en-136/"]],
  body: `
## The basics
One **discount point** costs 1% of the loan amount, paid at closing, in exchange for a lower interest rate. How much each point lowers the rate varies by lender and day — commonly somewhere around 0.125 to 0.25 percentage points, but you must ask for the actual pricing.

**Lender credits** work in reverse: you accept a higher rate and the lender pays part of your closing costs.

## The break-even math
On a $400,000 loan, one point costs $4,000. If it lowers the payment by $65 a month, break-even is about 62 months — just over five years. Keep the loan longer than that and the point pays off; sell or refinance sooner and it loses money.

## Compare like with like
Your Loan Estimate lists points on page 2 (section A, origination charges). When comparing lenders, compare the same rate with the same points, or compare the APR together with the cash needed at closing. Ask each lender for a quote with zero points, one point, and a lender credit.

## When points make sense
- You expect to keep the loan well past break-even.
- You have cash left over after your down payment and emergency fund.
- Rates are unlikely to drop enough for you to refinance soon — if they do, the points you paid are sunk.

Discount points may be tax-deductible in some situations; ask a tax professional.
`},
];
