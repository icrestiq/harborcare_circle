import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | HarborCare Circle',
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Terms of Use
      </p>
      <h1 className="text-3xl font-heading mb-2">Terms of Use</h1>
      <p className="text-sm text-warm-gray mb-8">Last updated: July 2026</p>

      <div className="prose-sm space-y-6 text-sm leading-relaxed">
        <p>
          These terms govern your use of the HarborCare Circle website, operated by iCrestiQ, LLC
          (&ldquo;iCrestiQ,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;). By using this site, you agree to these terms.
          If you don&apos;t agree, please don&apos;t use the site.
        </p>

        <section>
          <h2 className="text-lg font-heading mb-2">What This Site Is</h2>
          <p>
            HarborCare Circle is a free resource for people caring for aging or ill loved ones —
            articles, checklists, assessments, calculators, and planning tools. It is provided for
            general informational and organizational purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Not Professional Advice</h2>
          <p>
            Nothing on this site is medical, legal, financial, or other professional advice, and it does
            not create a doctor-patient, attorney-client, or advisor relationship. Content is reviewed for
            accuracy against cited sources, but individual circumstances vary, and rules, benefits, and
            procedures differ by state, country, institution, and situation. Always consult a qualified
            professional — a doctor, attorney, financial advisor, or the relevant agency — before making
            decisions based on anything you read here. In a medical emergency, call 911 or your local
            emergency number immediately.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Assessments, Calculators, and Roadmaps</h2>
          <p>
            Interactive tools on this site (assessments, cost calculators, the Care Journey Roadmap, and
            similar features) produce general, informational output based on the answers you provide. They
            are not diagnostic, not a substitute for professional evaluation, and results should be treated
            as a starting point for a conversation with a qualified professional, not a conclusion.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Your Use of the Site</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You agree to use the site lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to it.</li>
            <li>Checklists, worksheets, and downloadable materials are provided for your personal or family caregiving use. You may print and share them with family members involved in the same caregiving situation.</li>
            <li>You may not resell, republish, or redistribute site content commercially without our written permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Accuracy and Availability</h2>
          <p>
            We work to keep content accurate and current, but we make no guarantee that any article,
            checklist, or tool is complete, error-free, or current at the moment you read it. We may
            change, update, or remove content and features at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, iCrestiQ, LLC is not liable for any damages arising
            from your use of, or inability to use, this site or its content, including decisions made
            based on articles, checklists, assessments, calculators, or roadmap results.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">The Future App</h2>
          <p>
            This site may reference or preview a future HarborCare Circle app. Joining the waitlist does
            not obligate you to anything and does not create any agreement beyond receiving updates about
            the app&apos;s launch. Separate terms will apply once the app is available.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Changes to These Terms</h2>
          <p>We may update these terms as the site evolves. Continued use of the site after changes means you accept the updated terms.</p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Contact Us</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:hello@icrestiq.com" className="text-kin-blue underline">hello@icrestiq.com</a>.
            iCrestiQ, LLC is based in Easley, South Carolina.
          </p>
        </section>
      </div>
    </div>
  );
}
