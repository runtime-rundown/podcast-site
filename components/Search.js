'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';
import { searchTrie, splitOnTerm } from '../utils/search';
import { processTitle } from '../utils/formatting';

function Search({ searchTerms, trie, episodeMap }) {
  const [searchTerm, setSearchTerm] = useState('');

  const results = searchTrie(trie, searchTerm.toLowerCase());
  console.log('results', results);

  return (
    <div className={styles.search}>
      <label>
        <p>Search</p>
        <input
          className={styles.input}
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
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

                const contentLine = contentLines.find(line =>
                  line.toLowerCase().includes(searchTerm.toLowerCase()),
                );

                const [titleStart, titleHilight, titleEnd] = splitOnTerm(
                  title,
                  searchTerm,
                );
                const [contentStart, contentHilight, contentEnd] = splitOnTerm(
                  contentLine,
                  searchTerm,
                );

                return (
                  <li className={styles.episodeResult} key={title}>
                    <Link href={`/episodes/${processTitle(title)}`}>
                      <div className={styles.episodeTitle}>
                        <span>{titleStart}</span>
                        <span className={styles.hilight}>{titleHilight}</span>
                        <span>{titleEnd}</span>
                      </div>
                      <div className={styles.episodeDescription}>
                        <span>{contentStart}</span>
                        <span className={styles.hilight}>{contentHilight}</span>
                        <span>{contentEnd}</span>
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
