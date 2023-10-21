import { describe, it, expect } from 'vitest';
import {
  createEpisodeMap,
  createTrie,
  mapWordsToEpisodeTitles,
  searchTrie,
  splitOnTerm,
} from '../search';
import {
  episodeMapFixture,
  episodesFixture,
  searchTermsFixture,
  trieFixture,
} from '../../__fixtures__/episodes';

describe('Search utils', () => {
  it('createEpisodeMap', () => {
    const episodeMap = createEpisodeMap(episodesFixture);
    expect(episodeMap).toEqual(episodeMapFixture);
  });

  it('creates a trie', () => {
    const trie = createTrie(searchTermsFixture);
    expect(trie).toEqual(trieFixture);
  });

  describe('mapWordsToEpisodeTitles', () => {
    it('creates a map of search terms to episode titles', () => {
      const searchTerms = mapWordsToEpisodeTitles(episodesFixture);
      expect(searchTerms).toEqual(searchTermsFixture);
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
      const trie = createTrie(searchTermsFixture);
      expect(searchTrie(trie, 'about')).toEqual(['about']);
    });

    it('is case insensitive', () => {
      const trie = createTrie(searchTermsFixture);
      expect(searchTrie(trie, 'aBoUt')).toEqual(['about']);
    });

    it('returns multiple matches', () => {
      const trie = createTrie(searchTermsFixture);
      expect(searchTrie(trie, 'e')).toEqual(['else', 'episode']);
    });

    it('returns empty array for an empty input', () => {
      const trie = createTrie(searchTermsFixture);
      expect(searchTrie(trie, '')).toEqual([]);
    });

    it('returns empty array for no match', () => {
      const trie = createTrie(searchTermsFixture);
      expect(searchTrie(trie, 'xyz')).toEqual([]);
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
});
