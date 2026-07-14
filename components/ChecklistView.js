'use client';

import { useMemo, useState } from 'react';

export default function ChecklistView({ checklist }) {
  const allTaskIds = useMemo(
    () => checklist.groups.flatMap((g) => g.tasks.map((t) => t.id)),
    [checklist]
  );
  const [done, setDone] = useState(() => new Set());

  const toggle = (id) => {
    setDone((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const reset = () => setDone(new Set());

  const total = allTaskIds.length;
  const completed = done.size;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex justify-between items-start flex-wrap gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-heading">{checklist.title}</h1>
          <p className="text-warm-gray text-sm mt-1">{checklist.summary}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="bg-white border border-[#E7E2D8] text-sm font-medium px-3 py-2 rounded-lg"
          >
            🖨️ Print
          </button>
          <button
            onClick={reset}
            className="bg-white border border-[#E7E2D8] text-sm font-medium px-3 py-2 rounded-lg"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <div className="w-full h-2.5 bg-[#E7E2D8] rounded-full overflow-hidden my-4">
        <div
          className="h-full bg-care-teal transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm text-warm-gray mb-7">
        {completed} of {total} tasks complete
      </p>

      {checklist.groups.map((group) => (
        <div key={group.name} className="mb-7">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-kin-blue mb-3">
            {group.name}
          </h3>
          {group.tasks.map((task) => (
            <label
              key={task.id}
              className="flex gap-3 items-start bg-white border border-[#E7E2D8] rounded-xl p-4 mb-2.5 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 flex-shrink-0 accent-care-teal"
                checked={done.has(task.id)}
                onChange={() => toggle(task.id)}
              />
              <div>
                <div
                  className={`font-semibold text-sm mb-1 ${
                    done.has(task.id) ? 'line-through text-warm-gray' : ''
                  }`}
                >
                  {task.title}
                </div>
                <p className="text-sm text-warm-gray mb-1">{task.explanation}</p>
                <div className="flex gap-3 text-xs text-warm-gray flex-wrap">
                  {task.timing && <span>⏱ {task.timing}</span>}
                  {task.who && <span>👤 {task.who}</span>}
                </div>
                {task.jurisdictionNote && (
                  <div className="inline-block text-xs bg-orange-tint text-[#B15300] px-2 py-1 rounded mt-2">
                    {task.jurisdictionNote}
                  </div>
                )}
              </div>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
