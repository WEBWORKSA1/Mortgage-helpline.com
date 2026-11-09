import ToolShell from "@/components/ToolShell";
import EmiCalculator from "@/components/EmiCalculator";

export const metadata = {
  title: "Home Loan EMI Calculator (India) with Prepayment Savings",
  description: "Calculate your home loan EMI, total interest and the savings from yearly part-prepayments — in rupees, lakh and crore.",
  alternates: { canonical: "/tools/emi-calculator" },
};

const about = `
## EMI basics
Your EMI depends on the loan amount, interest rate and tenure. Early EMIs are mostly interest, which is why part-prepayments in the first years save the most.

## Floating-rate resets
When the RBI repo rate changes, floating-rate home loans reset at the dates in your agreement. Lenders must explain whether your EMI or tenure will change and offer options. Read the [India home loan guide](/guides/home-loans-india).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/emi-calculator" title="Home loan EMI calculator (India)" need="refinance"
      intro="Your EMI, total interest, and how much a yearly part-prepayment saves — instantly."
      about={about} related={["home-loans-india", "how-amortization-works"]}>
      <EmiCalculator />
    </ToolShell>
  );
}
