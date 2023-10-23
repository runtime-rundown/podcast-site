'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { EpisodeMap, Trie, searchTrie, splitOnTerm } from '../utils/search';
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
  // const [isResultsOpen, setIsResultsOpen] = useState(false);

  const results = searchTrie(trie, searchTerm.toLowerCase());

  // const openDropdown = () => setIsResultsOpen(true);
  // const closeDropdown = () => setIsResultsOpen(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (!isResultsOpen) {
    //   openDropdown();
    // }

    // @ts-expect-error Why tf isn't this typed correctly
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.search}>
      <label htmlFor="search">
        <p>Search</p>
        <input
          id="search"
          type="text"
          className={styles.input}
          value={searchTerm}
          onChange={handleSearch}
          // onBlur={closeDropdown}
        />
      </label>
      {results.length > 0 && (
        <div className={styles.searchResultsContainer}>
          <ul className={styles.searchResults}>
            {results.map(result => {
              const titles = [...searchTerms[result]];

              return titles.map(title => {
                const contentLines =
                  episodeMap[title].contentSnippet.split(/\. |\n/);

                const matchingLines = contentLines.filter(line =>
                  line.toLowerCase().includes(searchTerm.toLowerCase()),
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
                            <div
                              key={line}
                              className={styles.episodeDescription}
                            >
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
              });
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
