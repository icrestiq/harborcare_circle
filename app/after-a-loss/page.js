import { getArticlesForNavSection } from '../../lib/content';
import GroupedHubView from '../../components/GroupedHubView';

export const metadata = { title: 'After a Loss | HarborCare Circle' };

export default function AfterALossHubPage() {
  const articles = getArticlesForNavSection('after-a-loss').sort((a, b) => a.title.localeCompare(b.title));

  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <GroupedHubView
      title="After a Loss"
      description="Practical guidance for the days, weeks, and months after a death."
      categories={categories}
      byCategory={byCategory}
      totalCount={articles.length}
    />
  );
}
