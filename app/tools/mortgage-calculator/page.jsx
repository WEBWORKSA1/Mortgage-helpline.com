import ToolShell from "@/components/ToolShell";
import MortgageCalculator from "@/components/MortgageCalculator";

export const metadata = {
  title: "Mortgage Payment Calculator with Amortization Schedule (US & Canada)",
  description: "Monthly, bi-weekly and accelerated payments, extra payments, taxes, insurance, PMI or CMHC premiums, and a full amortization schedule — US and Canadian compounding.",
  alternates: { canonical: "/tools/mortgage-calculator" },
};

const about = `
## What makes this calculator accurate
It uses **semi-annual compounding for Canada** (the standard for Canadian fixed-rate mortgages) and monthly compounding for the US, adds default-insurance premiums for Canadian purchases under 20% down, and shows the all-in monthly cost including taxes and insurance.

## Getting the most from it
- Try **accelerated bi-weekly** — half your monthly payment every two weeks adds up to one extra payment a year.
- Add a small **extra principal** amount and watch the payoff date move.
- Open the **amortization schedule** to see your balance at each renewal or when you reach 80% loan-to-value.

Read [how amortization works](/guides/how-amortization-works) for the why behind the numbers.
`;

export default function Page() {
  return (
    <ToolShell path="/tools/mortgage-calculator" title="Mortgage payment calculator" need="purchase"
      intro="Payment, total interest, payoff date and a full amortization schedule — with the right compounding for the US or Canada."
      about={about} related={["how-amortization-works", "down-payment-default-insurance-canada", "remove-pmi"]}>
      <MortgageCalculator />
    </ToolShell>
  );
}
