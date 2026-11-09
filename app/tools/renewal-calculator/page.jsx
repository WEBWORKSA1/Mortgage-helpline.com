import ToolShell from "@/components/ToolShell";
import RenewalCalculator from "@/components/RenewalCalculator";

export const metadata = {
  title: "Mortgage Renewal Calculator — See Your Payment Change",
  description: "See exactly how your monthly mortgage payment changes at renewal and how to shrink the jump — free, no email required.",
  alternates: { canonical: "/tools/renewal-calculator" },
};

const about = `
## Renewal is your free exit
At maturity you can switch lenders with no prepayment penalty. Get three written quotes 90–120 days before your renewal date and ask your lender to match the best one.

## Ways to soften a payment jump
- Extend the amortization back toward its original length (lowers the payment, raises total interest).
- Make a lump-sum prepayment before renewal to shrink the balance.
- Choose a shorter term while you rebuild cash flow.
- Ask your lender early about relief options if you are at risk of hardship.
`;

export default function Page() {
  return (
    <ToolShell path="/tools/renewal-calculator" title="What will your renewal actually cost?" need="renewal"
      intro="Over a million Canadian mortgages renew in 2026, many set when rates were far lower. Put in your numbers and see the change — then use the checklist to shrink it."
      about={about} related={["renew-mortgage-canada", "fixed-vs-variable-canada", "mortgage-stress-test-canada"]}>
      <RenewalCalculator />
    </ToolShell>
  );
}
