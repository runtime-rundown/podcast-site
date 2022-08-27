import { FEED, getFeed } from '../feeds/rss';
import EpisodeCard from '../components/EpisodeCard';

export default function Home({ feed, items }) {
  return (
    <>
      {items.map(item => {
        return <EpisodeCard {...item} key={item.title} />;
      })}
    </>
  );
}

export async function getStaticProps({ params }) {
  const detailedFeed = await getFeed(FEED.url);

  return {
    props: {
      feed: FEED,
      items: detailedFeed.items,
    },
    revalidate: 1,
  };
}
