import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { screen, render, fireEvent, cleanup } from '@testing-library/react';
import Search from '../Search';
import {
  episodeMapFixture,
  searchTermsFixture,
  trieFixture,
} from '../../__fixtures__/episodes';

afterEach(() => {
  cleanup();
});

describe('Search', () => {
  it('displays results if input is in episode content', async () => {
    render(
      <Search
        trie={trieFixture}
        episodeMap={episodeMapFixture}
        searchTerms={searchTermsFixture}
      />,
    );
    expect(screen.queryByRole('list')).not.toBeTruthy();
    fireEvent.focus(screen.getByLabelText(/search/i));
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'about' },
    });
    expect(screen.getByRole('list')).toBeTruthy();
    const results = screen.getAllByRole('listitem');
    expect(results[0].textContent).toBe('ReactAn episode about React');
    expect(results[1].textContent).toBe('TestingAn episode about testing');
  });

  it('does not display results if input is NOT in episode content', async () => {
    render(
      <Search
        trie={trieFixture}
        episodeMap={episodeMapFixture}
        searchTerms={searchTermsFixture}
      />,
    );
    expect(screen.queryByRole('list')).not.toBeTruthy();
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'junk' },
    });
    expect(screen.queryByRole('list')).not.toBeTruthy();
    expect(screen.queryByRole('listitem')).not.toBeTruthy();
  });

  it('displays all matching content lines', async () => {
    render(
      <Search
        trie={trieFixture}
        episodeMap={episodeMapFixture}
        searchTerms={searchTermsFixture}
      />,
    );
    expect(screen.queryByRole('list')).not.toBeTruthy();
    fireEvent.focus(screen.getByLabelText(/search/i));
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'react' },
    });
    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getByRole('listitem').textContent).toBe(
      'ReactAn episode about Reactalways React',
    );
  });

  it('matches multiple words', async () => {
    render(
      <Search
        trie={trieFixture}
        episodeMap={episodeMapFixture}
        searchTerms={searchTermsFixture}
      />,
    );
    expect(screen.queryByRole('list')).not.toBeTruthy();
    fireEvent.focus(screen.getByLabelText(/search/i));
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'an episode' },
    });
    expect(screen.getByRole('list')).toBeTruthy();
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(3);

    expect(listItems[0].textContent).toMatch('An episode about React');
    expect(listItems[1].textContent).toMatch('An episode about testing');
    expect(listItems[2].textContent).toMatch('Another random episode');
  });
});
