import ToolShell from "@/components/ToolShell";
import LetterGenerator from "@/components/LetterGenerator";

export const metadata = {
  title: "Mortgage Dispute Letter Generator — Notice of Error, RFI, PMI, Penalty",
  description: "Free letters that force a written response: RESPA Notice of Error and Request for Information, payoff and PMI requests, Canadian penalty and Interest Act s.10 letters, and formal complaints.",
  alternates: { canonical: "/tools/letter-generator" },
};

const about = `
## Why letters work
A phone call creates no deadline. A written Notice of Error or Request for Information under US Regulation X requires a servicer to acknowledge within 5 business days and generally respond within 30. In Canada, a written complaint starts your lender's complaint process and the clock toward escalating to an external complaints body.

## Tips
Send to the correct address, keep proof of delivery, keep making the payments you can, and follow up on the deadline. See [fixing servicer errors](/guides/mortgage-servicer-errors) and [how to complain in Canada](/guides/complain-about-lender-canada).
`;

export default function Page() {
  return (
    <ToolShell path="/tools/letter-generator" title="Dispute letter generator" need="servicer"
      intro="Fill in the blanks and get a ready-to-send letter that cites the right rule. Built in your browser — nothing is sent to us."
      about={about} related={["mortgage-servicer-errors", "escrow-shortage", "complain-about-lender-canada"]}>
      <LetterGenerator />
    </ToolShell>
  );
}
