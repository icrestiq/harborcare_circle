import Link from 'next/link';
import { getAllChecklists } from '../../lib/content';

export const metadata = {
  title: 'Checklists | HarborCare Circle',
};

export default function ChecklistsHubPage() {
  const checklists = getAllChecklists().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-2">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Checklists
      </p>
      <h1 className="text-3xl font-heading mb-2">Checklists</h1>
      <p className="text-warm-gray mb-10">{checklists.length} interactive, printable checklists.</p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {checklists.map((checklist) => {
          const taskCount = checklist.groups.reduce((n, g) => n + g.tasks.length, 0);
          return (
            <Link
              key={checklist.slug}
              href={`/checklists/${checklist.slug}`}
              className="bg-white border border-[#E7E2D8] rounded-xl p-4 hover:border-care-teal hover:shadow-md transition"
            >
              <span className="inline-block text-xs font-semibold bg-orange-tint text-[#B15300] px-2 py-0.5 rounded-full mb-2">
                Checklist
              </span>
              <h4 className="font-semibold text-sm mb-1">{checklist.title}</h4>
              <p className="text-xs text-warm-gray">{taskCount} tasks · Printable</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
