import EquityCalculator from "@/components/EquityCalculator";
import Link from "next/link";

export const metadata = {
  title: "Home Equity Calculator — HELOC vs Home Equity Loan vs Cash-Out Refi",
  description:
    "Compare the real cost of tapping home equity three ways — including the trap of repricing a low-rate first mortgage. Free, no email required.",
};

export default function Page() {
  return (
    <main>
      <div className="wrap tool-hd">
        <h1>Tapping your equity: the three paths, priced honestly</h1>
        <p>
          The question isn&rsquo;t just the rate on the new money — it&rsquo;s whether you disturb
          the rate on the old money. This tool prices all three paths over your real time
          horizon. New to the products? <Link href="/guides/home-equity">Read the plain-language guide</Link>.
        </p>
      </div>
      <EquityCalculator />
    </main>
  );
}
