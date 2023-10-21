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
    fireEvent.change(screen.getByLabelText(/search/i), {
      target: { value: 'react' },
    });
    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getByRole('listitem').textContent).toBe(
      'ReactAn episode about React',
    );
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
});
