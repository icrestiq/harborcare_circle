'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function RoadmapInner({ roadmap }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('stage');
  const [selectedId, setSelectedId] = useState(
    roadmap.stages.some((s) => s.id === preselected) ? preselected : null
  );

  const selected = roadmap.stages.find((s) => s.id === selectedId);

  if (selected) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-heading mb-2">{selected.title}</h1>
        <p className="text-sm text-warm-gray text-center mb-6">{roadmap.caveat}</p>

        {selected.sections.map((section) => (
          <div key={section.heading} className="bg-white border border-[#E7E2D8] rounded-2xl p-6 mb-4">
            <h3 className="text-kin-blue font-semibold text-sm mb-3">{section.heading}</h3>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex gap-2 flex-wrap mt-5">
          <button onClick={() => window.print()} className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg">
            🖨️ Print
          </button>
          <button onClick={() => setSelectedId(null)} className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg">
            ↺ Start over
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
            onClick={() => setSelectedId(stage.id)}
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
