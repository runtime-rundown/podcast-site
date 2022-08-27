import { FEED, getFeed } from '../feeds/rss';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';

export default function Home({ feed, items }) {
  return (
    <>
      <h2>All Episodes</h2>
      <div className={styles.gridWrapper}>
        {items.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
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
