import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticleSlugs, getArticleBySlug } from '../../../lib/content';

// Pre-render every known article at build time — this is what makes the
// site fast and cheap to host: no database round-trip per page view.
export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.seoTitle || article.title,
    description: article.metaDescription,
  };
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <p className="text-sm text-warm-gray mb-4">
        <Link href="/" className="text-kin-blue underline">Home</Link> / {article.category}
      </p>

      <h1 className="text-3xl font-heading mb-2">{article.title}</h1>
      <p className="text-lg text-warm-gray mb-3">{article.summary}</p>
      <div className="flex gap-4 text-xs text-warm-gray mb-6 flex-wrap">
        {article.reviewer && <span>📝 Reviewed by {article.reviewer}</span>}
        <span>🗓️ Updated {article.lastUpdated}</span>
        <span>⏱️ {article.readingTimeMinutes} min read</span>
      </div>

      <div className="bg-blue-tint rounded-xl p-5 mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-kin-blue mb-2">
          What You Need to Know
        </h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {article.whatYouNeedToKnow.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-[#E7E2D8] rounded-xl p-5 mb-8 text-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-warm-gray mb-2">
          In This Article
        </h4>
        {article.tableOfContents.map((h, i) => (
          <div key={h} className="mb-1">{i + 1}. {h}</div>
        ))}
      </div>

      {article.body.map((section) => (
        <div key={section.heading} className="mb-6">
          <h2 className="text-xl font-heading mt-8 mb-3">{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 leading-relaxed">{p}</p>
          ))}
        </div>
      ))}

      <div className="bg-teal-tint rounded-xl p-6 my-8">
        <h3 className="font-semibold mb-3">Practical next steps</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          {article.nextSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>

      {article.relatedTool && (
        <Link
          href={`/${article.relatedTool.type}s/${article.relatedTool.slug}`}
          className="flex items-center gap-4 bg-white border border-[#E7E2D8] rounded-xl p-4 my-8"
        >
          <div className="w-11 h-11 rounded-lg bg-orange-tint flex items-center justify-center text-xl flex-shrink-0">
            🧭
          </div>
          <div className="flex-1">
            <div className="font-semibold text-sm">{article.relatedTool.name}</div>
          </div>
          <span className="text-sm font-semibold text-kin-blue">Open →</span>
        </Link>
      )}

      <div className="bg-gray-100 border-l-4 border-warm-gray rounded-xl p-5 text-sm text-warm-gray mb-8">
        <h4 className="text-xs font-semibold uppercase text-warm-gray mb-2">A note on this article</h4>
        <p>{article.disclaimer}</p>
      </div>

      <h4 className="text-xs font-semibold text-warm-gray mb-2">Sources</h4>
      <ul className="text-sm text-warm-gray space-y-1">
        {article.sources.map((s) => (
          <li key={s.name}>
            <a href={s.url} className="underline" target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
