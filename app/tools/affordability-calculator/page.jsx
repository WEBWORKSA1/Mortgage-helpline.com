import ToolShell from "@/components/ToolShell";
import AffordabilityCalculator from "@/components/AffordabilityCalculator";

export const metadata = {
  title: "How Much House Can I Afford? Affordability & Stress-Test Calculator",
  description: "Estimate your maximum mortgage and home price using Canadian GDS/TDS ratios and the stress test, or US debt-to-income limits — plus a comfort check.",
  alternates: { canonical: "/tools/affordability-calculator" },
};

const about = `
## Two answers, on purpose
Lenders tell you the **maximum** they can approve. That number is a ceiling built from debt-service ratios — not a budget. This calculator shows both the approval estimate and a comfort check at about 28% of gross income for housing.

## Canada vs US
Canadian federally regulated lenders apply the stress test: you qualify at the greater of 5.25% or your rate plus 2 points, with GDS around 39% and TDS around 44%. US lenders use debt-to-income ratios that vary by program; this tool uses conservative 28/36 limits. See [the stress test explained](/guides/mortgage-stress-test-canada).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/affordability-calculator" title="How much home can you afford?" need="purchase"
      intro="See what lenders may approve — including Canada's stress test — and what actually fits a healthy budget."
      about={about} related={["mortgage-stress-test-canada", "first-time-buyer-canada", "down-payment-default-insurance-canada"]}>
      <AffordabilityCalculator />
    </ToolShell>
  );
}
