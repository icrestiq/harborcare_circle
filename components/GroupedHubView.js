'use client';

import Link from 'next/link';

function slugifyCategory(cat) {
  return cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export default function GroupedHubView({
  title,
  description,
  categories,
  byCategory,
  totalCount,
  note,
}) {
  const jumpTo = (e) => {
    const id = e.target.value;
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-2">
        <Link href="/" className="text-kin-blue underline">Home</Link> / {title}
      </p>
      <h1 className="text-3xl font-heading mb-2">{title}</h1>
      <p className="text-warm-gray mb-2">
        {description} {totalCount} {totalCount === 1 ? 'article' : 'articles'} total.
      </p>
      {note && (
        <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mb-6 inline-block">
          {note}
        </div>
      )}

      {totalCount === 0 ? (
        <div className="bg-white border border-[#E7E2D8] rounded-xl p-8 text-center text-warm-gray mt-6">
          No articles here yet — browse{' '}
          <Link href="/articles" className="text-kin-blue underline">all articles</Link> instead.
        </div>
      ) : (
        <>
          <div className="mb-10 sticky top-[73px] z-10 bg-warm-cream py-3 -mx-6 px-6 border-b border-[#E7E2D8]">
            <label className="text-sm font-semibold mr-3">Jump to a topic:</label>
            <select
              onChange={jumpTo}
              defaultValue=""
              className="border border-[#E7E2D8] rounded-lg px-3 py-2 text-sm bg-white"
            >
              <option value="" disabled>Choose a topic…</option>
              {categories.map((cat) => (
                <option key={cat} value={slugifyCategory(cat)}>
                  {cat} ({byCategory[cat].length})
                </option>
              ))}
            </select>
          </div>

          {categories.map((cat) => (
            <div key={cat} id={slugifyCategory(cat)} className="mb-10 scroll-mt-32">
              <h2 className="text-lg font-heading font-bold text-soft-navy mb-4 pb-2 border-b-2 border-care-teal inline-block">
                {cat}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {byCategory[cat].map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="bg-white border border-[#E7E2D8] rounded-xl p-4 hover:border-care-teal hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-sm mb-1 text-soft-navy">{article.title}</h4>
                    <p className="text-xs text-warm-gray">{article.readingTimeMinutes} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
