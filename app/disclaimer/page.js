import Link from 'next/link';

export const metadata = {
  title: 'Medical & Legal Disclaimer | HarborCare Circle',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Medical &amp; Legal Disclaimer
      </p>
      <h1 className="text-3xl font-heading mb-2">Medical &amp; Legal Disclaimer</h1>
      <p className="text-sm text-warm-gray mb-8">Last updated: July 2026</p>

      <div className="bg-orange-tint text-[#B15300] rounded-xl p-5 mb-8 text-sm font-medium">
        If you are facing a medical emergency, call 911 (or your local emergency number) right away.
        Do not wait for a response from this website.
      </div>

      <div className="prose-sm space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-heading mb-2">General Information Only</h2>
          <p>
            HarborCare Circle provides general information about caregiving for aging or ill loved ones —
            covering topics like health conditions, care transitions, legal planning steps, and financial
            considerations. This content is educational and organizational in nature. It is not a
            substitute for individualized advice from a qualified professional who knows your family&apos;s
            specific situation.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Not Medical Advice</h2>
          <p>
            Nothing on this site should be used to diagnose, treat, or manage any medical or mental health
            condition, or to make medication decisions. Always talk to a licensed physician, pharmacist,
            or other qualified clinician about symptoms, diagnoses, medications, and treatment — including
            before starting, stopping, or changing anything related to a loved one&apos;s care.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Not Legal Advice</h2>
          <p>
            Content about power of attorney, estate matters, probate, Medicaid, guardianship, or similar
            topics reflects general information only. Laws, forms, and procedures vary significantly by
            state and country, and change over time. Always consult a licensed attorney in the relevant
            jurisdiction before acting on legal matters, especially anything involving power of attorney,
            wills, guardianship, or estate settlement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Not Financial Advice</h2>
          <p>
            Cost estimates, benefit information, and financial planning content are general references, not
            personalized financial or tax advice. Costs, benefit rules, and coverage vary by region,
            provider, and individual circumstances. Consult a financial advisor, accountant, or the relevant
            benefits agency before making financial decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">How Our Content Is Reviewed</h2>
          <p>
            Articles go through an editorial review that checks factual claims against cited, named
            sources (such as government agencies and established health and advocacy organizations).
            This is a citation-and-accuracy review, not a review by a licensed medical, legal, or financial
            professional evaluating your specific situation. Articles touching higher-stakes topics —
            such as medication timing, power of attorney, Medicaid, or hospice pain management — carry
            additional disclaimer language for this reason, and deserve extra caution before you act on them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Assessments, Calculators, and Roadmaps</h2>
          <p>
            Interactive tools produce general, informational results based on the answers you provide.
            They do not diagnose any condition, predict outcomes, or replace a professional evaluation.
            Treat results as a starting point for a conversation with the right professional, not a
            conclusion to act on alone.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">No Professional Relationship</h2>
          <p>
            Using this site does not create a doctor-patient, attorney-client, financial advisory, or any
            other professional relationship between you and iCrestiQ, LLC or HarborCare Circle.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Questions</h2>
          <p>
            Questions about this disclaimer can be sent to{' '}
            <a href="mailto:hello@icrestiq.com" className="text-kin-blue underline">hello@icrestiq.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
