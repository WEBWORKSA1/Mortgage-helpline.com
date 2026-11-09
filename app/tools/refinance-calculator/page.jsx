import ToolShell from "@/components/ToolShell";
import RefinanceCalculator from "@/components/RefinanceCalculator";

export const metadata = {
  title: "Refinance Break-Even Calculator — Does Refinancing Pay?",
  description: "Compare your current and new mortgage, closing costs or penalties, and your time horizon to see break-even months and real net savings.",
  alternates: { canonical: "/tools/refinance-calculator" },
};

const about = `
## The break-even test
Break-even months = refinance costs ÷ monthly savings. If you will keep the loan well past break-even, refinancing can pay; if you might move sooner, it can lose money.

## Don't let a longer term fool you
A lower payment can come from stretching the loan rather than a better rate. Keep the new amortization equal to the years you have left to see the true saving. More in [when refinancing actually makes sense](/guides/when-to-refinance).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/refinance-calculator" title="Does refinancing actually pay?" need="refinance"
      intro="Break-even months, net savings over the years you'll really keep the loan, and a warning when a lower payment is just a longer loan."
      about={about} related={["when-to-refinance", "mortgage-points-explained", "break-mortgage-penalty-canada"]}>
      <RefinanceCalculator />
    </ToolShell>
  );
}
