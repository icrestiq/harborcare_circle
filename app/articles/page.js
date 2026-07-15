import { getAllArticles } from '../../lib/content';
import ArticlesHubView from '../../components/ArticlesHubView';

export const metadata = {
  title: 'Articles & Guides | HarborCare Circle',
};

export default function ArticlesHubPage() {
  const articles = getAllArticles().sort((a, b) => a.title.localeCompare(b.title));

  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <ArticlesHubView
      categories={categories}
      byCategory={byCategory}
      totalCount={articles.length}
    />
  );
}
