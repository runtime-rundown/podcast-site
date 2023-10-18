import { FEED, getFeed } from '../feeds/rss';
import Hero from '../components/Hero';
import EpisodeCard from '../components/EpisodeCard';
import Episode from '../components/Episode';
import styles from '../styles/Index.module.css';

export const revalidate = 60;

export default async function Home() {
  const { items } = await getFeed(FEED.url);
  const currentEpisode = items[0];
  const {
    content,
    enclosure: { url: src },
    ...episodeDetails
  } = currentEpisode;

  return (
    <>
      <Hero />
      <h2>All Episodes</h2>
      <div className={styles.container}>
        <div className={styles.episodeList}>
          {items.map(item => {
            return <EpisodeCard {...item} key={item.title} />;
          })}
        </div>
        <Episode episodeDetails={episodeDetails} content={content} src={src} />
      </div>
    </>
  );
}
