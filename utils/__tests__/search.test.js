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

    it.todo('returns match for multiple words (multiple lines)');
  });

  describe('searchForTitles', () => {
    describe('single search term', () => {
      it('returns titles for search term', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'epis' }),
        ).toEqual(['React', 'Testing', 'Other', 'Bee']);
      });

      it('trims whitespace around search', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'react ' }),
        ).toEqual(['React']);
      });

      it('returns empty array if no match', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'xyz' }),
        ).toEqual([]);
      });
    });

    describe('multiple search terms', () => {
      it('multiple matching words returns titles that match ALL words', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'epIsOde an' }),
        ).toEqual(['React', 'Testing', 'Other']);
      });

      it('returns empty array if one term doesnt match', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'episode xx' }),
        ).toEqual([]);
      });
    });
  });

  describe('splitOnTerm', () => {
    const LONG_CONTENT =
      'Some much longer, more verbose content that will certainly, definitely, absolutely, clearly, one hundred percent overflow max length';

    it('splits content into before, term, after', () => {
      const content = 'Some content';
      expect(splitOnTerm(content, 'con')).toEqual(['Some ', 'con', 'tent']);
    });

    it('truncates beginning', () => {
      expect(splitOnTerm(LONG_CONTENT, 'max')).toEqual([
        '...absolutely, clearly, one hundred percent overflow ',
        'max',
        ' length',
      ]);
    });

    it('truncates end', () => {
      expect(splitOnTerm(LONG_CONTENT, 'much')).toEqual([
        'Some ',
        'much',
        ' longer, more verbose content that will certainly,...',
      ]);
    });

    it('truncates both sides', () => {
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

    it('ignores whitespace on either side', () => {
      expect(splitOnTerm('Some content', ' con ')).toEqual([
        'Some ',
        'con',
        'tent',
      ]);
    });

    it('handles empty content', () => {
      expect(splitOnTerm(undefined, 'max')).toEqual(['']);
    });

    it('highlights match in multiple terms', () => {
      expect(splitOnTerm(LONG_CONTENT, 'longer verbose')).toEqual([
        'Some much ',
        'longer',
        ', more verbose content that will certainly, defini...',
      ]);
    });

    it('highlights first matching term of multiple terms', () => {
      // verbose is later in the sentence but it's the first match
      expect(splitOnTerm(LONG_CONTENT, 'foo verbose')).toEqual([
        'Some much longer, more ',
        'verbose',
        ' content that will certainly, definitely, absolute...',
      ]);
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
