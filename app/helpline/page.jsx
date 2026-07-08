import Helpline from "@/components/Helpline";

export const metadata = {
  title: "Ask the Helpline",
  description:
    "Free AI answers for mortgage penalties, renewals, refinancing, equity and servicing problems — Canada and USA. No email, no signup.",
};

export default function Page({ searchParams }) {
  const q = typeof searchParams?.q === "string" ? searchParams.q.slice(0, 500) : "";
  return (
    <main>
      <div className="wrap tool-hd">
        <h1>The line is open.</h1>
        <p>
          A straight answer to your mortgage question — then, only if you want it, the next step.
        </p>
      </div>
      <div className="wrap">
        <Helpline initialQuestion={q} />
      </div>
    </main>
  );
}
