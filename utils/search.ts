import { Episode } from '../feeds/rss';

export type SearchTerms = { [k: string]: Set<string> };
export type EpisodeMap = { [k: string]: Episode };

export type Trie = {
  [k: Exclude<string, 'words'>]: Trie | string[];
  words: string[];
};

// TODO: Get searchTrie working for multiple words
// TODO: Convert dash to space

export function getMatchingWords(trie: Trie, input: string): string[] {
  const lower = input.toLowerCase();

  let node = trie;
  for (const char of lower.split('')) {
    if (!node[char]) {
      return [];
    }
    node = node[char] as Trie;
  }

  return node.words || [];
}

function getTitlesFromTrieResults(result: string[], searchTerms: SearchTerms) {
  const titles = result.reduce((acc, curr) => {
    for (const title of searchTerms[curr]) {
      acc.add(title);
    }
    return acc;
  }, new Set<string>());

  return Array.from(titles);
}

/**
 * Search for input in trie, return episode titles if found
 */
export function searchForTitles({
  trie,
  searchTerms,
  searchTerm,
}: {
  trie: Trie;
  searchTerms: SearchTerms;
  searchTerm: string;
}): string[] {
  const result = getMatchingWords(trie, searchTerm);
  return getTitlesFromTrieResults(result, searchTerms);
}

/**
 * Trim beginning and end of content to fit within MAX_CONTENT_LENGTH
 */
function trim(content: string[]): string[] {
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
 * Split content into before input, input, and after input
 */
export function splitOnTerm(content = '', searchTerm = ''): string[] {
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
 * Map all words to titles of episodes that contain them
 */
export function mapWordsToEpisodeTitles(items: Episode[]): SearchTerms {
  const searchTerms: SearchTerms = {};
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
 * Get all words that start with wordStart
 */
function getWords(wordStart: string, searchTerms: SearchTerms): string[] {
  return Object.keys(searchTerms)
    .filter(key => key.startsWith(wordStart))
    .sort();
}

/**
 * Takes a map of words to episodes and returns a trie
 */
export function createTrie(searchTerms: SearchTerms): Trie {
  const trie: Trie = { words: [] };
  for (const word of Object.keys(searchTerms)) {
    let node = trie;
    word.split('').forEach((char, i) => {
      if (!node[char]) {
        node[char] = { words: [] };
      }

      node = node[char] as Trie;
      node.words = getWords(word.substring(0, i + 1), searchTerms);
    });
  }
  return trie;
}

/**
 * Convert array of episodes into a map keyed by title
 */
export function createEpisodeMap(episodes: Episode[]): EpisodeMap {
  const episodeMap: EpisodeMap = {};
  for (const episode of episodes) {
    episodeMap[episode.title] = episode;
  }
  return episodeMap;
}

/**
 * Main export, single function for integration testing
 */
export function processEpisodes(episodes: Episode[]): {
  trie: Trie;
  searchTerms: SearchTerms;
  episodeMap: EpisodeMap;
} {
  const searchTerms = mapWordsToEpisodeTitles(episodes);
  const trie = createTrie(searchTerms);
  const episodeMap = createEpisodeMap(episodes);

  return { trie, searchTerms, episodeMap };
}
