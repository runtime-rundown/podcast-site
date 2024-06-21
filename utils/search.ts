import { Episode } from '../feeds/rss';

export type SearchTerms = { [k: string]: Set<string> };
export type EpisodeMap = { [k: string]: Episode };

export type Trie = {
  [k: Exclude<string, 'words'>]: Trie | string[];
  words: string[];
};

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

function getTitlesFromTrieResults(
  result: string[],
  searchTerms: SearchTerms,
): Set<string> {
  const titles = result.reduce((acc, curr) => {
    for (const title of searchTerms[curr]) {
      acc.add(title);
    }
    return acc;
  }, new Set<string>());

  return titles;
}

/**
 * Search for input in trie, return episode titles if found. If input is
 * multiple words, return titles that contain all words.
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
  // TODO: Memoize each word's results
  const words = searchTerm.trim().split(' ');

  const titlesMatchingAllWords = words.reduce((acc, word) => {
    const matches = getMatchingWords(trie, word);

    if (!matches) {
      return acc;
    }

    const titles = getTitlesFromTrieResults(matches, searchTerms);

    if (!acc.size) {
      return new Set<string>(titles);
    }

    const result = new Set<string>();

    titles.forEach(title => {
      if (acc.has(title)) {
        result.add(title);
      }
    });

    return result;
  }, new Set<string>());

  // Sort by how well the title matches the search term
  return [...titlesMatchingAllWords].sort((a, b) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();

    // TODO: Improve this, could do a better fuzzy match
    if (lowerA.includes(lowerSearchTerm) && !lowerB.includes(lowerSearchTerm)) {
      return -1;
    }
    if (lowerB.includes(lowerSearchTerm) && !lowerA.includes(lowerSearchTerm)) {
      return 1;
    }
    return 0;
  });
}

/**
 * Trim beginning and end of content to fit within MAX_CONTENT_LENGTH
 */
function truncate(content: string[]): string[] {
  const MAX_CONTENT_LENGTH = 100;

  if (content.toString().length <= MAX_CONTENT_LENGTH) {
    return content;
  }

  const halfMax = MAX_CONTENT_LENGTH / 2;

  const start = content.at(0);
  const mid = content.slice(1, -1);
  const end = content.at(-1);

  // TODO: Better way to do this than using halfMax
  const truncatedStart =
    start.length < halfMax
      ? start
      : '...' + start.slice(start.length - halfMax);

  const truncatedEnd =
    end.length < halfMax ? end : end.slice(0, halfMax) + '...';

  return [truncatedStart, ...mid, truncatedEnd];
}

/**
 * Split content into matching and non-matching parts
 */
export function splitOnTerms(content = '', searchTerm = ''): string[] {
  if (searchTerm === '') {
    return [content];
  }

  const terms = searchTerm.trim().split(' ');
  const re = new RegExp(`(${terms.join('|')})`, 'gi');

  // Splitting on a RegExp that includes capturing groups will include the
  // matched terms in the result
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split#splitting_with_a_regexp_to_include_parts_of_the_separator_in_the_result
  return truncate(content.split(re));
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
      .replace(/[\n-]/g, ' ')
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
