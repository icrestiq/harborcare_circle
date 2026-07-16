import Link from 'next/link';
import WaitlistForm from '../../components/WaitlistForm';

export const metadata = {
  title: 'Join the App Waitlist | HarborCare Circle',
};

export default async function WaitlistPage({ searchParams }) {
  const params = await searchParams;
  const product = params?.product || '';

  return (
    <div className="max-w-lg mx-auto px-6 py-16 text-center">
      <p className="text-sm text-warm-gray mb-6">
        <Link href="/" className="text-kin-blue underline">Home</Link>
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/app-preview.png"
        alt="Preview of the HarborCare Circle app showing today's medications and upcoming appointments"
        className="w-full max-w-[220px] drop-shadow-xl mx-auto mb-6"
      />
      <h1 className="text-3xl font-heading mb-3">Join the App Waitlist</h1>
      <p className="text-warm-gray mb-8">
        Our apps aren't built yet. Let us know which one you're interested in and leave your
        email, and we'll let you know the moment it's ready — nothing else happens, and there's
        no obligation.
      </p>
      <WaitlistForm defaultProduct={product} />
      <p className="text-xs text-warm-gray mt-6">
        We'll never sell your email or send anything besides this one update.
      </p>
    </div>
  );
}
