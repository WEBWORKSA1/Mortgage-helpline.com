import PenaltyCalculator from "@/components/PenaltyCalculator";

export const metadata = {
  title: "Mortgage Penalty Calculator (Canada)",
  description:
    "Estimate the cost of breaking your fixed or variable mortgage — three months' interest vs IRD, posted-rate vs discounted-rate methods, and the Interest Act five-year cap.",
};

export default function Page() {
  return (
    <main>
      <div className="wrap tool-hd">
        <h1>What will breaking your mortgage cost?</h1>
        <p>
          The full math, right here, no email needed. Fixed-rate penalties are the greater of
          three months&rsquo; interest or the interest rate differential — and the method your
          lender uses can change the number by thousands.
        </p>
      </div>
      <PenaltyCalculator />
    </main>
  );
}
