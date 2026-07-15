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
        <div className="absolute inset-0 -z-20 overflow-hidden bg-soft-navy">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
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
            href="#app-waitlist"
            className="bg-white/10 border border-white/70 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Join the HarborCare Circle App Waitlist
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
          {articles.slice(0, 2).map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="bg-white border border-[#E7E2D8] rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-20 bg-blue-tint flex items-center justify-center text-3xl">📄</div>
              <div className="p-4">
                <span className="inline-block text-xs font-semibold bg-teal-tint text-[#00838F] px-2 py-0.5 rounded-full mb-2">
                  {article.category}
                </span>
                <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                <p className="text-xs text-warm-gray">{article.readingTimeMinutes} min read</p>
              </div>
            </Link>
          ))}
          {checklists.slice(0, 1).map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/checklists/${checklist.slug}`}
              className="bg-white border border-[#E7E2D8] rounded-2xl overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-20 bg-orange-tint flex items-center justify-center text-3xl">✅</div>
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
        <div className="flex justify-center gap-6 mt-8">
          <Link href="/articles" className="text-sm font-semibold text-kin-blue underline">
            See all {articles.length} articles →
          </Link>
          <Link href="/checklists" className="text-sm font-semibold text-kin-blue underline">
            See all {checklists.length} checklists →
          </Link>
        </div>
      </section>

      <section id="app-waitlist" className="max-w-6xl mx-auto px-6 pb-16 scroll-mt-24">
        <div className="bg-blue-tint rounded-2xl p-10 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <span className="inline-block bg-white text-kin-blue text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Coming Later
            </span>
            <h2 className="text-2xl font-heading mb-3">The HarborCare Circle App</h2>
            <p className="text-sm text-soft-navy mb-3 leading-relaxed">
              This website's articles, checklists, and tools are free and always will be. The
              HarborCare Circle app is a separate, future product that turns this same content into
              something families can actually coordinate together — assigning checklist tasks to
              specific family members, tracking who's already handled what in real time, and keeping
              a shared record instead of scattered texts and sticky notes.
            </p>
            <p className="text-sm text-soft-navy mb-5 leading-relaxed">
              It isn't built yet. Joining the waitlist just means we'll email you when it's ready —
              nothing else happens, and there's no obligation.
            </p>
            <Link
              href="/waitlist"
              className="inline-block bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-xl"
            >
              Join the App Waitlist
            </Link>
          </div>
          <div className="bg-white rounded-xl p-6 text-sm space-y-3">
            <div className="flex gap-2 items-start">
              <span>✅</span>
              <span>Turn any checklist into tasks assigned to specific family members</span>
            </div>
            <div className="flex gap-2 items-start">
              <span>👀</span>
              <span>See who's already handled what, in real time</span>
            </div>
            <div className="flex gap-2 items-start">
              <span>📁</span>
              <span>Keep documents and notes in one shared, secure place</span>
            </div>
          </div>
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
