import CountryHub from "@/components/CountryHub";
export const metadata = { title: "Mortgage Help in the United States — Servicers, Hardship, Refinancing", description: "Free US mortgage help: servicer error letters, forbearance and loss mitigation, PMI removal, escrow, refinancing and home equity.", alternates: { canonical: "/usa" } };
export default function Page() {
  return <CountryHub code="US" name="the United States" intro="Servicer errors, escrow, PMI, hardship and foreclosure protections, refinancing and home equity — with the federal rules that protect you."
    tools={["/tools/letter-generator", "/tools/equity-calculator", "/tools/refinance-calculator", "/tools/mortgage-calculator", "/tools/affordability-calculator"]}
    help={[["CFPB — Help for homeowners", "https://www.consumerfinance.gov/housing/"], ["HUD — Find a housing counselor (1-800-569-4287)", "https://www.hud.gov/findacounselor"], ["CFPB — Submit a complaint", "https://www.consumerfinance.gov/complaint/"], ["FTC — Mortgage relief scams", "https://consumer.ftc.gov/articles/mortgage-relief-scams"]]} />;
}
