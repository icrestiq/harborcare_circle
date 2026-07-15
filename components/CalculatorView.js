'use client';

import { useState } from 'react';

export default function CalculatorView({ calculator }) {
  const initial = {};
  calculator.fields.forEach((f) => { initial[f.id] = f.default; });
  const [values, setValues] = useState(initial);

  const update = (id, val) => {
    setValues((prev) => ({ ...prev, [id]: Number(val) || 0 }));
  };

  const careCost = values.hours * values.rate * 4.33;
  const total = careCost + values.medical + values.transport + values.other;
  const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

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
              {field.type === 'range' ? (
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
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-warm-gray text-sm">$</span>
                  <input
                    type="number"
                    value={values[field.id]}
                    onChange={(e) => update(field.id, e.target.value)}
                    className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
                  />
                  <span className="text-warm-gray text-sm whitespace-nowrap">
                    {field.unit.replace('$/', '/ ')}
                  </span>
                </div>
              )}
            </div>
          ))}
          <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mt-2">
            {calculator.regionNote}
          </div>
        </div>

        <div className="bg-soft-navy text-white rounded-2xl p-7 md:sticky md:top-24">
          <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">
            Estimated Monthly Total
          </div>
          <div className="text-4xl font-heading font-bold mb-1">{fmt(total)}</div>
          <div className="text-xs text-[#9FB0C0] mb-5">per month, based on your inputs</div>

          <div className="border-t border-[#24405A] pt-4 text-sm space-y-2">
            <div className="flex justify-between text-[#C8D3DF]">
              <span>In-home care</span><span>{fmt(careCost)}</span>
            </div>
            <div className="flex justify-between text-[#C8D3DF]">
              <span>Medical supplies</span><span>{fmt(values.medical)}</span>
            </div>
            <div className="flex justify-between text-[#C8D3DF]">
              <span>Transportation</span><span>{fmt(values.transport)}</span>
            </div>
            <div className="flex justify-between text-[#C8D3DF]">
              <span>Other</span><span>{fmt(values.other)}</span>
            </div>
          </div>

          <div className="bg-teal-tint text-[#00838F] text-xs rounded-lg p-3 mt-5">
            Formula: {calculator.formula}
          </div>

          <div className="flex gap-2 mt-5">
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
