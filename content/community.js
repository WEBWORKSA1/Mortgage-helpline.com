// Careers, contests and quiz content. Edit here — pages update automatically.

export const ROLES = [
  { id: "contributor", title: "Contributing expert (licensed mortgage professionals)", where: "Remote · Canada / US / India", type: "Freelance",
    text: "Review and co-author guides in your market. We pay per reviewed article and credit you by name. Licence in good standing required; you may not promote your own business in content." },
  { id: "video", title: "Video creator — mortgage explainers", where: "Remote", type: "Freelance / per project",
    text: "Script, record and edit short, accurate explainers for our YouTube channel and site. Comfort with numbers and plain-language teaching." },
  { id: "agent", title: "Licensed mortgage agent / loan officer (talent network)", where: "Canada & US", type: "Talent network",
    text: "We are building a network of licensed professionals who put the borrower first. Join to be considered for referrals and future in-house roles." },
  { id: "engineer", title: "Full-stack engineer (Next.js + AI)", where: "Remote", type: "Contract",
    text: "Build calculators, data pipelines and the AI helpline. Next.js, React, Node, and LLM APIs." },
  { id: "growth", title: "Growth & partnerships", where: "Remote · North America", type: "Contract / commission",
    text: "Grow reach through partnerships with credit unions, non-profits, and creators — always within our trust charter." },
  { id: "translator", title: "Translators — French (Canada) and Hindi", where: "Remote", type: "Freelance",
    text: "Translate and localize guides and tools for Quebec and India." },
];

// Set status to "open" (and fill in prize, dates, question) to launch a contest.
export const CONTESTS = [
  {
    id: "mortgage-iq-challenge",
    status: "draft",
    title: "Mortgage IQ Challenge",
    prize: "",
    opens: "", closes: "",
    eligibility: "Legal residents of Canada (excluding where prohibited) and the 50 United States + DC, age of majority in their province/state.",
    skillQuestion: "(10 × 6) + 25 ÷ 5 − 4 = ?",
    how: "Answer the five mortgage questions correctly and submit the entry form. No purchase necessary.",
  },
];

export const QUIZ = [
  { q: "In Canada, the penalty for breaking a variable-rate mortgage is usually…", a: ["Three months' interest", "The interest rate differential", "6% of the balance", "Nothing"], c: 0, why: "Variable-rate penalties are usually three months' interest. Fixed-rate penalties are usually the greater of three months' interest or the IRD." },
  { q: "A US servicer must acknowledge a written Notice of Error within…", a: ["24 hours", "5 business days", "30 days", "90 days"], c: 1, why: "Regulation X requires a written acknowledgment within 5 business days, and generally a full response within 30 business days." },
  { q: "On a fixed-payment variable mortgage, the 'trigger rate' is the rate at which…", a: ["You can switch to fixed for free", "Your payment no longer covers the interest", "Your lender must lower your rate", "Prepayment privileges end"], c: 1, why: "Past the trigger rate, the payment no longer covers interest, and the lender may require changes." },
  { q: "Under the US Homeowners Protection Act, PMI ends automatically when your balance is scheduled to reach…", a: ["90% of original value", "80% of current value", "78% of original value", "50% of original value"], c: 2, why: "Automatic termination is at 78% of original value, if you are current. You can request cancellation at 80%." },
  { q: "Indian banks' new floating-rate home loans are linked to…", a: ["The bank's own MCLR only", "An external benchmark such as the repo rate", "The US Fed funds rate", "Gold prices"], c: 1, why: "Since October 2019, new floating-rate retail loans at banks must be linked to an external benchmark, usually the RBI repo rate." },
  { q: "Accelerated bi-weekly payments mainly help because they…", a: ["Lower your interest rate", "Add roughly one extra monthly payment per year", "Remove your penalty", "Skip a payment each year"], c: 1, why: "26 half-payments a year equals 13 monthly payments — one extra, all to principal." },
  { q: "A legitimate US foreclosure-relief company may charge you…", a: ["An upfront fee before doing anything", "A fee only after you accept a written offer from your lender", "A monthly retainer", "Whatever it wants"], c: 1, why: "The MARS rule (Regulation O) bans most upfront fees for mortgage relief services." },
];
