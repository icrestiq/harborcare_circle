import { notFound } from 'next/navigation';
import { getAllChecklistSlugs, getChecklistBySlug } from '../../../lib/content';
import ChecklistView from '../../../components/ChecklistView';

export async function generateStaticParams() {
  return getAllChecklistSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const checklist = getChecklistBySlug(params.slug);
  if (!checklist) return {};
  return { title: `${checklist.title} | HarborCare Circle` };
}

export default function ChecklistPage({ params }) {
  const checklist = getChecklistBySlug(params.slug);
  if (!checklist) return notFound();

  return <ChecklistView checklist={checklist} />;
}
