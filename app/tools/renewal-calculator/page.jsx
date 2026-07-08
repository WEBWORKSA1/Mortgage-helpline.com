import RenewalCalculator from "@/components/RenewalCalculator";

export const metadata = {
  title: "Mortgage Renewal Calculator (Canada)",
  description:
    "See exactly how your monthly payment changes at renewal, and what to do about it — free, no email required.",
};

export default function Page() {
  return (
    <main>
      <div className="wrap tool-hd">
        <h1>What will your renewal actually cost?</h1>
        <p>
          Over a million Canadian mortgages renew in 2026, most set at pandemic-era rates.
          Put in your numbers and see the change — then use the checklist to shrink it.
        </p>
      </div>
      <RenewalCalculator />
    </main>
  );
}
