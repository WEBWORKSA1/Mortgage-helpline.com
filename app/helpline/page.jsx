import Helpline from "@/components/Helpline";

export const metadata = {
  title: "Ask the Mortgage Helpline — Free AI Answers",
  description: "Free AI answers for mortgage penalties, renewals, refinancing, home equity, servicer problems and Indian home loans. No email, no signup.",
  alternates: { canonical: "/helpline" },
};

export default function Page({ searchParams }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q.slice(0, 500) : "";
  return (
    <main>
      <div className="wrap page-hd"><p className="eyebrow"><span className="live" />The line is open 24/7</p><h1>Ask the helpline.</h1>
        <p>A straight answer to your mortgage question — with the math shown. Educational, not advice; for big decisions, confirm in writing with your lender or a licensed professional.</p></div>
      <div className="wrap"><Helpline initialQuestion={q} /></div>
    </main>
  );
}
