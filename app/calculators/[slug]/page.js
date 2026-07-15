import { notFound } from 'next/navigation';
import { getAllCalculatorSlugs, getCalculatorBySlug } from '../../../lib/content';
import CalculatorView from '../../../components/CalculatorView';

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
  return <CalculatorView calculator={calculator} />;
}
