# mortgagehelpline.com

Straight answers for your mortgage. Trust-first mortgage help for Canada & the USA.

## Stack
- Next.js 14 (App Router) · React 18 · vanilla CSS design tokens
- Fonts via Google Fonts link: Bricolage Grotesque / Public Sans / IBM Plex Mono

## Run
```
npm install
npm run dev
```
For the AI helpline, copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY` (in production: Vercel > Settings > Environment Variables).

## v1 scope (this repo)
- Home: ask-bar hero (routes to the helpline), pulse-line signature, pain-point cards, trust commitments
- /helpline — streaming AI chat (edge route at /api/helpline), trust charter enforced in the system prompt
- /tools/penalty-calculator — CA fixed/variable break penalty (3-mo vs IRD, posted vs discounted method, Interest Act 5-yr cap)
- /tools/renewal-calculator — renewal payment shock
- /how-we-make-money — the bias firewall page

## Roadmap
1. DONE: AI helpline (streaming; voice later)
2. Equity takeout guide + calculator (US focus), servicing dispute letter generator (RESPA RFI / FCAC)
3. Programmatic content engine (lender-specific penalty pages, renewal guides)
4. Free merit-ranked directory (NMLS + provincial registries)
5. FR localization (Canada), then India (DSA model)

## Principles (non-negotiable)
Full answer first · no email walls · no pay-to-rank · one-party referrals only · every estimate labelled an estimate.
