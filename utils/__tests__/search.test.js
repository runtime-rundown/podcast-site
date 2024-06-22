import { describe, it, expect } from 'vitest';
import {
  createEpisodeMap,
  createTrie,
  mapWordsToEpisodeTitles,
  splitOnTerms,
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
import {
  sortingMapFixture,
  sortingFixture,
  sortingSearchTermsFixture,
  sortingTrieFixture,
} from '../../__fixtures__/sorting';

describe('Search utils', () => {
  it('creates a trie', () => {
    const trie = createTrie(searchTerms);
    expect(trie).toEqual(trieFixture);
  });

  describe('createEpisodeMap', () => {
    it('maps titles to episodes', () => {
      const episodeMap = createEpisodeMap(episodesFixture);
      expect(episodeMap).toEqual(episodeMapFixture);
    });
  });

  describe('mapWordsToEpisodeTitles', () => {
    it('creates a map of search terms to episode titles', () => {
      const expectedSearchTerms = mapWordsToEpisodeTitles(episodesFixture);
      expect(searchTerms).toEqual(expectedSearchTerms);
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

    it('Separates words with dashes', () => {
      const ep = {
        title: 'The one about dashes',
        contentSnippet: 'An episode with a dash-in-it',
      };
      const searchTerms = mapWordsToEpisodeTitles([ep]);
      expect(searchTerms).toEqual({
        the: new Set(['The one about dashes']),
        one: new Set(['The one about dashes']),
        about: new Set(['The one about dashes']),
        dashes: new Set(['The one about dashes']),
        dash: new Set(['The one about dashes']),
        in: new Set(['The one about dashes']),
        it: new Set(['The one about dashes']),
        an: new Set(['The one about dashes']),
        episode: new Set(['The one about dashes']),
        with: new Set(['The one about dashes']),
        a: new Set(['The one about dashes']),
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
        ).toEqual([
          'React',
          'Testing',
          'Testing Two',
          'Other',
          'Career',
          'Another',
        ]);
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

      it('orders exact matches first', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'another' }),
        ).toEqual(['Another', 'Testing Two', 'Other']);
      });

      describe('Sorting', () => {
        it('sorting fixtures are correct', () => {
          const episodeMap = createEpisodeMap(sortingFixture);
          expect(episodeMap).toEqual(sortingMapFixture);
          const sortingTerms = mapWordsToEpisodeTitles(sortingFixture);
          expect(sortingTerms).toEqual(sortingSearchTermsFixture);
          const trie = createTrie(sortingTerms);
          expect(trie).toEqual(sortingTrieFixture);
        });

        it('orders match in title before match in content', () => {
          expect(
            searchForTitles({
              trie: sortingTrieFixture,
              searchTerms: sortingSearchTermsFixture,
              searchTerm: 'FOO BAR',
            }),
          ).toEqual([
            'Title with foo and bar',
            'Title with foo',
            'Title with bar',
            'Title with baz',
          ]);
        });
      });
    });

    describe('multiple search terms', () => {
      it('multiple matching words returns titles that match ALL words', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'epIsOde an' }),
        ).toEqual(['React', 'Testing', 'Testing Two', 'Other', 'Another']);
      });

      it('returns empty array if one term doesnt match', () => {
        const trie = createTrie(searchTerms);
        expect(
          searchForTitles({ trie, searchTerms, searchTerm: 'episode xx' }),
        ).toEqual([]);
      });
    });
  });

  describe('splitOnTerms', () => {
    const LONG_CONTENT =
      'Some much longer, more verbose content that will certainly, definitely, absolutely, clearly, one hundred percent overflow max length';

    it('splits content into before, term, after', () => {
      const content = 'Some content';
      expect(splitOnTerms(content, 'con')).toEqual(['Some ', 'con', 'tent']);
    });

    it('truncates beginning', () => {
      expect(splitOnTerms(LONG_CONTENT, 'max')).toEqual([
        '...absolutely, clearly, one hundred percent overflow ',
        'max',
        ' length',
      ]);
    });

    it('truncates end', () => {
      expect(splitOnTerms(LONG_CONTENT, 'much')).toEqual([
        'Some ',
        'much',
        ' longer, more verbose content that will certainly,...',
      ]);
    });

    it('splits multiple times on the same word', () => {
      expect(splitOnTerms(LONG_CONTENT, 'ly')).toEqual([
        '...uch longer, more verbose content that will certain',
        'ly',
        ', definite',
        'ly',
        ', absolute',
        'ly',
        ', clear',
        'ly',
        ', one hundred percent overflow max length',
      ]);
    });

    it('truncates both sides', () => {
      expect(splitOnTerms(LONG_CONTENT, 'definitely')).toEqual([
        '...longer, more verbose content that will certainly, ',
        'definitely',
        ', absolutely, clearly, one hundred percent overflo...',
      ]);
    });

    it('handles empty term', () => {
      expect(splitOnTerms(LONG_CONTENT, undefined)).toEqual([LONG_CONTENT]);
    });

    it('ignores whitespace on either side', () => {
      expect(splitOnTerms('Some content', ' con ')).toEqual([
        'Some ',
        'con',
        'tent',
      ]);
    });

    it('handles empty content', () => {
      expect(splitOnTerms(undefined, 'max')).toEqual(['']);
    });

    it('highlights match in multiple terms', () => {
      expect(splitOnTerms(LONG_CONTENT, 'longer verbose')).toEqual([
        'Some much ',
        'longer',
        ', more ',
        'verbose',
        ' content that will certainly, definitely, absolute...',
      ]);
    });

    it('highlights first matching term of multiple terms', () => {
      // verbose is later in the sentence but it's the first match
      expect(splitOnTerms(LONG_CONTENT, 'foo verbose')).toEqual([
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
