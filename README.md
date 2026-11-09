# mortgagehelpline.com

**Straight answers for your mortgage** — a trust-first mortgage help platform for Canada, the United States and India.

## What's in the box
- **AI helpline** (`/helpline`, edge API with rate limiting) governed by the published trust charter
- **Lead generation**: 3-step "get matched" wizard (`/get-help`) — one licensed pro, never auctioned; calculators pre-fill it
- **9 tools**: mortgage payment + amortization, affordability/stress test, renewal, Canadian penalty (IRD, s.10), refinance break-even, home equity 3-paths, India EMI, dispute-letter generator
- **18 sourced guides**, 65-term glossary, FAQ, Canada/USA/India hubs
- **Live, self-updating data**: Bank of Canada (Valet), Freddie Mac PMMS via FRED, CFPB complaint mix, official + trade news feeds, official YouTube channels, daily brief
- **Monetization**: Google AdSense (auto ads + optional manual slot, ads.txt, consent choice), referrals, labelled sponsorships, voluntary support (`/support`), contests with rules (`/contests`), talent network (`/careers`), partners (`/advertise`)
- **Compliance**: privacy (AdSense/PIPEDA/Law 25/CCPA/DPDP), terms, disclaimer, editorial policy, trademark & copyright notice, sitemap, robots, structured data

## How the site stays fresh automatically
1. **Vercel Cron** (`vercel.json`) calls `/api/refresh` every day, which purges the cached home, rates, news and videos pages.
2. **ISR** — those pages re-fetch live sources (and re-cache them for up to 12 hours). With `ANTHROPIC_API_KEY` set, Claude writes the daily brief strictly from the fetched numbers (cached per data date).
3. Every source fails soft: the committed snapshot in `data/live.json` is shown if a source is down.
4. Optional: `npm run refresh` (or the GitHub Action template in `docs/daily-refresh.github-action.yml`, copied to `.github/workflows/`) also commits a fresh snapshot daily. Set `CRON_SECRET` in Vercel to lock the refresh endpoint.

## Forms → inbox
All forms post to `/api/submit`, which delivers server-side to the site inbox (never sent to the browser). Delivery order: Resend (`RESEND_API_KEY`) → Web3Forms (`WEB3FORMS_KEY`) → zero-config FormSubmit relay (first submission triggers a one-time activation email).

## Run
```
npm install
npm run dev          # local
npm run refresh      # pull live data into data/live.json
```
See `.env.example` for optional settings. Content lives in `content/` (guides, glossary, FAQ, roles, contests, quiz) — edit and push; pages update automatically.

## Principles (non-negotiable)
Full answer first · no email walls · no pay-to-rank · one-party referrals only · every estimate labelled an estimate.

Research: `docs/competitive-research.md` (35 sites reviewed).

© 2026 Mortgage Helpline. All rights reserved. Mortgage Helpline™ and MortgageHelpline.com™ are trademarks of Mortgage Helpline.
