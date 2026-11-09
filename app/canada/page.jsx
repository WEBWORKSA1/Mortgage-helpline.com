import CountryHub from "@/components/CountryHub";
export const metadata = { title: "Mortgage Help in Canada — Renewals, Penalties, Stress Test", description: "Free Canadian mortgage help: renewal and penalty calculators, stress test, default insurance, first-time buyer programs and how to complain.", alternates: { canonical: "/canada" } };
export default function Page() {
  return <CountryHub code="CA" name="Canada" intro="Renewals, prepayment penalties, the stress test, default insurance, FHSA and complaints — explained for every province."
    tools={["/tools/renewal-calculator", "/tools/penalty-calculator", "/tools/affordability-calculator", "/tools/mortgage-calculator", "/tools/refinance-calculator", "/tools/letter-generator"]}
    help={[["Financial Consumer Agency of Canada — Mortgages", "https://www.canada.ca/en/financial-consumer-agency/services/mortgages.html"], ["CMHC — Buying a home", "https://www.cmhc-schl.gc.ca/consumers/home-buying"], ["Ombudsman for Banking Services and Investments (OBSI)", "https://www.obsi.ca/"], ["Bank of Canada — Policy interest rate", "https://www.bankofcanada.ca/core-functions/monetary-policy/key-interest-rate/"]]} />;
}
