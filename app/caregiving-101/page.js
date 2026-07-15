import { getArticlesForNavSection } from '../../lib/content';
import CategoryHubView from '../../components/CategoryHubView';

export const metadata = { title: 'Caregiving 101 | HarborCare Circle' };

export default function CaregivingHubPage() {
  const articles = getArticlesForNavSection('caregiving-101').sort((a, b) => a.title.localeCompare(b.title));
  return (
    <CategoryHubView
      title="Caregiving 101"
      description="Evergreen guidance and everyday caregiving fundamentals."
      articles={articles}
      note="This section currently shows evergreen and general-caregiving content — dedicated 'Caregiving 101' articles haven't been drafted yet."
    />
  );
}
