import CountryHub from "@/components/CountryHub";
export const metadata = { title: "Home Loan Help in India — EMI, Prepayment, RBI Ombudsman", description: "Free help with Indian home loans: EMI calculator, repo-linked rates, prepayment rules, balance transfers and how to complain to the RBI Ombudsman.", alternates: { canonical: "/india" } };
export default function Page() {
  return <CountryHub code="IN" name="India" intro="EMIs, repo-linked floating rates, prepayment and balance transfers, tax basics and the RBI Ombudsman — more India guides are being added."
    tools={["/tools/emi-calculator", "/tools/refinance-calculator"]}
    help={[["Reserve Bank of India", "https://www.rbi.org.in/"], ["RBI Complaint Management System (Ombudsman)", "https://cms.rbi.org.in/"], ["National Cybercrime Reporting Portal (helpline 1930)", "https://cybercrime.gov.in/"]]} />;
}
