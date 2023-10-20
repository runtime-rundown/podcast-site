import { describe, it, expect } from 'vitest';
import { createEpisodeMap, mapWordsToEpisodeTitles } from '../search';

describe('Search utils', () => {
  it('createEpisodeMap', () => {
    const episodes = [
      { title: 'title1', contentSnippet: 'content1' },
      { title: 'title2', contentSnippet: 'content2' },
      { title: 'title3', contentSnippet: 'content3' },
    ];
    const episodeMap = createEpisodeMap(episodes);
    expect(episodeMap).toEqual({
      title1: { title: 'title1', contentSnippet: 'content1' },
      title2: { title: 'title2', contentSnippet: 'content2' },
      title3: { title: 'title3', contentSnippet: 'content3' },
    });
  });

  it('mapWordsToEpisodeTitles', () => {
    const episodes = [
      { title: 'React', contentSnippet: 'An episode about React' },
      { title: 'Testing', contentSnippet: 'An episode about testing' },
      {
        title: 'Another title',
        contentSnippet: 'An episode about something else',
      },
    ];
    const searchTerms = mapWordsToEpisodeTitles(episodes);
    expect(searchTerms).toEqual({
      about: new Set(['React', 'Testing', 'Another title']),
      an: new Set(['React', 'Testing', 'Another title']),
      another: new Set(['Another title']),
      else: new Set(['Another title']),
      episode: new Set(['React', 'Testing', 'Another title']),
      react: new Set(['React']),
      something: new Set(['Another title']),
      testing: new Set(['Testing']),
      title: new Set(['Another title']),
    });
  });
});
