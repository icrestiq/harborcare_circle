'use client';

import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder only — no email service is connected yet.
    // Wire this up to a real provider (Mailchimp, Customer.io, etc.) before
    // this goes live to real visitors.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-tint text-[#00838F] rounded-xl p-6 text-center font-semibold">
        ✓ You&apos;re subscribed — look for your first email soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-[#E7E2D8] rounded-lg px-4 py-3 text-sm flex-1"
      />
      <button
        type="submit"
        className="bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-lg whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
