'use client';

import { useState } from 'react';

function FieldInput({ field, value, onChange }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold mb-1">{field.label}</label>
      <div className="text-xs text-warm-gray mb-2">{field.hint}</div>
      {field.type === 'range' ? (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={field.min}
            max={field.max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            className="w-full accent-kin-blue"
          />
          <span className="text-sm text-warm-gray min-w-[70px]">
            {value} {field.unit}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-warm-gray text-sm">$</span>
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
          />
          <span className="text-warm-gray text-sm whitespace-nowrap">{field.unit.replace('$/', '/ ')}</span>
        </div>
      )}
    </div>
  );
}

export default function PathComparisonView({ calculator }) {
  const initial = (fields) => {
    const obj = {};
    fields.forEach((f) => { obj[f.id] = f.default; });
    return obj;
  };

  const [home, setHome] = useState(initial(calculator.homeCare.fields));
  const [living, setLiving] = useState(initial(calculator.assistedLiving.fields));

  const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

  const homeCareCost = home.hours * home.rate * 4.33;
  const homeTotal = homeCareCost + home.homeCosts + home.otherHome;

  const livingTotal = living.baseRate + living.careLevel + living.otherFacility;

  const diff = Math.abs(homeTotal - livingTotal);
  const cheaper = homeTotal < livingTotal ? 'home' : 'living';

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-6">
          <h3 className="font-heading text-base mb-4 text-kin-blue">{calculator.homeCare.label}</h3>
          {calculator.homeCare.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={home[field.id]}
              onChange={(v) => setHome((prev) => ({ ...prev, [field.id]: v }))}
            />
          ))}
        </div>

        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-6">
          <h3 className="font-heading text-base mb-4 text-care-teal">{calculator.assistedLiving.label}</h3>
          {calculator.assistedLiving.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={living[field.id]}
              onChange={(v) => setLiving((prev) => ({ ...prev, [field.id]: v }))}
            />
          ))}
        </div>
      </div>

      <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mb-6">
        {calculator.regionNote}
      </div>

      <div className="bg-soft-navy text-white rounded-2xl p-7">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">{calculator.homeCare.label}</div>
            <div className="text-3xl font-heading font-bold mb-3">{fmt(homeTotal)}<span className="text-sm font-normal text-[#9FB0C0]"> / month</span></div>
            <div className="text-sm space-y-1.5 text-[#C8D3DF]">
              <div className="flex justify-between"><span>In-home care</span><span>{fmt(homeCareCost)}</span></div>
              <div className="flex justify-between"><span>Existing home costs</span><span>{fmt(home.homeCosts)}</span></div>
              <div className="flex justify-between"><span>Other costs</span><span>{fmt(home.otherHome)}</span></div>
            </div>
          </div>
          <div className="md:border-l md:border-[#24405A] md:pl-6">
            <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">{calculator.assistedLiving.label}</div>
            <div className="text-3xl font-heading font-bold mb-3">{fmt(livingTotal)}<span className="text-sm font-normal text-[#9FB0C0]"> / month</span></div>
            <div className="text-sm space-y-1.5 text-[#C8D3DF]">
              <div className="flex justify-between"><span>Base rate</span><span>{fmt(living.baseRate)}</span></div>
              <div className="flex justify-between"><span>Care level add-on</span><span>{fmt(living.careLevel)}</span></div>
              <div className="flex justify-between"><span>Other fees</span><span>{fmt(living.otherFacility)}</span></div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#24405A] mt-6 pt-4 text-sm text-[#C8D3DF]">
          Based on these numbers, {cheaper === 'home' ? calculator.homeCare.label : calculator.assistedLiving.label} costs about{' '}
          <strong className="text-white">{fmt(diff)} less per month</strong> than the other option.
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

      <p className="text-xs text-warm-gray mt-6">{calculator.disclaimer}</p>
    </div>
  );
}
