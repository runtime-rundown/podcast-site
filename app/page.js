import Home from './home-page';
import { FEED, getFeed } from '../feeds/rss';

export const revalidate = 60;

export default async function Page() {
  const detailedFeed = await getFeed(FEED.url);

  return <Home feed={FEED} items={detailedFeed.items} />;
}
