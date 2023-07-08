import Hero from '../components/Hero';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';
import { FEED, getFeed } from '../feeds/rss';

export const revalidate = 60;

export default async function Page() {
  const { items } = await getFeed(FEED.url);

  return (
    <>
      <Hero />
      <h2>All Episodes</h2>
      <div className={styles.gridWrapper}>
        {items.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
    </>
  );
}
