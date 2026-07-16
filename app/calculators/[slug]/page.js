import { notFound } from 'next/navigation';
import { getAllCalculatorSlugs, getCalculatorBySlug } from '../../../lib/content';
import CalculatorView from '../../../components/CalculatorView';
import FamilyCostSharingView from '../../../components/FamilyCostSharingView';

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
  return <CalculatorView calculator={calculator} />;
}
