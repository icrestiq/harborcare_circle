'use client';

import { useState } from 'react';

const PRODUCT_OPTIONS = [
  { value: 'all', label: 'All of the products' },
  { value: 'legacy-circle', label: 'Legacy Circle App' },
  { value: 'harborcare-circle', label: 'HarborCare Circle App' },
  { value: 'continuity-circle-kit', label: 'Continuity Circle Kit' },
];

export default function WaitlistForm({ defaultProduct = '' }) {
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState(
    PRODUCT_OPTIONS.some((o) => o.value === defaultProduct) ? defaultProduct : 'all'
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder only — no email service is connected yet.
    // Wire this up to a real provider (Mailchimp, Customer.io, etc.)
    // before this goes live to real visitors, passing both email and product.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-teal-tint text-[#00838F] rounded-xl p-6 text-center font-semibold">
        ✓ You're on the list — we'll email you when it's ready.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <select
        required
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="border border-[#E7E2D8] rounded-lg px-4 py-3 text-sm bg-white"
        aria-label="Which product are you interested in?"
      >
        {PRODUCT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="flex flex-col sm:flex-row gap-3">
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
          Join the Waitlist
        </button>
      </div>
    </form>
  );
}
