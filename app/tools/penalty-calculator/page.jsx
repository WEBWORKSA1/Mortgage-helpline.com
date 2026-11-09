import ToolShell from "@/components/ToolShell";
import PenaltyCalculator from "@/components/PenaltyCalculator";

export const metadata = {
  title: "Mortgage Penalty Calculator (Canada) — IRD vs 3 Months' Interest",
  description: "Estimate the cost of breaking a fixed or variable Canadian mortgage: three months' interest vs IRD, posted-rate vs discounted-rate methods, and the Interest Act section 10 rule.",
  alternates: { canonical: "/tools/penalty-calculator" },
};

const about = `
## How this calculator works
For **variable** mortgages it uses three months' interest. For **fixed** mortgages it calculates both three months' interest and the interest rate differential (IRD), and shows the greater — the way most Canadian lenders charge. Choose your lender's method: discounted-rate lenders compare your rate with their actual rate for the remaining term; posted-rate lenders compare with the posted rate minus your original discount, which usually produces a larger IRD.

## The Interest Act section 10 rule
If your term is **longer than five years** (a 7- or 10-year term) and five years have passed, section 10 generally limits the charge to three months' interest. It does not apply to standard five-year or shorter terms, including renewals.

## Before you break
Request a written payout statement, use any unused prepayment privilege first, and ask about porting or blend-and-extend. Then test whether the new rate pays back the penalty with the [refinance break-even calculator](/tools/refinance-calculator).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/penalty-calculator" title="What will breaking your mortgage cost?" need="penalty"
      intro="The full math, no email needed. Penalties are often the greater of three months' interest or the interest rate differential — and your lender's method can change the number by thousands."
      about={about} related={["break-mortgage-penalty-canada", "renew-mortgage-canada", "when-to-refinance"]}>
      <PenaltyCalculator />
    </ToolShell>
  );
}
