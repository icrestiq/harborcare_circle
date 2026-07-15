import { getArticlesForNavSection } from '../../lib/content';
import CategoryHubView from '../../components/CategoryHubView';

export const metadata = { title: 'Conditions | HarborCare Circle' };

export default function ConditionsHubPage() {
  const articles = getArticlesForNavSection('conditions').sort((a, b) => a.title.localeCompare(b.title));
  return (
    <CategoryHubView
      title="Conditions"
      description="Understanding what a diagnosis or condition means for caregiving."
      articles={articles}
    />
  );
}
