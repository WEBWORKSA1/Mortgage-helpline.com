# Competitive research — 35 mortgage & consumer-finance sites (Nov 2026)

Reviewed to benchmark features, forms, content, design and trust patterns for mortgagehelpline.com.

| # | Site | Market | What they do best | Adopted here |
|---|------|--------|-------------------|--------------|
| 1 | NerdWallet (mortgages) | US | Mega-menu, calculator suite, author bylines, advertiser disclosure | Grouped dropdown nav, bylines + updated dates, public revenue page |
| 2 | Bankrate | US | Purchase/refi/HELOC split, DTI + amortization calculators, stat-heavy hero | Affordability (DTI) + refinance calculators, journey cards |
| 3 | Ratehub.ca | CA | Scenario chooser (buying vs renewing), renewal & land-transfer calculators, "Sponsored" labels | Need-first lead wizard, renewal calculator, labelled sponsorship rules |
| 4 | WOWA.ca | CA | Huge calculator library; newsletter with topic checkboxes | Calculator hub — and guarded against its stale "NaN%/Invalid Date" data with snapshot fallbacks |
| 5 | nesto.ca | CA | Rate ticker, Bank of Canada announcement banner, payment-shock calculator | Live rate ticker, BoC change shown in daily brief |
| 6 | LendingTree | US | Table of contents, PITI breakdown, FAQ, "Expert verified" | Sticky TOC on guides, all-in monthly cost, FAQ schema |
| 7 | Rocket Mortgage | US | Clear Buy/Refi/Equity IA, rate alerts | Journey-based IA, opt-in rate alerts in lead form |
| 8 | Better.com | US | "3 minutes, no credit impact" CTA promise | "60 seconds · no credit check" lead promise |
| 9 | CFPB Owning a Home | US | Numbered journey, scam-warning banner, counselor referral | Hardship notice with HUD counselor line, scam guide |
| 10 | FCAC — Mortgages | CA | Rights-based content, penalties, relief options | Rights-first guides with official sources |
| 11 | The Mortgage Reports | US | Buy/refi selector widget, daily rates, loan-limit finder | Rates page, need selector |
| 12 | Mortgage News Daily | US | Persistent rate ticker, "Last updated" stamps, daily commentary | Ticker + daily auto brief + timestamps |
| 13 | Mortgage Professor | US | Expert Q&A ("Ask the Professor") | AI helpline as the always-on Q&A |
| 14 | MortgageCalculator.org | US | Extra-payment, biweekly comparisons, charts | Accelerated bi-weekly + extra payments + balance chart |
| 15 | SmartAsset | US | Methodology section, cited FRED data | Assumptions shown in every tool; FRED attribution |
| 16 | True North Mortgage | CA | Renewal reminder, rate ticker, bilingual toggle | Renewal date captured in lead form; FR on roadmap |
| 17 | LowestRates.ca | CA | 3-step compare flow, "100% confidential, impartial" | 3-step wizard; one-party promise |
| 18 | Canadian Mortgage Trends | CA | Fast news desk, BoC coverage | News feed source |
| 19 | MoneySense | CA | Editorial-independence disclosure | Editorial policy page |
| 20 | Freddie Mac My Home | US | Journey stages, quizzes, glossary, counselor finder | Glossary (65 terms), Mortgage IQ quiz |
| 21 | HUD — Avoiding foreclosure | US | Official trust signals | Official-source links on every guide |
| 22 | BankBazaar | IN | EMI calculator, lender comparison | EMI calculator with prepayment savings |
| 23 | Paisabazaar | IN | Sticky bottom CTA bar, accordion FAQs | Sticky mobile CTA bar |
| 24 | Zillow Home Loans | US | Affordability-first funnel | Affordability → pre-approval CTA |
| 25 | CMHC | CA | Step-by-step buying guides, premium calculator | Default-insurance premiums in mortgage calculator |
| 26 | SoFi Home Loans | US | Product picker modal | Need cards |
| 27 | Credit Karma | US | Dense trust footer | Multi-column footer with legal disclosures |
| 28 | Forbes Advisor | US | Three-path CTAs (buy/refi/equity) | Contextual CTAs per calculator, pre-filled |
| 29 | The Truth About Mortgage | US | ~40 calculators + dictionary, editorial standards | Glossary + editorial policy |
| 30 | Calculator.net | Global | Full amortization schedule & chart | Amortization table + chart |
| 31 | HDFC Home Loans | IN | Eligibility + balance-transfer tools, callback forms | Balance-transfer guidance, preferred-contact choice |
| 32 | Money.com | US | Read-time labels | Read-time on guides |
| 33 | MortgageCalculator.net | Global | Multi-currency calculators, embeddable | US/CA/IN currencies; embeds on roadmap |
| 34 | CFPB Housing | US | Help-paying content | Behind-on-payments guide with Reg X timeline |
| 35 | HousingWire | US | Daily tickers, market tracker, newsletters | News aggregation + daily refresh |

Also attempted (blocked to automated review): Investopedia, Magicbricks, Rates.ca, Experian, Fannie Mae, Breezeful.

## Where mortgagehelpline.com is deliberately different
- **No email walls** on any tool (most competitors gate quotes).
- **One-party referrals** vs multi-lender lead auctions (LendingTree, LowestRates, Paisabazaar).
- **Rights tools** competitors don't offer: RESPA Notice of Error / RFI generator, Interest Act s.10 letter, penalty-formula transparency.
- **Daily automation** (rates, CFPB complaint mix, news, videos, brief) with fail-soft snapshots so numbers are never broken.
