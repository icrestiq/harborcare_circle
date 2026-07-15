import { getArticlesForNavSection } from '../../lib/content';
import GroupedHubView from '../../components/GroupedHubView';

export const metadata = { title: 'Conditions | HarborCare Circle' };

export default function ConditionsHubPage() {
  const articles = getArticlesForNavSection('conditions').sort((a, b) => a.title.localeCompare(b.title));

  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <GroupedHubView
      title="Conditions"
      description="Understanding what a diagnosis or condition means for caregiving."
      categories={categories}
      byCategory={byCategory}
      totalCount={articles.length}
    />
  );
}
