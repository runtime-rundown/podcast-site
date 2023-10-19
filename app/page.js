import { FEED, getFeed } from '../feeds/rss';
import Hero from '../components/Hero';
import Search from '../components/Search';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';

export const revalidate = 60;

export default async function Home() {
  const { items } = await getFeed(FEED.url);

  return (
    <>
      <Hero />
      <Search episodes={items} />
      <h2>All Episodes</h2>
      <div className={styles.gridWrapper}>
        {items.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
    </>
  );
}
