import Link from 'next/link';
import { getAllArticles } from '../../lib/content';

export const metadata = {
  title: 'Articles & Guides | HarborCare Circle',
};

export default function ArticlesHubPage() {
  const articles = getAllArticles().sort((a, b) => a.title.localeCompare(b.title));

  // Group by category so 176 articles are actually browsable, not one long wall
  const byCategory = {};
  articles.forEach((a) => {
    const cat = a.category || 'General';
    byCategory[cat] = byCategory[cat] || [];
    byCategory[cat].push(a);
  });
  const categories = Object.keys(byCategory).sort();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-2">
        <Link href="/" className="text-kin-blue underline">Home</Link> / Articles &amp; Guides
      </p>
      <h1 className="text-3xl font-heading mb-2">Articles &amp; Guides</h1>
      <p className="text-warm-gray mb-10">{articles.length} articles, organized by topic.</p>

      {categories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-lg font-heading text-kin-blue mb-4">{cat}</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {byCategory[cat].map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="bg-white border border-[#E7E2D8] rounded-xl p-4 hover:border-care-teal hover:shadow-md transition"
              >
                <h4 className="font-semibold text-sm mb-1">{article.title}</h4>
                <p className="text-xs text-warm-gray">{article.readingTimeMinutes} min read</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
