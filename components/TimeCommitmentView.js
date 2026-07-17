'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TimeCommitmentView({ calculator }) {
  const initial = {};
  calculator.fields.forEach((f) => { initial[f.id] = f.default; });
  const [values, setValues] = useState(initial);

  const update = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: Number(val) || 0 }));
  };

  const weeklyTotal = calculator.fields.reduce((sum, f) => sum + (values[f.id] || 0), 0);
  const monthlyTotal = weeklyTotal * 4.33;
  const fullTimePercent = Math.round((weeklyTotal / 40) * 100);

  let contextLine;
  if (weeklyTotal === 0) {
    contextLine = "Add some hours above to see how they add up.";
  } else if (weeklyTotal < 40) {
    contextLine = `That's about ${fullTimePercent}% of a standard 40-hour work week, on top of everything else in your life.`;
  } else {
    contextLine = `That's ${Math.round((weeklyTotal / 40) * 10) / 10}× a standard 40-hour work week — caregiving alone would be more than a full-time job at this pace.`;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-start">
        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-7">
          {calculator.fields.map((field) => (
            <div key={field.id} className="mb-5">
              <label className="block text-sm font-semibold mb-1">{field.label}</label>
              <div className="text-xs text-warm-gray mb-2">{field.hint}</div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  value={values[field.id]}
                  onChange={(e) => update(field.id, e.target.value)}
                  className="w-full accent-kin-blue"
                />
                <span className="text-sm text-warm-gray min-w-[70px]">
                  {values[field.id]} {field.unit}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-soft-navy text-white rounded-2xl p-7 md:sticky md:top-24">
          <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">Estimated Weekly Total</div>
          <div className="text-4xl font-heading font-bold mb-1">{Math.round(weeklyTotal)} hrs</div>
          <div className="text-xs text-[#9FB0C0] mb-5">≈ {Math.round(monthlyTotal)} hours per month</div>

          <div className="border-t border-[#24405A] pt-4 text-sm space-y-2">
            {calculator.fields.map((field) => (
              <div key={field.id} className="flex justify-between text-[#C8D3DF]">
                <span>{field.label}</span>
                <span>{values[field.id]} hrs</span>
              </div>
            ))}
          </div>

          <div className="bg-teal-tint text-[#00838F] text-xs rounded-lg p-3 mt-5">
            {contextLine}
          </div>

          {calculator.relatedTool && (
            <Link
              href={`/${calculator.relatedTool.type}s/${calculator.relatedTool.slug}`}
              className="block bg-white/10 border border-white/30 text-sm px-3 py-2.5 rounded-lg mt-3 text-center hover:bg-white/15"
            >
              🧭 {calculator.relatedTool.name} →
            </Link>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => window.print()}
              className="bg-white/10 border border-white/30 text-sm px-3 py-2 rounded-lg"
            >
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-warm-gray mt-6">{calculator.disclaimer}</p>
    </div>
  );
}
