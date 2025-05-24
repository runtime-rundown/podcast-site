import { FEED, getFeed } from '../feeds/rss';
import Hero from '../components/Hero';
import Search from '../components/Search';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';
import { processEpisodes } from '../utils/search';

export const revalidate = 62;

export default async function Home() {
  const { items: episodes } = await getFeed(FEED.url);

  // Do this work on the server to avoid memoizing on the client
  const { trie, episodeMap, searchTerms } = processEpisodes(episodes);

  return (
    <>
      <Hero />
      <div className={styles.episodesHeader}>
        <h2>All Episodes</h2>
        <Search trie={trie} searchTerms={searchTerms} episodeMap={episodeMap} />
      </div>
      <div className={styles.gridWrapper}>
        {episodes.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
    </>
  );
}
