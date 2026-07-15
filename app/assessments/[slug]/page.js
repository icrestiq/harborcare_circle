import { notFound } from 'next/navigation';
import { getAllAssessmentSlugs, getAssessmentBySlug } from '../../../lib/content';
import AssessmentView from '../../../components/AssessmentView';

export async function generateStaticParams() {
  return getAllAssessmentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const assessment = getAssessmentBySlug(params.slug);
  if (!assessment) return {};
  return { title: `${assessment.title} | HarborCare Circle` };
}

export default function AssessmentPage({ params }) {
  const assessment = getAssessmentBySlug(params.slug);
  if (!assessment) return notFound();
  return <AssessmentView assessment={assessment} />;
}
