'use client';

import { useState, useMemo } from 'react';

let nextId = 200;
function makeId() {
  nextId += 1;
  return 'entry-' + nextId;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function ExpenseTrackerView({ calculator }) {
  const [mileageRate, setMileageRate] = useState(calculator.defaultMileageRate);
  const [entries, setEntries] = useState([]);

  const [draftDate, setDraftDate] = useState(todayStr());
  const [draftDesc, setDraftDesc] = useState('');
  const [draftType, setDraftType] = useState('mileage');
  const [draftValue, setDraftValue] = useState('');

  const fmt = (n) => `$${n.toFixed(2)}`;

  const addEntry = () => {
    const value = Number(draftValue) || 0;
    if (!draftDesc.trim() || value <= 0) return;
    setEntries((prev) => [
      ...prev,
      { id: makeId(), date: draftDate, description: draftDesc.trim(), type: draftType, value },
    ]);
    setDraftDesc('');
    setDraftValue('');
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const entryCost = (e) => (e.type === 'mileage' ? e.value * mileageRate : e.value);

  const mileageTotal = useMemo(
    () => entries.filter((e) => e.type === 'mileage').reduce((s, e) => s + e.value, 0),
    [entries]
  );
  const grandTotal = useMemo(() => entries.reduce((s, e) => s + entryCost(e), 0), [entries, mileageRate]);

  const exportCSV = () => {
    const header = 'Date,Description,Type,Miles or Amount,Cost\n';
    const rows = entries
      .map((e) => {
        const typeLabel = e.type === 'mileage' ? 'Mileage' : 'Expense';
        const rawVal = e.type === 'mileage' ? `${e.value} mi` : `$${e.value.toFixed(2)}`;
        return `${e.date},"${e.description.replace(/"/g, '""')}",${typeLabel},${rawVal},$${entryCost(e).toFixed(2)}`;
      })
      .join('\n');
    const csv = header + rows + `\n\nTotal,,,,$${grandTotal.toFixed(2)}\n`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'caregiving-expense-log.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="bg-white border border-[#E7E2D8] rounded-2xl p-7 mb-6">
        <label className="block text-sm font-semibold mb-1">Mileage rate</label>
        <div className="text-xs text-warm-gray mb-2">{calculator.mileageRateHint}</div>
        <div className="flex items-center gap-2 max-w-[180px]">
          <span className="text-warm-gray text-sm">$</span>
          <input
            type="number"
            step="0.01"
            value={mileageRate}
            onChange={(e) => setMileageRate(Number(e.target.value) || 0)}
            className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
          />
          <span className="text-warm-gray text-sm whitespace-nowrap">/ mile</span>
        </div>
      </div>

      <div className="bg-white border border-[#E7E2D8] rounded-2xl p-7 mb-6">
        <h3 className="font-heading text-base mb-4">Add an entry</h3>
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs font-semibold text-warm-gray mb-1">Date</label>
            <input
              type="date"
              value={draftDate}
              onChange={(e) => setDraftDate(e.target.value)}
              className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-warm-gray mb-1">Type</label>
            <select
              value={draftType}
              onChange={(e) => setDraftType(e.target.value)}
              className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
            >
              <option value="mileage">Mileage (trip)</option>
              <option value="expense">Out-of-pocket expense</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label className="block text-xs font-semibold text-warm-gray mb-1">Description</label>
          <input
            type="text"
            value={draftDesc}
            onChange={(e) => setDraftDesc(e.target.value)}
            placeholder={draftType === 'mileage' ? 'e.g. Drove to cardiology appointment' : 'e.g. Pharmacy co-pay'}
            className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
          />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-warm-gray mb-1">
              {draftType === 'mileage' ? 'Miles driven' : 'Amount ($)'}
            </label>
            <input
              type="number"
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
            />
          </div>
          <button
            onClick={addEntry}
            className="bg-connection-orange text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap"
          >
            + Add Entry
          </button>
        </div>
      </div>

      <div className="bg-soft-navy text-white rounded-2xl p-7">
        <div className="flex justify-between items-start mb-5 flex-wrap gap-3">
          <div>
            <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-1">Total Logged</div>
            <div className="text-4xl font-heading font-bold">{fmt(grandTotal)}</div>
            <div className="text-xs text-[#9FB0C0] mt-1">
              {mileageTotal > 0 && `${mileageTotal} miles logged · `}{entries.length} entries
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="bg-white/10 border border-white/30 text-sm px-3 py-2 rounded-lg">
              ⬇️ Export CSV
            </button>
            <button onClick={() => window.print()} className="bg-white/10 border border-white/30 text-sm px-3 py-2 rounded-lg">
              🖨️ Print
            </button>
          </div>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-[#9FB0C0] italic border-t border-[#24405A] pt-4">
            No entries yet — add your first trip or expense above.
          </p>
        ) : (
          <div className="border-t border-[#24405A] pt-4 space-y-2">
            {entries.map((e) => (
              <div key={e.id} className="flex items-center justify-between text-sm gap-3">
                <div className="min-w-0">
                  <div className="text-white truncate">{e.description}</div>
                  <div className="text-xs text-[#9FB0C0]">
                    {e.date} · {e.type === 'mileage' ? `${e.value} mi` : 'expense'}
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-semibold">{fmt(entryCost(e))}</span>
                  <button onClick={() => removeEntry(e.id)} className="text-[#9FB0C0] hover:text-white text-xs">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-warm-gray mt-6">{calculator.disclaimer}</p>
    </div>
  );
}
