'use client';

import { useState, useMemo } from 'react';

function YesNoToggle({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[
        { v: true, label: 'Yes' },
        { v: false, label: 'No' },
      ].map((opt) => (
        <button
          key={String(opt.v)}
          onClick={() => onChange(opt.v)}
          className={`text-sm font-semibold px-4 py-2 rounded-lg border ${
            value === opt.v
              ? 'bg-kin-blue text-white border-kin-blue'
              : 'bg-white text-warm-gray border-[#E7E2D8]'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function DependentCheckerView({ calculator }) {
  const [citizenOrResident, setCitizenOrResident] = useState(true);
  const [jointReturnIssue, setJointReturnIssue] = useState(false);
  const [grossIncomeLimit, setGrossIncomeLimit] = useState(calculator.defaultGrossIncomeLimit);
  const [parentIncome, setParentIncome] = useState(0);
  const [yourSupport, setYourSupport] = useState(0);
  const [totalSupport, setTotalSupport] = useState(0);

  const supportPercent = totalSupport > 0 ? (yourSupport / totalSupport) * 100 : 0;
  const incomeTestPasses = parentIncome <= grossIncomeLimit;
  const supportTestPasses = totalSupport > 0 && supportPercent > 50;

  const result = useMemo(() => {
    if (!citizenOrResident) {
      return {
        tone: 'no',
        headline: 'Likely No',
        reason: 'Your parent must be a U.S. citizen, U.S. national, or a resident of the U.S., Canada, or Mexico to be claimed.',
      };
    }
    if (jointReturnIssue) {
      return {
        tone: 'no',
        headline: 'Likely No',
        reason: "A parent generally can't be claimed as a dependent if they file a joint return with a spouse — except in narrow cases where the joint return is filed only to claim a refund and neither spouse would owe tax filing separately.",
      };
    }
    if (!incomeTestPasses) {
      return {
        tone: 'no',
        headline: 'Likely No',
        reason: `Your parent's gross income ($${parentIncome.toLocaleString()}) appears to be over the limit for this test ($${grossIncomeLimit.toLocaleString()}). Some income types are excluded from this count — worth double-checking what counts as "gross income" before ruling it out.`,
      };
    }
    if (totalSupport === 0) {
      return {
        tone: 'unknown',
        headline: 'Add support amounts to see a result',
        reason: 'Enter what you contributed and your parent\'s total support from all sources below.',
      };
    }
    if (!supportTestPasses) {
      return {
        tone: 'no',
        headline: 'Likely No',
        reason: `Based on these numbers, you provided about ${Math.round(supportPercent)}% of your parent's support — the test requires more than 50%. If several family members share support costs, a multiple support agreement might still let one of you claim your parent.`,
      };
    }
    return {
      tone: 'yes',
      headline: 'Likely Yes',
      reason: `Your parent appears to meet the general tests: citizenship/residency, gross income under the limit, and you provided more than half their support (about ${Math.round(supportPercent)}%). A parent doesn't need to live with you to qualify, unlike some other relatives.`,
    };
  }, [citizenOrResident, jointReturnIssue, incomeTestPasses, supportTestPasses, totalSupport, supportPercent, parentIncome, grossIncomeLimit]);

  const toneStyles = {
    yes: 'bg-teal-tint text-[#00838F]',
    no: 'bg-orange-tint text-[#B15300]',
    unknown: 'bg-white/10 text-[#C8D3DF]',
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{calculator.title}</h1>
      <p className="text-sm text-warm-gray mb-8">{calculator.summary}</p>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-7 items-start">
        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-7">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Is your parent a U.S. citizen, U.S. national, or a resident of the U.S., Canada, or Mexico?
            </label>
            <YesNoToggle value={citizenOrResident} onChange={setCitizenOrResident} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Does your parent file a joint tax return with a spouse (other than only to claim a refund)?
            </label>
            <YesNoToggle value={jointReturnIssue} onChange={setJointReturnIssue} />
          </div>

          <div className="mb-6 pt-5 border-t border-[#F0ECE3]">
            <label className="block text-sm font-semibold mb-1">This year's gross income limit</label>
            <div className="text-xs text-warm-gray mb-2">{calculator.grossIncomeLimitHint}</div>
            <div className="flex items-center gap-2">
              <span className="text-warm-gray text-sm">$</span>
              <input
                type="number"
                value={grossIncomeLimit}
                onChange={(e) => setGrossIncomeLimit(Number(e.target.value) || 0)}
                className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-1">Your parent's gross income this year</label>
            <div className="text-xs text-warm-gray mb-2">Most taxable income counts — some, like certain Social Security, generally doesn't.</div>
            <div className="flex items-center gap-2">
              <span className="text-warm-gray text-sm">$</span>
              <input
                type="number"
                value={parentIncome}
                onChange={(e) => setParentIncome(Number(e.target.value) || 0)}
                className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm w-full"
              />
            </div>
          </div>

          <div className="pt-5 border-t border-[#F0ECE3]">
            <label className="block text-sm font-semibold mb-1">The support test</label>
            <div className="text-xs text-warm-gray mb-3">You must have provided more than half your parent's total support for the year.</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-warm-gray mb-1">What you contributed</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-warm-gray text-sm">$</span>
                  <input
                    type="number"
                    value={yourSupport}
                    onChange={(e) => setYourSupport(Number(e.target.value) || 0)}
                    className="border border-[#E7E2D8] rounded-lg px-2.5 py-2 text-sm w-full"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-warm-gray mb-1">Total support, all sources</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-warm-gray text-sm">$</span>
                  <input
                    type="number"
                    value={totalSupport}
                    onChange={(e) => setTotalSupport(Number(e.target.value) || 0)}
                    className="border border-[#E7E2D8] rounded-lg px-2.5 py-2 text-sm w-full"
                  />
                </div>
              </div>
            </div>
            <div className="text-xs text-warm-gray mt-1.5">
              Include your parent's own funds (savings, benefits, etc.) in the total.
            </div>
          </div>
        </div>

        <div className="bg-soft-navy text-white rounded-2xl p-7 md:sticky md:top-24">
          <div className="text-xs uppercase tracking-wide text-[#9FB0C0] mb-2">Result</div>
          <div className={`rounded-xl p-4 font-semibold text-base mb-3 ${toneStyles[result.tone]}`}>
            {result.headline}
          </div>
          <p className="text-sm text-[#C8D3DF] leading-relaxed">{result.reason}</p>

          {totalSupport > 0 && (
            <div className="border-t border-[#24405A] mt-5 pt-4 text-sm text-[#C8D3DF]">
              <div className="flex justify-between mb-1">
                <span>Your share of support</span>
                <span className="font-semibold text-white">{Math.round(supportPercent)}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-care-teal rounded-full"
                  style={{ width: `${Math.min(100, supportPercent)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-5">
            <button onClick={() => window.print()} className="bg-white/10 border border-white/30 text-sm px-3 py-2 rounded-lg">
              🖨️ Print
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs text-warm-gray mt-6">{calculator.disclaimer}</p>
    </div>
  );
}
