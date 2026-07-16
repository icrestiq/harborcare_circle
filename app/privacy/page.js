import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | HarborCare Circle',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Privacy Policy
      </p>
      <h1 className="text-3xl font-heading mb-2">Privacy Policy</h1>
      <p className="text-sm text-warm-gray mb-8">Last updated: July 2026</p>

      <div className="prose-sm space-y-6 text-sm leading-relaxed">
        <p>
          HarborCare Circle is a product of iCrestiQ, LLC (&ldquo;iCrestiQ,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;).
          This policy explains what information we collect when you use this website, how we use it,
          and the choices you have. It does not yet cover the future HarborCare Circle app — a separate,
          updated policy will apply once that product launches, and we&apos;ll notify waitlist members
          when it does.
        </p>

        <section>
          <h2 className="text-lg font-heading mb-2">Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Information you provide directly:</strong> your email address, if you sign up for the newsletter or app waitlist; anything you type into a checklist, assessment, or calculator.</li>
            <li><strong>Information collected automatically:</strong> basic usage data such as pages visited, general location (city/region level, from IP address), device and browser type, and how you found the site.</li>
            <li><strong>Locally stored data:</strong> checklist progress, assessment answers, and roadmap selections are currently stored in your browser only (not on our servers) so that returning to a page doesn&apos;t erase your progress.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">How We Use Information</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>To send the newsletter or app waitlist updates you sign up for.</li>
            <li>To understand which resources are useful, and where the site is confusing or broken.</li>
            <li>To improve content, fix errors, and prioritize what to build next.</li>
          </ul>
          <p className="mt-2">We do not sell your personal information. We do not use assessment or checklist answers for advertising.</p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Sensitive Information</h2>
          <p>
            Our assessments and checklists may ask about health, caregiving, or family circumstances.
            Please avoid entering anyone&apos;s full name, exact address, or other identifying details you
            wouldn&apos;t want stored, since some tools may save answers locally in your browser. We do not
            require this information to use the site, and no assessment results are reviewed by a person
            unless you choose to email them to yourself or us directly.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Cookies and Analytics</h2>
          <p>
            We use basic analytics to understand overall site traffic and usage patterns. We do not use
            these tools to build advertising profiles or share data with ad networks. You can block cookies
            in your browser settings; the site will still work, though some preferences may not be remembered.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Sharing Your Information</h2>
          <p>
            We share information only with service providers who help us run the site (such as email
            delivery and hosting providers), under agreements that limit their use of it, or if required
            by law. We do not sell personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Your Choices</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You can unsubscribe from any email at any time using the link in that email.</li>
            <li>You can clear your browser&apos;s local storage to remove saved checklist, assessment, or roadmap progress.</li>
            <li>You can request that we delete any information tied to your email address by contacting us below.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Children</h2>
          <p>This site is intended for adults managing caregiving responsibilities. It is not directed at children, and we do not knowingly collect information from children under 13.</p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Changes to This Policy</h2>
          <p>We may update this policy as the site grows. We&apos;ll update the &ldquo;Last updated&rdquo; date above when we do.</p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Contact Us</h2>
          <p>
            Questions about this policy or your information can be sent to{' '}
            <a href="mailto:hello@icrestiq.com" className="text-kin-blue underline">hello@icrestiq.com</a>.
            iCrestiQ, LLC is based in Easley, South Carolina.
          </p>
        </section>
      </div>
    </div>
  );
}
