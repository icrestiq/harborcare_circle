import Link from 'next/link';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contact | HarborCare Circle',
};

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-16">
      <p className="text-sm text-warm-gray mb-6">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Contact
      </p>

      <h1 className="text-3xl font-heading mb-3">Contact Us</h1>
      <p className="text-warm-gray mb-8">
        Questions, corrections to an article, or something you wish we covered? We read every
        message. For anything urgent involving your own health or safety, please call 911 or
        your local emergency number instead of writing in.
      </p>

      <ContactForm />

      <div className="mt-10 pt-8 border-t border-[#E7E2D8] text-sm text-warm-gray">
        <p className="mb-1">You can also reach us directly:</p>
        <p>
          <a href="mailto:hello@icrestiq.com" className="text-kin-blue underline">hello@icrestiq.com</a>
        </p>
        <p className="mt-1">iCrestiQ, LLC · Easley, South Carolina</p>
      </div>
    </div>
  );
}
