'use client';

import { useState, useMemo } from 'react';

const SPLIT_METHODS = [
  { id: 'equal', label: 'Split evenly' },
  { id: 'income', label: 'Split by income' },
  { id: 'custom', label: 'Custom percentages' },
];

let nextId = 100;
function makeId() {
  nextId += 1;
  return 'member-' + nextId;
}

export default function FamilyCostSharingView({ calculator }) {
  const [totalCost, setTotalCost] = useState(calculator.defaultTotalMonthlyCost);
  const [method, setMethod] = useState('equal');
  const [members, setMembers] = useState(() =>
    calculator.defaultMembers.map((m) => ({
      id: makeId(),
      name: m.name,
      income: m.income,
      percent: Math.round(100 / calculator.defaultMembers.length),
    }))
  );

  const fmt = (n) => `$${Math.round(n).toLocaleString()}`;

  const updateMember = (id, field, value) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: field === 'name' ? value : Number(value) || 0 } : m))
    );
  };

  const addMember = () => {
    setMembers((prev) => [
      ...prev,
      { id: makeId(), name: `Family member ${prev.length + 1}`, income: 60000, percent: 0 },
    ]);
  };

  const removeMember = (id) => {
    setMembers((prev) => (prev.length > 1 ? prev.filter((m) => m.id !== id) : prev));
  };

  const percentTotal = useMemo(
    () => members.reduce((sum, m) => sum + (Number(m.percent) || 0), 0),
    [members]
  );

  const shares = useMemo(() => {
    if (method === 'equal') {
      const each = totalCost / members.length;
      return members.map((m) => ({ ...m, share: each }));
    }
    if (method === 'income') {
      const incomeTotal = members.reduce((sum, m) => sum + (Number(m.income) || 0), 0);
      if (incomeTotal === 0) return members.map((m) => ({ ...m, share: 0 }));
      return members.map((m) => ({ ...m, share: (m.income / incomeTotal) * totalCost }));
    }
    // custom
    return members.map((m) => ({ ...m, share: (m.percent / 100) * totalCost }));
  }, [method, members, totalCost]);

  const normalizePercents = () => {
    if (percentTotal === 0) return;
    setMembers((prev) =>
      prev.map((m) => ({ ...m, percent: Math.round(((Number(m.percent) || 0) / percentTotal) * 100) }))
    );
  };

  const customIsOff = method === 'custom' && percentTotal !== 100;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-start">
        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-7">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Total monthly caregiving cost</label>
            <div className="text-xs text-warm-gray mb-2">
              Use your own number, or a total from the Monthly Cost Estimator.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-warm-gray text-sm">$</span>
              <input
                type="number"
                value={totalCost}
                onChange={(e) => setTotalCost(Number(e.target.value) || 0)}
                className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
              />
              <span className="text-warm-gray text-sm whitespace-nowrap">/ month</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">How should this be split?</label>
            <div className="flex flex-wrap gap-2">
              {SPLIT_METHODS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`text-xs font-semibold px-3 py-2 rounded-lg border ${
                    method === opt.id
                      ? 'bg-kin-blue text-white border-kin-blue'
                      : 'bg-white text-warm-gray border-[#E7E2D8]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold">Family members</label>
              <button
                onClick={addMember}
                className="text-xs font-semibold text-kin-blue border border-kin-blue/30 rounded-lg px-2.5 py-1"
              >
                + Add person
              </button>
            </div>

            {members.map((m) => (
              <div key={m.id} className="border border-[#E7E2D8] rounded-xl p-3.5 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={m.name}
                    onChange={(e) => updateMember(m.id, 'name', e.target.value)}
                    className="border border-[#E7E2D8] rounded-lg px-2.5 py-1.5 text-sm font-semibold flex-1"
                  />
                  {members.length > 1 && (
                    <button
                      onClick={() => removeMember(m.id)}
                      className="text-xs text-warm-gray border border-[#E7E2D8] rounded-lg px-2 py-1.5"
                      title="Remove"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {method === 'income' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-warm-gray">Annual income $</span>
                    <input
                      type="number"
                      value={m.income}
                      onChange={(e) => updateMember(m.id, 'income', e.target.value)}
                      className="border border-[#E7E2D8] rounded-lg px-2.5 py-1.5 text-sm w-full"
                    />
                  </div>
                )}

                {method === 'custom' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-warm-gray">Share</span>
                    <input
                      type="number"
                      value={m.percent}
                      onChange={(e) => updateMember(m.id, 'percent', e.target.value)}
                      className="border border-[#E7E2D8] rounded-lg px-2.5 py-1.5 text-sm w-20"
                    />
                    <span className="text-xs text-warm-gray">%</span>
                  </div>
                )}
              </div>
            ))}

            {customIsOff && (
              <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mt-1 flex items-center justify-between gap-2">
                <span>Percentages add up to {percentTotal}%, not 100%.</span>
                <button onClick={normalizePercents} className="font-semibold underline whitespace-nowrap">
                  Fix automatically
                </button>
              </div>
            )}
          </div>

          <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mt-4">
            {calculator.regionNote}
          </div>
        </div>

        <div className="bg-soft-navy text-white rounded-2xl p-7 md:sticky md:top-24">
          <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">Monthly Share, By Person</div>
          <div className="text-4xl font-heading font-bold mb-1">{fmt(totalCost)}</div>
          <div className="text-xs text-[#9FB0C0] mb-5">total split {members.length} ways</div>

          <div className="border-t border-[#24405A] pt-4 text-sm space-y-3">
            {shares.map((m) => (
              <div key={m.id} className="flex justify-between text-[#C8D3DF]">
                <span>{m.name || 'Unnamed'}</span>
                <span className="font-semibold text-white">{fmt(m.share)}</span>
              </div>
            ))}
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
