import Link from 'next/link';

export const metadata = {
  title: 'Target Audience | HarborCare Circle',
};

export default function TargetAudiencePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Target Audience
      </p>
      <h1 className="text-3xl font-heading mb-2">Target Audience</h1>
      <p className="text-sm text-warm-gray mb-8">Last updated: July 2026</p>

      <div className="prose-sm space-y-6 text-sm leading-relaxed">
        <p>
          This page defines who HarborCare Circle is built for, for the purpose of app store submission
          requirements (such as Google Play&apos;s target audience declaration) and to be transparent
          with visitors about who this resource is designed to serve.
        </p>

        <section>
          <h2 className="text-lg font-heading mb-2">Primary Audience</h2>
          <p>
            HarborCare Circle is built for adults — typically ages 35 to 75 — who are caring for an aging
            or ill loved one. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>Adult children caring for aging parents</li>
            <li>Siblings coordinating care from different locations</li>
            <li>Spouses and partners caring for one another</li>
            <li>Family members and close friends navigating hospitalization, dementia, assisted living, hospice, or bereavement</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Secondary Audience</h2>
          <p>
            Care managers, social workers, senior living professionals, and elder law or estate
            professionals may also find these resources useful when supporting families, though the site
            is not written primarily for a clinical or professional audience.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Not Intended For Children</h2>
          <p>
            HarborCare Circle is designed for adults. It is not directed at, marketed to, or designed for
            children, and we do not knowingly collect information from children under 13. If a young
            person is helping care for a family member and finds their way here, the content remains
            appropriate and non-graphic, but it is not built with a younger audience&apos;s needs, reading
            level, or attention span in mind.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Questions</h2>
          <p>
            Questions about this page can be sent to{' '}
            <a href="mailto:hello@icrestiq.com" className="text-kin-blue underline">hello@icrestiq.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
