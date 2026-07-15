import Link from 'next/link';

export default function CategoryHubView({ title, description, articles, note }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-2">
        <Link href="/" className="text-kin-blue underline">Home</Link> / {title}
      </p>
      <h1 className="text-3xl font-heading mb-2">{title}</h1>
      <p className="text-warm-gray mb-2">{description}</p>
      {note && (
        <div className="text-xs bg-orange-tint text-[#B15300] rounded-lg px-3 py-2 mb-8 inline-block">
          {note}
        </div>
      )}
      {!note && <div className="mb-8" />}

      {articles.length === 0 ? (
        <div className="bg-white border border-[#E7E2D8] rounded-xl p-8 text-center text-warm-gray">
          No articles here yet — check back soon, or browse{' '}
          <Link href="/articles" className="text-kin-blue underline">all articles</Link>.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {articles.map((article) => (
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
      )}
    </div>
  );
}
