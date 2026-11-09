import LegalPage from "@/components/LegalPage";
export const metadata = { title: "Privacy Policy", description: "What Mortgage Helpline collects, why, how Google AdSense cookies work, and your privacy rights in Canada, the US and India.", alternates: { canonical: "/privacy" } };
const S = `
This policy explains what information mortgagehelpline.com ("Mortgage Helpline", "we") collects, how we use it, and your choices. It applies to visitors in Canada (including Québec), the United States, India and elsewhere.

## Information you give us
- **Forms** (get-matched requests, contact, careers, contests, sponsorship, newsletter): the details you enter, such as name, email, phone, location, and information about your mortgage situation.
- **Helpline questions:** the text you type is sent to our AI provider to generate an answer. Don't include account numbers or identity numbers. We do not use helpline conversations to contact you.
- **Letter generator and calculators:** run entirely in your browser; what you type is not sent to us.

## How we use it
- To respond to you, and — only when you ask to be matched — to share your request with **one** licensed mortgage professional serving your area, under the consent you give on the form.
- To run contests and evaluate job applications you submit.
- To send newsletters or alerts only if you opt in; every message includes an unsubscribe option.
- To operate, secure and improve the site.

We **do not sell** your personal information, and we never share a matching request with more than one professional.

## Advertising and cookies
We use Google AdSense to show ads. Google and its partners use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on visits to our site and/or other sites on the Internet. You can opt out of personalized advertising at [Google Ads Settings](https://adssettings.google.com), learn more at [How Google uses information from sites that use its services](https://policies.google.com/technologies/partner-sites), and opt out of some third-party vendors' use of cookies at [aboutads.info](https://www.aboutads.info/choices). On this site you can also choose **non-personalized ads only** in our cookie banner (clear your browser storage to see it again). Embedded YouTube videos load only when you press play and use YouTube's privacy-enhanced mode.

## Service providers
We use hosting (Vercel), an AI provider for the helpline (Anthropic), email-delivery services to route form submissions to our team, PayPal (or another processor) for voluntary contributions, and Google for advertising. They process data on our behalf or under their own privacy terms. Data may be processed in Canada, the United States or other countries.

## Retention and security
We keep form submissions only as long as needed for the purpose you gave them, then delete them. Data is encrypted in transit. No system is perfectly secure; we limit what we collect.

## Your rights
Depending on where you live — including under Canada's PIPEDA, Québec's Law 25, US state privacy laws such as the CCPA/CPRA, and India's Digital Personal Data Protection Act — you may have rights to access, correct, delete or port your information, withdraw consent, and opt out of certain processing. We do not sell or "share" personal information for cross-context behavioural advertising beyond the Google AdSense cookies described above, which you can control. To exercise any right, use our [contact page](/contact) and choose "Privacy / data request." We will not discriminate against you for exercising your rights.

## Person in charge of privacy
Our Privacy Officer is responsible for the protection of personal information and can be reached through the [contact page](/contact).

## Children
This site is not directed to children under 16, and we do not knowingly collect their personal information.

## Changes
We will post changes here with a new "last updated" date.
`;
export default function Page() { return <LegalPage title="Privacy policy" source={S} />; }
