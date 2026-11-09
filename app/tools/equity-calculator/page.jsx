import ToolShell from "@/components/ToolShell";
import EquityCalculator from "@/components/EquityCalculator";

export const metadata = {
  title: "Home Equity Calculator — HELOC vs Home Equity Loan vs Cash-Out Refi",
  description: "Compare the real cost of tapping home equity three ways, including the trap of repricing a low-rate first mortgage. Free, no email required.",
  alternates: { canonical: "/tools/equity-calculator" },
};

const about = `
## Why this comparison is different
Most comparisons look only at the rate on the new money. This one includes the interest you keep paying on your existing mortgage in every path, so a cash-out refinance that reprices your whole balance is compared fairly against a second lien that leaves it alone.

## Limits and assumptions
HELOC and home equity loan payments are modelled as amortizing over your horizon; many HELOCs allow interest-only payments during the draw period, which lowers the payment but not the cost. The refinance includes ~3% closing costs. Canada caps the revolving part of a HELOC at 65% of value. Read the full [home equity guide](/guides/home-equity).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/equity-calculator" title="Tapping your equity: the three paths, priced honestly" need="equity"
      intro="The question isn't just the rate on the new money — it's whether you disturb the rate on the old money. This tool prices all three paths over your real time horizon."
      about={about} related={["home-equity", "when-to-refinance", "how-amortization-works"]}>
      <EquityCalculator />
    </ToolShell>
  );
}
