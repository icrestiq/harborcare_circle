'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function RoadmapInner({ roadmap }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('stage');
  const [selectedId, setSelectedId] = useState(
    roadmap.stages.some((s) => s.id === preselected) ? preselected : null
  );

  const selected = roadmap.stages.find((s) => s.id === selectedId);

  const allItemIds = useMemo(() => {
    if (!selected) return [];
    return selected.sections.flatMap((section, sIdx) =>
      section.items.map((_, iIdx) => `${sIdx}-${iIdx}`)
    );
  }, [selected]);

  const [done, setDone] = useState(() => new Set());

  const toggle = (id) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const chooseStage = (id) => {
    setDone(new Set());
    setSelectedId(id);
  };

  const changeStage = () => {
    setDone(new Set());
    setSelectedId(null);
  };

  if (selected) {
    const total = allItemIds.length;
    const completed = [...done].filter((id) => allItemIds.includes(id)).length;
    const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-heading mb-2">{selected.title}</h1>
        <p className="text-sm text-warm-gray text-center mb-6">{roadmap.caveat}</p>

        <div className="w-full h-2.5 bg-[#E7E2D8] rounded-full overflow-hidden my-4">
          <div className="h-full bg-care-teal transition-all" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm text-warm-gray mb-7">
          {completed} of {total} steps checked off
        </p>

        {selected.sections.map((section, sIdx) => (
          <div key={section.heading} className="bg-white border border-[#E7E2D8] rounded-2xl p-6 mb-4">
            <h3 className="text-kin-blue font-semibold text-sm mb-3">{section.heading}</h3>
            <div className="space-y-2">
              {section.items.map((item, iIdx) => {
                const id = `${sIdx}-${iIdx}`;
                return (
                  <label key={id} className="flex gap-3 items-start cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-0.5 flex-shrink-0 accent-care-teal"
                      checked={done.has(id)}
                      onChange={() => toggle(id)}
                    />
                    <span className={`text-sm ${done.has(id) ? 'line-through text-warm-gray' : ''}`}>
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex gap-2 flex-wrap mt-5">
          <button onClick={() => window.print()} className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg">
            🖨️ Print
          </button>
          <button onClick={() => setDone(new Set())} className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg">
            ↺ Reset checkoff
          </button>
          <button onClick={changeStage} className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg">
            ← Choose a different stage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-4">{roadmap.title}</h1>
      <div className="bg-blue-tint rounded-xl p-5 mb-7">
        <p className="text-sm">{roadmap.intro}</p>
      </div>
      <h3 className="text-base font-semibold mb-3.5">{roadmap.prompt}</h3>
      <div className="flex flex-col gap-2.5">
        {roadmap.stages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => chooseStage(stage.id)}
            className="text-left bg-white border-2 border-[#E7E2D8] hover:border-care-teal rounded-xl px-5 py-4 text-sm"
          >
            {stage.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RoadmapView({ roadmap }) {
  return (
    <Suspense fallback={null}>
      <RoadmapInner roadmap={roadmap} />
    </Suspense>
  );
}
