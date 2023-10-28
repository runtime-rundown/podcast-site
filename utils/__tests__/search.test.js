import { describe, it, expect } from 'vitest';
import {
  createEpisodeMap,
  createTrie,
  mapWordsToEpisodeTitles,
  splitOnTerm,
  processEpisodes,
  getMatchingWords,
  searchForTitles,
} from '../search';
import {
  episodeMapFixture,
  episodesFixture,
  searchTermsFixture as searchTerms,
  trieFixture,
} from '../../__fixtures__/episodes';

describe('Search utils', () => {
  it('createEpisodeMap', () => {
    const episodeMap = createEpisodeMap(episodesFixture);
    expect(episodeMap).toEqual(episodeMapFixture);
  });

  it('creates a trie', () => {
    const trie = createTrie(searchTerms);
    expect(trie).toEqual(trieFixture);
  });

  describe('mapWordsToEpisodeTitles', () => {
    it('creates a map of search terms to episode titles', () => {
      const searchTerms = mapWordsToEpisodeTitles(episodesFixture);
      expect(searchTerms).toEqual(searchTerms);
    });

    it('search terms are lowercased', () => {
      const episodes = [
        { title: 'React', contentSnippet: 'An episode about React' },
      ];
      const searchTerms = mapWordsToEpisodeTitles(episodes);
      expect(searchTerms).toEqual({
        about: new Set(['React']),
        an: new Set(['React']),
        episode: new Set(['React']),
        react: new Set(['React']),
      });
    });
  });

  describe('searchTrie', () => {
    it('returns a match', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, 'about')).toEqual(['about']);
    });

    it('is case insensitive', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, 'aBoUt')).toEqual(['about']);
    });

    it('returns multiple matches', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, 'an')).toEqual(['an', 'another']);
    });

    it('returns empty array for an empty input', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, '')).toEqual([]);
    });

    it('returns empty array for no match', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, 'xyz')).toEqual([]);
    });

    // How do I want to separate multiple search terms?
    // - 2d array? [['episode'], ['another', 'an']]
    // - Map? { episode: ['episode'], an: ['another', 'an']]
    // Intersection of Sets?
    //  - Reduce Sets and get intersection
    // Maybe have getMatchingWords return titles instead of terms?
    it.skip('returns match for multiple words', () => {
      const trie = createTrie(searchTerms);
      expect(getMatchingWords(trie, 'episode an')).toEqual({
        episode: ['episode'],
        an: ['another', 'an'],
      });
    });

    it.todo('returns match for multiple words (multiple lines)');
  });

  describe('searchForTitles', () => {
    it('returns titles for search term', () => {
      const trie = createTrie(searchTerms);
      expect(
        searchForTitles({ trie, searchTerms, searchTerm: 'epis' }),
      ).toEqual(['React', 'Testing', 'Other', 'Bee']);
    });

    it('returns empty array if no match', () => {
      const trie = createTrie(searchTerms);
      expect(searchForTitles({ trie, searchTerms, searchTerm: 'xyz' })).toEqual(
        [],
      );
    });
  });

  describe('splitOnTerm', () => {
    const LONG_CONTENT =
      'Some much longer, more verbose content that will certainly, definitely, absolutely, clearly, one hundred percent overflow max length';

    it('splits content into before, term, after', () => {
      const content = 'Some content';
      expect(splitOnTerm(content, 'con')).toEqual(['Some ', 'con', 'tent']);
    });

    it('trims beginning', () => {
      expect(splitOnTerm(LONG_CONTENT, 'max')).toEqual([
        '...absolutely, clearly, one hundred percent overflow ',
        'max',
        ' length',
      ]);
    });

    it('trims end', () => {
      expect(splitOnTerm(LONG_CONTENT, 'much')).toEqual([
        'Some ',
        'much',
        ' longer, more verbose content that will certainly,...',
      ]);
    });

    it('trims both sides', () => {
      expect(splitOnTerm(LONG_CONTENT, 'definitely')).toEqual([
        '...longer, more verbose content that will certainly, ',
        'definitely',
        ', absolutely, clearly, one hundred percent overflo...',
      ]);
    });

    it('handles empty term', () => {
      expect(splitOnTerm(LONG_CONTENT, undefined)).toEqual([
        '',
        '',
        'Some much longer, more verbose content that will c...',
      ]);
    });

    it('handles empty content', () => {
      expect(splitOnTerm(undefined, 'max')).toEqual(['']);
    });
  });

  describe('processEpisodes', () => {
    it('happy path', () => {
      expect(processEpisodes(episodesFixture)).toEqual({
        episodeMap: episodeMapFixture,
        searchTerms: searchTerms,
        trie: trieFixture,
      });
    });
  });
});
