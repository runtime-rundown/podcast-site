import { FEED, getFeed } from '../feeds/rss';
import Hero from '../components/Hero';
import Search from '../components/Search';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';

export const revalidate = 60;

// TODO: Write tests for these trie functions
/**
 * @typedef SearchTerms
 * @type {Map<string, Set<string>>}
 */

/**
 * @returns {SearchTerms} Map of words to episodes
 */
function mapWordsToEpisodes(items) {
  const searchTerms = new Map();
  items.forEach(item => {
    const { contentSnippet, title } = item;
    const words = `${contentSnippet}${title}`
      .toLowerCase()
      .replace(/\n/g, ' ')
      .replace(/[^\w ]*/g, '')
      .split(' ');

    words.forEach(word => {
      if (searchTerms.has(word)) {
        searchTerms.get(word).add(title);
      } else {
        searchTerms.set(word, new Set([title]));
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
  return [...searchTerms.keys()].filter(key => key.startsWith(wordStart));
}

/**
 * Takes a map of words to episodes and returns a trie
 * @param {SearchTerms} searchTerms
 */
function createTrie(searchTerms) {
  const trie = new Map();
  for (const [word] of searchTerms) {
    let node = trie;
    word.split('').forEach((char, i) => {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
      node.set('words', getWords(word.substring(0, i + 1), searchTerms));
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
