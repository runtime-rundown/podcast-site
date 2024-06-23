'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  EpisodeMap,
  Trie,
  searchForTitles,
  splitOnTerms,
} from '../utils/search';
import { type SearchTerms } from '../utils/search';
import { processTitle } from '../utils/formatting';
import styles from '../styles/Search.module.css';

type SearchProps = {
  searchTerms: SearchTerms;
  trie: Trie;
  episodeMap: EpisodeMap;
};

function maybeHilight(i: number) {
  // Hacky: odd elements are normal, even are hilighted. We will probably need
  // to fix this at some point :|
  return i % 2 === 0 ? '' : styles.hilight;
}

function Search({ searchTerms, trie, episodeMap }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const inputEl = React.useRef<HTMLInputElement>(null);

  // Focus on the search input when the user presses '/'
  // TODO: Write a test for this
  useEffect(() => {
    const handleSlash = (e: KeyboardEvent) => {
      if (e.key === '/' && !dropdownOpen) {
        e.preventDefault();
        inputEl.current?.focus();
      }
    };

    window.addEventListener('keydown', handleSlash);
    return () => window.removeEventListener('keydown', handleSlash);
  }, [dropdownOpen]);

  const openDropdown = () => setDropdownOpen(true);
  const closeDropdown = () => setDropdownOpen(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.className !== styles.episodeLink) {
      closeDropdown();
    }
  };

  const handleSearchContainerKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // I'm sure there's a better way to do this
    if (e.key === 'Escape') {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const titles = searchForTitles({
    trie,
    searchTerms,
    searchTerm: searchTerm.toLowerCase(),
  });

  return (
    <div className={styles.search} onKeyDown={handleSearchContainerKeyDown}>
      <label htmlFor="search">
        <p>Search</p>
        <input
          id="search"
          type="text"
          ref={inputEl}
          autoComplete="off"
          className={styles.input}
          value={searchTerm}
          onChange={handleSearch}
          onFocus={openDropdown}
          onBlur={handleSearchBlur}
        />
      </label>
      {titles.length > 0 && dropdownOpen && (
        <div
          className={styles.searchResultsContainer}
          onBlur={handleSearchBlur}
        >
          <ul className={styles.searchResults}>
            {/* TODO: Sort with the best matches first, e.g. "get the bas"
            should put "Get the Basics Right" first */}
            {titles.map(title => {
              const contentLines =
                episodeMap[title].contentSnippet.split(/\. |\n/);

              const terms = searchTerm.trim().split(' ');
              const regex = new RegExp(`(${terms.join('|')})`, 'gi');

              const matchingLines = contentLines.filter(line =>
                line.match(regex),
              );

              const splitTitle = splitOnTerms(title, searchTerm);

              return (
                <li className={styles.episodeResult} key={title}>
                  <Link
                    className={styles.episodeLink}
                    href={`/episodes/${processTitle(title)}`}
                  >
                    <div className={styles.episodeTitle}>
                      {splitTitle.map((titlePart, i) => (
                        <span key={i} className={maybeHilight(i)}>
                          {titlePart}
                        </span>
                      ))}
                    </div>
                    <div className={styles.contentLines}>
                      {matchingLines.map(line => {
                        const splitContent = splitOnTerms(line, searchTerm);

                        return (
                          <div key={line} className={styles.episodeDescription}>
                            {splitContent.map((contentPart, i) => (
                              <span key={i} className={maybeHilight(i)}>
                                {contentPart}
                              </span>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
