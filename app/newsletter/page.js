import Link from 'next/link';
import NewsletterForm from '../../components/NewsletterForm';

export const metadata = {
  title: 'Newsletter | HarborCare Circle',
};

export default function NewsletterPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16 text-center">
      <p className="text-sm text-warm-gray mb-6">
        <Link href="/" className="text-kin-blue underline">Home</Link>
      </p>
      <h1 className="text-3xl font-heading mb-3">Get One Helpful Email a Week</h1>
      <p className="text-warm-gray mb-8">
        No daily noise, no sales pressure — just one practical article, checklist, or tool each
        week, picked for wherever you are in the caregiving journey right now.
      </p>

      <div className="grid sm:grid-cols-3 gap-3 text-left text-sm mb-8">
        <div className="bg-blue-tint rounded-xl p-4">
          <p className="font-semibold mb-1">Practical, not preachy</p>
          <p className="text-warm-gray">Real next steps, no guilt or scare tactics.</p>
        </div>
        <div className="bg-teal-tint rounded-xl p-4">
          <p className="font-semibold mb-1">Matched to your stage</p>
          <p className="text-warm-gray">Content follows where your family is right now.</p>
        </div>
        <div className="bg-orange-tint rounded-xl p-4">
          <p className="font-semibold mb-1">Easy to leave</p>
          <p className="text-warm-gray">Unsubscribe anytime, one click, no hard feelings.</p>
        </div>
      </div>

      <NewsletterForm />

      <p className="text-xs text-warm-gray mt-6">
        We&apos;ll never sell your email or send anything besides this weekly note.
      </p>
    </div>
  );
}
