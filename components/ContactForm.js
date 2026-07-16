'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder only — no email/form service is connected yet.
    // Wire this up to a real provider (Formspree, a backend route, etc.)
    // before this goes live to real visitors.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-tint text-[#00838F] rounded-xl p-6 text-center font-semibold">
        ✓ Thanks — we&apos;ll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        required
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-[#E7E2D8] rounded-lg px-4 py-3 text-sm"
      />
      <input
        type="email"
        required
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-[#E7E2D8] rounded-lg px-4 py-3 text-sm"
      />
      <textarea
        required
        placeholder="How can we help?"
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-[#E7E2D8] rounded-lg px-4 py-3 text-sm resize-none"
      />
      <button
        type="submit"
        className="bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-lg"
      >
        Send Message
      </button>
    </form>
  );
}
