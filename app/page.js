import Link from 'next/link';
import { Compass, Map, Building2, Wallet, Brain, HeartHandshake, FileText, ListChecks } from 'lucide-react';
import { getAllArticles, getAllChecklists } from '../lib/content';

const JOURNEY_OPTIONS = [
  { label: 'My parent may need help', sub: 'Take the Care Readiness Assessment', Icon: Compass, illustration: 'instant_support_elxh', color: 'blue', href: '/assessments/care-readiness-assessment' },
  { label: 'We need to organize family caregiving', sub: 'Build a Care Journey Roadmap', Icon: Map, illustration: 'time_management_30iu', color: 'teal', href: '/roadmap' },
  { label: 'My loved one is in the hospital', sub: 'Open the Hospital Admission checklist', Icon: Building2, illustration: 'doctors_hwty', color: 'orange', href: '/checklists/hospital-admission' },
  { label: 'We are considering assisted living', sub: 'Estimate monthly caregiving costs', Icon: Wallet, illustration: 'house_searching_n8mp', color: 'blue', href: '/calculators/monthly-cost-estimator' },
  { label: 'I am caring for someone with dementia', sub: 'Explore the Conditions hub', Icon: Brain, illustration: 'mindfulness_scgo', color: 'teal', href: '/conditions#conditions-i-cognitive-neurological' },
  { label: 'A loved one recently passed away', sub: 'Start the After-a-Loss roadmap', Icon: HeartHandshake, illustration: 'together_j0gj', color: 'orange', href: '/roadmap?stage=loss' },
];

const CARD_COLORS = {
  blue: { bg: 'bg-blue-tint', text: 'text-kin-blue', border: 'border-t-kin-blue' },
  teal: { bg: 'bg-teal-tint', text: 'text-care-teal', border: 'border-t-care-teal' },
  orange: { bg: 'bg-orange-tint', text: 'text-connection-orange', border: 'border-t-connection-orange' },
};

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
        <h1 className="font-heading font-extrabold text-white text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto">
          Caregiving Is Hard. <br />
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
        <div className="grid md:grid-cols-3 gap-5">
          {JOURNEY_OPTIONS.map((opt) => {
            const c = CARD_COLORS[opt.color];
            const { Icon } = opt;
            return (
              <Link
                key={opt.label}
                href={opt.href}
                className={`group bg-white border border-[#E7E2D8] border-t-4 ${c.border} rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200`}
              >
                <div className={`h-28 ${c.bg} flex items-center justify-center`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/illustrations/${opt.illustration}.svg`} alt="" className="h-24" />
                </div>
                <div className="p-5">
                  <Icon className={`w-5 h-5 ${c.text} mb-3`} strokeWidth={2} />
                  <h3 className="font-semibold text-[15px] mb-1 leading-snug">{opt.label}</h3>
                  <p className="text-xs text-warm-gray mb-3">{opt.sub}</p>
                  <span className={`text-xs font-semibold ${c.text} inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Get started <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-care-teal font-semibold text-sm uppercase tracking-wide mb-2">
          Latest
        </p>
        <h2 className="text-center text-2xl font-heading mb-9">From the resource hub</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {articles.slice(0, 2).map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-white border border-[#E7E2D8] border-t-4 border-t-kin-blue rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              <div className="h-24 bg-blue-tint flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/illustrations/notes1_cf55.svg" alt="" className="h-20" />
              </div>
              <div className="p-5">
                <FileText className="w-4 h-4 text-kin-blue mb-2" strokeWidth={2} />
                <span className="inline-block text-xs font-semibold bg-teal-tint text-[#00838F] px-2 py-0.5 rounded-full mb-2">
                  {article.category}
                </span>
                <h4 className="font-semibold text-sm mb-1.5 leading-snug">{article.title}</h4>
                <p className="text-xs text-warm-gray">{article.readingTimeMinutes} min read</p>
              </div>
            </Link>
          ))}
          {checklists.slice(0, 1).map((checklist) => (
            <Link
              key={checklist.slug}
              href={`/checklists/${checklist.slug}`}
              className="group bg-white border border-[#E7E2D8] border-t-4 border-t-connection-orange rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              <div className="h-24 bg-orange-tint flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/illustrations/checklist_7q37.svg" alt="" className="h-20" />
              </div>
              <div className="p-5">
                <ListChecks className="w-4 h-4 text-connection-orange mb-2" strokeWidth={2} />
                <span className="inline-block text-xs font-semibold bg-orange-tint text-[#B15300] px-2 py-0.5 rounded-full mb-2">
                  Checklist
                </span>
                <h4 className="font-semibold text-sm mb-1.5 leading-snug">{checklist.title}</h4>
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
        <div className="bg-blue-tint rounded-2xl p-6 md:p-10 shadow-[0_20px_45px_-15px_rgba(16,42,67,0.35)] border border-white/60">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="inline-block bg-orange-tint text-[#B15300] text-xs font-semibold px-3 py-1 rounded-full">
              Coming Soon
            </span>
          </div>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
            <div className="text-left">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/app-preview.png"
                alt="Preview of the HarborCare Circle app showing today's medications and upcoming appointments"
                className="w-full max-w-[240px] drop-shadow-xl mb-6 mx-auto block"
              />
              <h2 className="text-2xl font-heading mb-3">The HarborCare Circle App</h2>
              <p className="text-sm text-soft-navy mb-5 leading-relaxed">
                HarborCare Circle App is a family care coordination platform designed to help families
                stay organized, connected, and informed while caring for aging loved ones. From managing
                appointments, medications, tasks, and important documents to navigating hospitalizations,
                life transitions, and after-loss responsibilities, HarborCare Circle brings everything
                together in one secure place. Our mission is to reduce stress, improve communication, and
                help families confidently navigate caregiving and life's most important transitions —
                together.
              </p>
              <p className="text-sm text-soft-navy">
                It isn't built yet. Joining the waitlist just means we'll email you when it's ready —
                nothing else happens, and there's no obligation.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <Link
                href="/waitlist"
                className="inline-block bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-[0_8px_16px_-4px_rgba(255,122,33,0.5)]"
              >
                Join the App Waitlist
              </Link>
              <div
                className="bg-[#FFFDF5] rounded-sm p-6 text-sm shadow-[3px_4px_12px_rgba(16,42,67,0.18)] rotate-1 w-full"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Assign checklist tasks to family members</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>See who's handled what, in real time</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Keep documents in one secure place</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Coordinate medications &amp; appointments</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Share updates with your whole family circle</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Get gentle reminders for what's next</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section id="legacy-circle-app" className="max-w-6xl mx-auto px-6 pb-16 scroll-mt-24">
        <div className="bg-blue-tint rounded-2xl p-6 md:p-10 shadow-[0_20px_45px_-15px_rgba(16,42,67,0.35)] border border-white/60">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="inline-block bg-orange-tint text-[#B15300] text-xs font-semibold px-3 py-1 rounded-full mb-5">
              Scheduled for Release: End of 2026
            </span>
          </div>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
            <div className="text-left">
              <h2 className="text-2xl font-heading mb-3">Legacy Circle App</h2>
              <p className="text-sm text-soft-navy mb-5 leading-relaxed">
                Legacy Circle App helps families preserve the stories, memories, and experiences
                that make every life unique. Through recorded interviews, voice recordings, family
                recipes, photographs, videos, and personal stories, Legacy Circle creates a lasting
                digital archive that can be shared across generations. Powered by AI organization
                and storytelling tools, it transforms treasured memories into a searchable family
                legacy, ensuring that important moments, wisdom, traditions, and family history are
                never lost.
              </p>
              <p className="text-sm text-soft-navy">
                It isn't built yet. Joining the waitlist just means we'll email you when it's ready —
                nothing else happens, and there's no obligation.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <Link
                href="/waitlist?product=legacy-circle"
                className="inline-block bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-[0_8px_16px_-4px_rgba(255,122,33,0.5)]"
              >
                Join the App Waitlist
              </Link>
              <div
                className="bg-[#FFFDF5] rounded-sm p-6 text-sm shadow-[3px_4px_12px_rgba(16,42,67,0.18)] rotate-1 w-full"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Preserve stories, memories &amp; experiences</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Recorded interviews &amp; voice recordings</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Family recipes, photos &amp; videos</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Personal stories, safely archived</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="continuity-circle-kit" className="max-w-6xl mx-auto px-6 pb-16 scroll-mt-24">
        <div className="bg-blue-tint rounded-2xl p-6 md:p-10 shadow-[0_20px_45px_-15px_rgba(16,42,67,0.35)] border border-white/60">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="inline-block bg-orange-tint text-[#B15300] text-xs font-semibold px-3 py-1 rounded-full mb-5">
              Due: Mid Q1 2027
            </span>
          </div>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
            <div className="text-left">
              <h2 className="text-2xl font-heading mb-3">Continuity Circle Kit</h2>
              <p className="text-sm text-soft-navy mb-5 leading-relaxed">
                Continuity Circle Kit Document Organizer is a guided family information system
                designed to keep life's most important documents organized, accessible, and
                protected. From insurance policies, wills, powers of attorney, and medical
                information to financial accounts, property records, and emergency contacts, the
                organizer helps families gather critical information in one secure location before
                it's urgently needed. Whether preparing for an unexpected emergency, supporting
                aging parents, or simplifying estate and executor responsibilities, Continuity
                Circle Kit provides a clear, structured roadmap that helps families stay organized,
                reduce stress, and ensure important information is never lost when it matters most.
              </p>
              <p className="text-sm text-soft-navy">
                It isn't built yet. Joining the waitlist just means we'll email you when it's ready —
                nothing else happens, and there's no obligation.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5">
              <Link
                href="/waitlist?product=continuity-circle-kit"
                className="inline-block bg-connection-orange text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-[0_8px_16px_-4px_rgba(255,122,33,0.5)]"
              >
                Join the App Waitlist
              </Link>
              <div
                className="bg-[#FFFDF5] rounded-sm p-6 text-sm shadow-[3px_4px_12px_rgba(16,42,67,0.18)] rotate-1 w-full"
                style={{ fontFamily: "'Kalam', cursive" }}
              >
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Insurance, wills, POA &amp; medical info organized</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Financial accounts &amp; property records in one place</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>Emergency contacts, ready when needed</span>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <span className="text-care-teal font-bold text-lg leading-none">✓</span>
                    <span>A clear roadmap for estate &amp; executor tasks</span>
                  </div>
                </div>
              </div>
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