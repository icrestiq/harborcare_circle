import Link from 'next/link';
import { getAllCalculators } from '../../lib/content';

export const metadata = {
  title: 'Calculators | HarborCare Circle',
};

export default function CalculatorsHubPage() {
  const calculators = getAllCalculators().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-2">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Calculators
      </p>
      <h1 className="text-3xl font-heading mb-2">Calculators</h1>
      <p className="text-warm-gray mb-10">
        {calculators.length} free, editable calculators — every number is a starting assumption you can change.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="bg-white border border-[#E7E2D8] rounded-xl p-5 hover:border-care-teal hover:shadow-md transition"
          >
            <span className="inline-block text-xs font-semibold bg-blue-tint text-kin-blue px-2 py-0.5 rounded-full mb-2">
              Calculator
            </span>
            <h4 className="font-semibold text-sm mb-1.5">{calc.title}</h4>
            <p className="text-xs text-warm-gray">{calc.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
