import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-[#E7E2D8] sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 gap-4">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold text-lg text-soft-navy flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="HarborCare Circle logo" className="w-9 h-9 flex-shrink-0" />
          <span className="flex items-baseline gap-1.5 whitespace-nowrap">
            HarborCare Circle
            <span className="font-mono text-xs font-normal text-warm-gray tracking-tight hidden lg:inline">
              by iCrestiQ
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-4 lg:gap-5 text-[13px] lg:text-sm font-medium whitespace-nowrap">
          <Link href="/articles" className="text-soft-navy hover:text-kin-blue">Articles</Link>
          <Link href="/caregiving-101" className="text-soft-navy hover:text-kin-blue">Caregiving 101</Link>
          <Link href="/conditions" className="text-soft-navy hover:text-kin-blue">Conditions</Link>
          <Link href="/life-transitions" className="text-soft-navy hover:text-kin-blue">Life Transitions</Link>
          <Link href="/after-a-loss" className="text-soft-navy hover:text-kin-blue">After a Loss</Link>
          <Link href="/checklists" className="text-soft-navy hover:text-kin-blue">Checklists</Link>
        </nav>

        <Link
          href="/#app-waitlist"
          className="bg-connection-orange text-white text-xs lg:text-sm font-semibold px-3 lg:px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0"
        >
          Join the App Waitlist
        </Link>
      </div>
    </header>
  );
}
