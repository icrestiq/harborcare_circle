import { getArticlesForNavSection } from '../../lib/content';
import CategoryHubView from '../../components/CategoryHubView';

export const metadata = { title: 'Life Transitions | HarborCare Circle' };

export default function LifeTransitionsHubPage() {
  const articles = getArticlesForNavSection('life-transitions').sort((a, b) => a.title.localeCompare(b.title));
  return (
    <CategoryHubView
      title="Life Transitions"
      description="Navigating major changes — hospital stays, moving, driving, and more."
      articles={articles}
    />
  );
}
