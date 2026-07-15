import { getArticlesForNavSection } from '../../lib/content';
import CategoryHubView from '../../components/CategoryHubView';

export const metadata = { title: 'After a Loss | HarborCare Circle' };

export default function AfterALossHubPage() {
  const articles = getArticlesForNavSection('after-a-loss').sort((a, b) => a.title.localeCompare(b.title));
  return (
    <CategoryHubView
      title="After a Loss"
      description="Practical guidance for the days, weeks, and months after a death."
      articles={articles}
    />
  );
}
