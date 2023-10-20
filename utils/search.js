// TODO: Write tests for these trie functions
/**
 * @typedef SearchTerms
 * @type {Object.<string, Set<string>>}
 */

// TODO: Get searchTrie working for multiple words
/**
 * Search trie for searchTerm
 *
 * @param {Object.<string, any>} trie
 * @return {string[]} Array of words
 */
export function searchTrie(trie, searchTerm) {
  let node = trie;
  for (const char of searchTerm.split('')) {
    if (!node[char]) {
      return [];
    }
    node = node[char];
  }

  return node.words || [];
}

/**
 * Trim beginning and end of content to fit within MAX_CONTENT_LENGTH
 *
 * @param {string[]} content (start, mid, end)
 * @returns {string[]} (start, mid, end)
 */
function trim(content) {
  const MAX_CONTENT_LENGTH = 100;

  if (content.toString().length <= MAX_CONTENT_LENGTH) {
    return content;
  }

  const halfMax = MAX_CONTENT_LENGTH / 2;

  const [start, mid, end] = content;

  // TODO: Better way to do this than using halfMax
  const trimmedStart =
    start.length < halfMax
      ? start
      : '...' + start.slice(start.length - halfMax);

  const trimmedEnd = end.length < halfMax ? end : end.slice(0, halfMax) + '...';

  return [trimmedStart, mid, trimmedEnd];
}

/**
 * Trim beginning and end of content to fit within MAX_CONTENT_LENGTH
 *
 * @param {string[]} content (start, mid, end)
 * @returns {string[]} (start, mid, end)
 */
export function splitOnTerm(content = '', searchTerm = '') {
  const lineIndex = content.toLowerCase().indexOf(searchTerm.toLowerCase());

  if (lineIndex === -1) {
    return [content];
  }

  return trim([
    content.slice(0, lineIndex),
    content.slice(lineIndex, lineIndex + searchTerm.length),
    content.slice(lineIndex + searchTerm.length),
  ]);
}

/**
 * @param {import('../feeds/rss').FeedItem} Array of feed items
 * @returns {SearchTerms} Map of words to episodes
 */
export function mapWordsToEpisodeTitles(items) {
  const searchTerms = {};
  items.forEach(item => {
    const { contentSnippet, title } = item;
    const words = `${contentSnippet} ${title}`
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
export function createTrie(searchTerms) {
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

/**
 * @param {import('../feeds/rss').FeedItem[]} episodes
 * @returns {Object.<string, import('../feeds/rss').FeedItem>}
 */
export function createEpisodeMap(episodes) {
  const episodeMap = {};
  for (const episode of episodes) {
    episodeMap[episode.title] = episode;
  }
  return episodeMap;
}
