import Link from "next/link";

export const metadata = {
  title: "Home Equity, Explained Straight — HELOC vs Loan vs Cash-Out Refi",
  description:
    "What each equity product actually is, who each one fits, the trap of repricing a cheap first mortgage, and when the right answer is not borrowing at all.",
};

export default function Page() {
  return (
    <main className="wrap prose">
      <h1>Using your home equity, explained straight</h1>
      <p>
        Your equity is your home&rsquo;s value minus what you still owe. There are three main
        ways to turn some of it into cash, and the marketing around all three is designed to
        make you focus on the wrong number. Here is how each one actually works, who it fits,
        and the trap to avoid.
      </p>

      <h2>The one idea that matters most</h2>
      <p>
        If you locked in a low rate on your mortgage, that rate is an asset. A HELOC or home
        equity loan borrows <em>new</em> money at today&rsquo;s rate while leaving your cheap
        mortgage untouched. A cash-out refinance replaces your <em>entire</em> mortgage at
        today&rsquo;s rate to get the cash — you reprice money you already borrowed cheaply.
        With a large balance and a big rate gap, that single difference is routinely worth
        tens of thousands of dollars. It is also why a refi can win when your existing rate is
        already high. The math decides, not the product name — <Link href="/tools/equity-calculator">run your numbers here</Link>.
      </p>

      <h2>HELOC — a revolving line secured by your home</h2>
      <p>
        Works like a credit card with your house as collateral: borrow, repay, borrow again
        during the draw period. Rates are variable, so your cost moves with the market. Fits
        staged or uncertain amounts — a renovation billed in phases, a safety buffer you may
        never draw. The risks: variable payments can climb, and easy re-borrowing quietly
        rebuilds the balance. In Canada, federally regulated lenders cap the revolving portion
        at 65% of your home&rsquo;s value.
      </p>

      <h2>Home equity loan — a fixed second mortgage</h2>
      <p>
        One lump sum, fixed rate, fixed payment, fixed end date. Usually priced a little above
        a HELOC in exchange for certainty. Fits a single known expense — a firm contractor
        bid, consolidating a specific debt — when you want a payment that never changes and a
        loan that actually ends.
      </p>

      <h2>Cash-out refinance — replace the whole mortgage, keep the difference</h2>
      <p>
        You take a new, larger mortgage; the difference arrives as cash; you carry one payment
        at one rate. Closing costs typically run 2–5% of the whole new loan, not just the cash
        portion. It fits when your current rate is at or above today&rsquo;s, or when you were
        refinancing anyway. It rarely fits when you hold a pandemic-era rate — that&rsquo;s the
        trap in the section above wearing a friendly name.
      </p>

      <h2>When the right answer is none of them</h2>
      <p>
        All three secure the debt against your home: fall far enough behind and foreclosure is
        the legal endpoint, which is never true of unsecured debt. Be honest about the purpose.
        Equity into an asset (a needed repair, retiring 24% credit-card debt) can make sense.
        Equity into consumption — vacations, vehicles, keeping up with monthly bills — converts
        short-term spending into long-term secured debt, and if the bills already don&rsquo;t
        balance, borrowing against the house usually delays the problem and raises the stakes.
        If that&rsquo;s the situation, a fee-free option comes first: in the US, a HUD-approved
        housing counsellor at 1-800-569-4287; in Canada, an accredited non-profit credit
        counsellor. And be wary of anyone who charges an upfront fee to &ldquo;unlock your
        equity&rdquo; — that pattern is the signature of a scam.
      </p>

      <h2>Before you sign anything</h2>
      <ul>
        <li>Get written quotes from at least three lenders per product — pricing spreads are wide.</li>
        <li>Price the refi against a second-lien path over your real horizon, not over a slogan. <Link href="/tools/equity-calculator">The calculator does this in one screen</Link>.</li>
        <li>Ask what the rate on a HELOC can rise to, not just what it starts at.</li>
        <li>Count closing costs as part of the cost of the cash, because they are.</li>
      </ul>

      <p>
        This is educational information, not financial advice — the right choice depends on
        details a page can&rsquo;t see. Have a question the guide didn&rsquo;t answer?{" "}
        <Link href="/helpline">Ask the helpline</Link> — full answer, free, nothing required.
      </p>
    </main>
  );
}
