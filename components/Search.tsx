'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  EpisodeMap,
  Trie,
  searchForTitles,
  splitOnTerm,
} from '../utils/search';
import { type SearchTerms } from '../utils/search';
import { processTitle } from '../utils/formatting';
import styles from '../styles/Search.module.css';

type SearchProps = {
  searchTerms: SearchTerms;
  trie: Trie;
  episodeMap: EpisodeMap;
};

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
            {titles.map(title => {
              const contentLines =
                episodeMap[title].contentSnippet.split(/\. |\n/);

              const terms = searchTerm.trim().split(' ');
              const regex = new RegExp(`(${terms.join('|')})`, 'gi');

              const matchingLines = contentLines.filter(line =>
                line.match(regex),
              );

              const [titleStart, titleHilight, titleEnd] = splitOnTerm(
                title,
                searchTerm,
              );

              return (
                <li className={styles.episodeResult} key={title}>
                  <Link
                    className={styles.episodeLink}
                    href={`/episodes/${processTitle(title)}`}
                  >
                    <div className={styles.episodeTitle}>
                      <span>{titleStart}</span>
                      <span className={styles.hilight}>{titleHilight}</span>
                      <span>{titleEnd}</span>
                    </div>
                    <div className={styles.contentLines}>
                      {matchingLines.map(line => {
                        const [contentStart, contentHilight, contentEnd] =
                          splitOnTerm(line, searchTerm);

                        return (
                          <div key={line} className={styles.episodeDescription}>
                            <span>{contentStart}</span>
                            <span className={styles.hilight}>
                              {contentHilight}
                            </span>
                            <span>{contentEnd}</span>
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
