import { getRoadmapConfig } from '../../lib/content';
import RoadmapView from '../../components/RoadmapView';

export const metadata = {
  title: 'Care Journey Roadmap | HarborCare Circle',
};

export default function RoadmapPage() {
  const roadmap = getRoadmapConfig();
  return <RoadmapView roadmap={roadmap} />;
}
