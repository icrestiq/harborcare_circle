import { getArticlesForNavSection } from '../../lib/content';
import GroupedHubView from '../../components/GroupedHubView';

export const metadata = { title: 'Caregiving 101 | HarborCare Circle' };

export default function CaregivingHubPage() {
  const articles = getArticlesForNavSection('caregiving-101').sort((a, b) => a.title.localeCompare(b.title));

  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.subcategory || a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <GroupedHubView
      title="Caregiving 101"
      description="The fundamentals — getting started, getting organized, and everyday support."
      categories={categories}
      byCategory={byCategory}
      totalCount={articles.length}
    />
  );
}
