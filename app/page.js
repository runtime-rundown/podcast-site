import { FEED, getFeed } from '../feeds/rss';
import Hero from '../components/Hero';
import Search from '../components/Search';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';

export const revalidate = 60;

// TODO: Write tests for these trie functions
/**
 * @typedef SearchTerms
 * @type {Object.<string, Set<string>>}
 */

/**
 * @param {import('../feeds/rss').FeedItem[]} Array of feed items
 * @returns {SearchTerms} Map of words to episodes
 */
function mapWordsToEpisodes(items) {
  const searchTerms = {};
  items.forEach(item => {
    const { contentSnippet, title } = item;
    const words = `${contentSnippet}${title}`
      .toLowerCase()
      .replace(/\n/g, ' ')
      .replace(/[^\w ]*/g, '')
      .split(' ');

    words.forEach(word => {
      if (searchTerms[word]) {
        searchTerms[word].add(title);
      } else {
        searchTerms[word] = new Set([title]);
      }
    });
  });
  return searchTerms;
}

/**
 * @param {string} wordStart
 * @param {SearchTerms} searchTerms
 */
function getWords(wordStart, searchTerms) {
  return Object.keys(searchTerms).filter(key => key.startsWith(wordStart));
}

/**
 * Takes a map of words to episodes and returns a trie
 * @param {SearchTerms} searchTerms
 * @return {Object.<string, any>}
 */
function createTrie(searchTerms) {
  const trie = {};
  for (const word of Object.keys(searchTerms)) {
    let node = trie;
    word.split('').forEach((char, i) => {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
      node.words = getWords(word.substring(0, i + 1), searchTerms);
    });
  }
  return trie;
}

export default async function Home() {
  const { items: episodes } = await getFeed(FEED.url);

  const searchTerms = mapWordsToEpisodes(episodes);
  const trie = createTrie(searchTerms);

  return (
    <>
      <Hero />
      <Search trie={trie} searchTerms={searchTerms} />
      <h2>All Episodes</h2>
      <div className={styles.gridWrapper}>
        {episodes.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
    </>
  );
}
