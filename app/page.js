import Link from 'next/link';
import { getAllArticles, getAllChecklists } from '../lib/content';

const JOURNEY_OPTIONS = [
  { label: 'My parent may need help', href: '/assessments/care-readiness-assessment' },
  { label: 'We need to organize family caregiving', href: '/roadmap' },
  { label: 'My loved one is in the hospital', href: '/checklists/hospital-admission' },
  { label: 'We are considering assisted living', href: '/calculators/monthly-cost-estimator' },
  { label: 'I am caring for someone with dementia', href: '/conditions/dementia' },
  { label: 'A loved one recently passed away', href: '/roadmap?stage=loss' },
];

export default function HomePage() {
  const articles = getAllArticles();
  const checklists = getAllChecklists();

  return (
    <>
      <section className="relative isolate overflow-hidden text-center px-6 pt-24 pb-20">
        <div className="absolute inset-0 -z-10 bg-soft-navy" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-soft-navy/40 via-soft-navy/25 to-soft-navy/60" />
        <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl leading-tight max-w-3xl mx-auto">
          Caregiving Is Hard. <br className="hidden md:block" />
          Staying Coordinated Shouldn&apos;t Be.
        </h1>
        <p className="text-[#DCE6EF] max-w-xl mx-auto mt-5 text-lg">
          Find practical guidance, checklists, and tools for caring for aging loved ones —
          from the first signs they need help through major family transitions.
        </p>
        <div className="flex gap-4 justify-center flex-wrap mt-8">
          <Link href="#journey" className="bg-kin-blue text-white font-semibold px-6 py-3 rounded-xl">
            Find the Help You Need
          </Link>
          <Link
            href="/waitlist"
            className="bg-white/10 border border-white/70 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Join the HarborCare Circle Waitlist
          </Link>
        </div>
      </section>

      <section id="journey" className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-care-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Start Here
        </p>
        <h2 className="text-center text-2xl font-heading mb-9">What brings you here today?</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {JOURNEY_OPTIONS.map((opt) => (
            <Link
              key={opt.label}
              href={opt.href}
              className="bg-white border border-[#E7E2D8] rounded-2xl p-6 text-left hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              <span className="block w-2.5 h-2.5 rounded-full bg-care-teal mb-3" />
              <h3 className="font-semibold text-sm">{opt.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-care-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Latest
        </p>
        <h2 className="text-center text-2xl font-heading mb-9">From the resource hub</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white border border-[#E7E2D8] rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-20 bg-blue-tint" />
              <div className="p-4">
                <span className="inline-block text-xs font-semibold bg-teal-tint text-[#00838F] px-2 py-0.5 rounded-full mb-2">
                  {article.category}
                </span>
                <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                <p className="text-xs text-warm-gray">{article.readingTimeMinutes} min read</p>
              </div>
            </Link>
          ))}
          {checklists.map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/checklists/${checklist.slug}`}
              className="bg-white border border-[#E7E2D8] rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-20 bg-orange-tint" />
              <div className="p-4">
                <span className="inline-block text-xs font-semibold bg-orange-tint text-[#B15300] px-2 py-0.5 rounded-full mb-2">
                  Checklist
                </span>
                <h4 className="font-semibold text-sm mb-1">{checklist.title}</h4>
                <p className="text-xs text-warm-gray">{checklist.groups.reduce((n, g) => n + g.tasks.length, 0)} tasks · Printable</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-soft-navy text-white rounded-2xl p-10 grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-1">Reviewed content</h4>
            <p className="text-sm text-[#B9C6D3]">
              Sensitive topics are checked against real, cited sources before publishing.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Always free</h4>
            <p className="text-sm text-[#B9C6D3]">
              Every article, checklist, and tool on this site is free to use — no account required.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Never fear-based</h4>
            <p className="text-sm text-[#B9C6D3]">
              We give you practical next steps, not alarming statistics or guilt.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
