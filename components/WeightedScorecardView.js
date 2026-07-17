'use client';

import { useState, useMemo } from 'react';

let nextId = 300;
function makeId() {
  nextId += 1;
  return 'facility-' + nextId;
}

export default function WeightedScorecardView({ calculator }) {
  const [weights, setWeights] = useState(() => {
    const w = {};
    calculator.factors.forEach((f) => { w[f.id] = f.defaultWeight; });
    return w;
  });

  const [facilities, setFacilities] = useState(() =>
    calculator.defaultFacilityNames.map((name) => ({
      id: makeId(),
      name,
      ratings: Object.fromEntries(calculator.factors.map((f) => [f.id, 3])),
    }))
  );

  const updateWeight = (factorId, val) => {
    setWeights((prev) => ({ ...prev, [factorId]: Number(val) || 0 }));
  };

  const updateRating = (facilityId, factorId, val) => {
    const clamped = Math.max(1, Math.min(5, Number(val) || 1));
    setFacilities((prev) =>
      prev.map((f) =>
        f.id === facilityId ? { ...f, ratings: { ...f.ratings, [factorId]: clamped } } : f
      )
    );
  };

  const updateName = (facilityId, name) => {
    setFacilities((prev) => prev.map((f) => (f.id === facilityId ? { ...f, name } : f)));
  };

  const addFacility = () => {
    if (facilities.length >= 4) return;
    setFacilities((prev) => [
      ...prev,
      {
        id: makeId(),
        name: `Facility ${String.fromCharCode(65 + prev.length)}`,
        ratings: Object.fromEntries(calculator.factors.map((f) => [f.id, 3])),
      },
    ]);
  };

  const removeFacility = (id) => {
    setFacilities((prev) => (prev.length > 2 ? prev.filter((f) => f.id !== id) : prev));
  };

  const scores = useMemo(() => {
    return facilities
      .map((f) => {
        const total = calculator.factors.reduce(
          (sum, factor) => sum + (weights[factor.id] || 0) * (f.ratings[factor.id] || 0),
          0
        );
        return { ...f, total };
      })
      .sort((a, b) => b.total - a.total);
  }, [facilities, weights, calculator.factors]);

  const maxPossible = calculator.factors.reduce((sum, f) => sum + (weights[f.id] || 0) * 5, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="bg-white border border-[#E7E2D8] rounded-2xl p-6 mb-6">
        <div className="bg-blue-tint rounded-xl p-4 mb-5 text-sm">
          <p className="mb-1.5">
            <strong>Step 1 — Slide:</strong> for each factor, drag the slider to show how much
            <em> your family</em> cares about it — 1 means it barely matters to you, 5 means it's a top priority.
            This doesn't rate any facility; it just sets your priorities.
          </p>
          <p>
            <strong>Step 2 — Type a number:</strong> in each facility's column, type how well
            <em> that facility</em> actually performs on that factor — 1 for poor, 5 for excellent.
          </p>
        </div>

        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className="font-heading text-base">Rate each facility</h3>
          {facilities.length < 4 && (
            <button
              onClick={addFacility}
              className="text-xs font-semibold text-kin-blue border border-kin-blue/30 rounded-lg px-2.5 py-1.5"
            >
              + Add facility
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[560px]">
            <thead>
              <tr>
                <th className="text-left font-semibold text-xs text-warm-gray pb-3 pr-3 w-[46%]">
                  Factor — how important is this to you?
                </th>
                {facilities.map((f) => (
                  <th key={f.id} className="pb-3 px-2 text-left">
                    <div className="text-[10px] font-semibold text-warm-gray uppercase tracking-wide mb-1">
                      Rate 1–5
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) => updateName(f.id, e.target.value)}
                        className="border border-[#E7E2D8] rounded-lg px-2 py-1.5 text-xs font-semibold w-full"
                      />
                      {facilities.length > 2 && (
                        <button
                          onClick={() => removeFacility(f.id)}
                          className="text-warm-gray hover:text-connection-orange text-xs flex-shrink-0"
                          title="Remove"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calculator.factors.map((factor) => (
                <tr key={factor.id} className="border-t border-[#F0ECE3]">
                  <td className="py-2.5 pr-3">
                    <div className="text-[13px] mb-1">{factor.label}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-warm-gray whitespace-nowrap">Importance:</span>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={weights[factor.id]}
                        onChange={(e) => updateWeight(factor.id, e.target.value)}
                        className="w-full accent-connection-orange"
                      />
                      <span className="text-xs font-semibold text-connection-orange w-4 text-right">{weights[factor.id]}</span>
                    </div>
                  </td>
                  {facilities.map((f) => (
                    <td key={f.id} className="py-2.5 px-2">
                      <input
                        type="number"
                        min={1}
                        max={5}
                        value={f.ratings[factor.id]}
                        onChange={(e) => updateRating(f.id, factor.id, e.target.value)}
                        className="border border-[#E7E2D8] rounded-lg px-2 py-1.5 text-sm w-16 text-center"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-warm-gray mt-3">
          Sliders = how much you care about it. Numbers in each facility's column = how that facility scores (1 poor – 5 excellent).
        </p>
      </div>

      <div className="bg-soft-navy text-white rounded-2xl p-7">
        <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-4">Results, Ranked</div>
        <div className="space-y-3">
          {scores.map((f, i) => (
            <div key={f.id} className="flex items-center gap-4">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? 'bg-connection-orange text-white' : 'bg-white/10 text-[#9FB0C0]'
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{f.name || 'Unnamed'}</div>
                <div className="w-full h-2 bg-white/10 rounded-full mt-1.5 overflow-hidden">
                  <div
                    className="h-full bg-care-teal rounded-full"
                    style={{ width: `${maxPossible > 0 ? (f.total / maxPossible) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div className="text-lg font-heading font-bold w-16 text-right">{f.total}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-6">
          <button onClick={() => window.print()} className="bg-white/10 border border-white/30 text-sm px-3 py-2 rounded-lg">
            🖨️ Print
          </button>
        </div>
      </div>

      <p className="text-xs text-warm-gray mt-6">{calculator.disclaimer}</p>
    </div>
  );
}