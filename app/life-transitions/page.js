import { getArticlesForNavSection } from '../../lib/content';
import GroupedHubView from '../../components/GroupedHubView';

export const metadata = { title: 'Life Transitions | HarborCare Circle' };

export default function LifeTransitionsHubPage() {
  const articles = getArticlesForNavSection('life-transitions').sort((a, b) => a.title.localeCompare(b.title));

  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <GroupedHubView
      title="Life Transitions"
      description="Navigating major changes — hospital stays, moving, driving, and more."
      categories={categories}
      byCategory={byCategory}
      totalCount={articles.length}
    />
  );
}
