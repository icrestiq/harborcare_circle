import { notFound } from 'next/navigation';
import { getAllCalculatorSlugs, getCalculatorBySlug } from '../../../lib/content';
import CalculatorView from '../../../components/CalculatorView';
import FamilyCostSharingView from '../../../components/FamilyCostSharingView';
import PathComparisonView from '../../../components/PathComparisonView';

export async function generateStaticParams() {
  return getAllCalculatorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) return {};
  return { title: `${calculator.title} | HarborCare Circle` };
}

export default function CalculatorPage({ params }) {
  const calculator = getCalculatorBySlug(params.slug);
  if (!calculator) return notFound();
  if (calculator.type === 'cost-sharing') {
    return <FamilyCostSharingView calculator={calculator} />;
  }
  if (calculator.type === 'path-comparison') {
    return <PathComparisonView calculator={calculator} />;
  }
  return <CalculatorView calculator={calculator} />;
}
