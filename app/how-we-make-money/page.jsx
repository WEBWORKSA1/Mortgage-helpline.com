export const metadata = {
  title: "How we make money",
  description:
    "Every way Mortgage Helpline earns revenue, in plain language, and the three commitments that never bend.",
};

export default function Page() {
  return (
    <main className="wrap prose">
      <h1>How we make money</h1>
      <p>
        Free help still costs money to run, so here is our entire revenue model in plain
        language. If a way of earning ever appears on this site that isn&rsquo;t on this page,
        hold us to it.
      </p>

      <h2>1. Optional referrals to licensed professionals</h2>
      <p>
        After you&rsquo;ve received the full answer, you can ask to be connected with a licensed
        mortgage professional. If you do, that professional pays us a referral fee. You are
        never required to connect with anyone to use any tool or read any guide, and choosing
        not to changes nothing about the help you get.
      </p>

      <h2>2. Clearly labelled sponsorships</h2>
      <p>
        Some businesses pay to appear in spaces marked <em>Sponsored</em>. Sponsorship buys a
        labelled spot — it never buys a ranking, a recommendation, or a kinder review. Nothing
        unlabelled on this site is paid for.
      </p>

      <h2>3. Advertising</h2>
      <p>
        Some pages carry standard display ads. Advertisers have no influence on what we write,
        and we decline categories we consider predatory in this space, whatever they offer to pay.
      </p>

      <h2>What we will not do</h2>
      <ul>
        <li>Sell or auction your information to multiple parties. If you ask to be connected, your details go to one professional you approved — once.</li>
        <li>Gate a calculator result or an answer behind an email address.</li>
        <li>Accept payment to alter a recommendation, a ranking, or a piece of guidance.</li>
        <li>Tell you to do a transaction that the numbers say you shouldn&rsquo;t. Sometimes the right answer costs us a referral. That&rsquo;s the deal.</li>
      </ul>

      <div className="commit">
        The test we hold every page to: would this answer be identical if no one paid us
        anything? If not, it doesn&rsquo;t ship.
      </div>

      <p>
        Questions about any of this? The moment we have a public inbox, it will be listed here.
        This page changes only by addition, never by quiet deletion.
      </p>
    </main>
  );
}
