import Link from 'next/link';

export const metadata = {
  title: 'Content Ratings | HarborCare Circle',
};

export default function ContentRatingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Content Ratings
      </p>
      <h1 className="text-3xl font-heading mb-2">Content Ratings</h1>
      <p className="text-sm text-warm-gray mb-8">Last updated: July 2026</p>

      <div className="prose-sm space-y-6 text-sm leading-relaxed">
        <p>
          This page describes the nature of the content on HarborCare Circle and in the upcoming
          HarborCare Circle app, for the purpose of app store content rating questionnaires (such as
          Apple&apos;s App Store and Google Play). It is a self-assessment based on our own content; we
          will update it with the official rating once assigned by each store.
        </p>

        <section>
          <h2 className="text-lg font-heading mb-2">Content Description</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Articles, checklists, assessments, and calculators about caregiving for aging or ill family members.</li>
            <li>Discussion of medical conditions (such as dementia, Parkinson&apos;s, stroke, cancer, and heart disease) at a general, caregiver-facing level — not clinical or graphic detail.</li>
            <li>Discussion of death, dying, hospice, and grief in a practical, supportive, non-graphic way. No depictions of violence, gore, or graphic medical procedures.</li>
            <li>No sexual content, profanity, gambling, or content restricted to adult audiences.</li>
            <li>No user-generated public content, chat, or social features at this time — all content is authored or reviewed by iCrestiQ, LLC.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Sensitive Topics Present</h2>
          <p>
            Because this app addresses end-of-life caregiving, some content covers topics that can be
            emotionally difficult — serious illness, hospice, death, and grief. This content is written
            to be calm, practical, and supportive rather than graphic or alarming, consistent with our
            editorial voice guidelines.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-heading mb-2">Self-Assessed Rating Guidance</h2>
          <p>
            Based on the content described above, we expect this app to qualify for the lowest available
            age tiers on major app stores (for example, 4+ on the App Store or Everyone on Google Play),
            subject to each platform&apos;s own questionnaire and final determination.
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
