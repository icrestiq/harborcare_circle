import Link from 'next/link';

export const metadata = {
  title: 'About | HarborCare Circle',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <p className="text-sm text-warm-gray mb-6">
        <Link href="/" className="text-kin-blue underline">Home</Link> / About
      </p>

      <h1 className="text-3xl font-heading mb-4">Coordinated Care for Aging Parents, Without the Chaos</h1>
      <p className="text-lg text-soft-navy mb-10 leading-relaxed">
        HarborCare Circle exists because caregiving is hard enough without also having to
        piece together answers from a dozen different tabs, forums, and half-remembered
        conversations with a doctor. We built a single, trustworthy place to start.
      </p>

      <div className="space-y-10 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-heading mb-3">Why this exists</h2>
          <p className="mb-3">
            Most families don&apos;t get a warning before caregiving starts. A parent has a fall,
            a diagnosis changes everything, or a phone call at 2am means the next year of your
            life looks nothing like you planned. In that moment, what people need isn&apos;t
            another wall of medical jargon — it&apos;s a calm, practical next step.
          </p>
          <p>
            HarborCare Circle is a free resource hub for adult children, spouses, and family
            members caring for aging or ill loved ones — covering everything from the first
            signs a parent needs help, through hospital stays, dementia, assisted living,
            hospice, and what comes after a loss.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading mb-3">How we work</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-blue-tint rounded-xl p-5">
              <h4 className="font-semibold mb-1.5">Reviewed content</h4>
              <p className="text-warm-gray">
                Every factual claim is checked against a real, cited, named source before publishing.
              </p>
            </div>
            <div className="bg-teal-tint rounded-xl p-5">
              <h4 className="font-semibold mb-1.5">Always free</h4>
              <p className="text-warm-gray">
                Every article, checklist, assessment, and calculator here is free — no account required.
              </p>
            </div>
            <div className="bg-orange-tint rounded-xl p-5">
              <h4 className="font-semibold mb-1.5">Never fear-based</h4>
              <p className="text-warm-gray">
                We give you practical next steps, written in plain language — not alarming
                statistics or guilt.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading mb-3">What we&apos;re not</h2>
          <p>
            HarborCare Circle doesn&apos;t diagnose, prescribe, or replace a conversation with a
            doctor, attorney, or financial advisor. Rules and procedures vary by state, country,
            institution, and family circumstances — we aim to get you oriented and ready to ask
            the right questions, not to make the decision for you. See our{' '}
            <Link href="/disclaimer" className="text-kin-blue underline">Medical &amp; Legal Disclaimer</Link>{' '}
            for the full picture.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading mb-3">Who&apos;s behind this</h2>
          <p>
            HarborCare Circle is built by <strong>iCrestiQ, LLC</strong>, based in Easley, South
            Carolina. We&apos;re building toward a small family of tools that follow the full
            caregiving journey — from the first signs of needing help, through active caregiving,
            to settling an estate afterward — starting with this free resource site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-heading mb-3">Get in touch</h2>
          <p>
            Questions, corrections, or something you wish we covered?{' '}
            <Link href="/contact" className="text-kin-blue underline">Contact us</Link> — we read everything.
          </p>
        </section>
      </div>
    </div>
  );
}
