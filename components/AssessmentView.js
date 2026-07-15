'use client';

import { useState } from 'react';

export default function AssessmentView({ assessment }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  const total = assessment.questions.length;
  const current = assessment.questions[index];

  const select = (optionIndex) => {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const back = () => {
    if (index > 0) setIndex(index - 1);
  };

  const restart = () => {
    setIndex(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const score = answers.reduce((sum, a) => sum + (a ?? 0), 0);
    const result = assessment.results.find((r) => score <= r.maxScore);

    return (
      <div className="max-w-xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#E7E2D8] rounded-2xl p-9 text-center">
          <span className="inline-block bg-teal-tint text-[#00838F] font-semibold text-xs px-4 py-1.5 rounded-full mb-4">
            {result.badge}
          </span>
          <h2 className="text-2xl font-heading mb-3">{result.title}</h2>
          <p className="text-warm-gray max-w-md mx-auto mb-6">{result.body}</p>

          <div className="bg-blue-tint rounded-xl p-6 text-left mb-6">
            <h4 className="text-xs font-semibold uppercase text-kin-blue mb-3">
              Recommended Next Steps
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {assessment.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-warm-gray mb-6">{assessment.disclaimer}</p>

          <button
            onClick={restart}
            className="bg-white border border-[#E7E2D8] text-sm font-medium px-4 py-2 rounded-lg"
          >
            ↺ Retake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading mb-1">{assessment.title}</h1>
      <p className="text-sm text-warm-gray mb-6">{assessment.summary}</p>

      <div className="w-full h-2 bg-[#E7E2D8] rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-kin-blue transition-all"
          style={{ width: `${((index + 1) / total) * 100}%` }}
        />
      </div>
      <p className="text-sm text-warm-gray mb-8">Question {index + 1} of {total}</p>

      <div className="bg-white border border-[#E7E2D8] rounded-2xl p-8">
        <div className="text-xs font-semibold uppercase text-care-teal mb-2">
          Question {index + 1}
        </div>
        <h2 className="text-xl mb-6">{current.question}</h2>

        <div className="flex flex-col gap-2.5">
          {current.options.map((opt, i) => (
            <button
              key={opt}
              onClick={() => select(i)}
              className={`text-left w-full rounded-lg px-4 py-3.5 text-sm border-2 transition ${
                answers[index] === i
                  ? 'border-kin-blue bg-blue-tint font-semibold'
                  : 'border-transparent bg-warm-cream hover:border-care-teal'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-7">
          <button
            onClick={back}
            disabled={index === 0}
            className="text-sm font-medium text-warm-gray disabled:opacity-30"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
