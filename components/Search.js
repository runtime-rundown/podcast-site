'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

const MAX_CONTENT_LENGTH = 100;

function searchTrie(trie, searchTerm) {
  let node = trie;
  for (const char of searchTerm.split('')) {
    if (!node[char]) {
      return [];
    }
    node = node[char];
  }

  return node.words || [];
}

// TODO: Deduplicate
const processTitle = title => title.toLowerCase().replaceAll(' ', '-');

function trim(content) {
  if (content.toString().length <= MAX_CONTENT_LENGTH) {
    return content;
  }

  const halfMax = MAX_CONTENT_LENGTH / 2;

  const [start, mid, end] = content;

  // TODO: Better way to do this than using halfMax
  const trimmedStart =
    start.length < halfMax
      ? start
      : '...' + start.slice(start.length - halfMax);

  const trimmedEnd = end.length < halfMax ? end : end.slice(0, halfMax) + '...';

  return [trimmedStart, mid, trimmedEnd];
}

function splitOnTerm(content = '', searchTerm = '') {
  const lineIndex = content.toLowerCase().indexOf(searchTerm.toLowerCase());

  if (lineIndex === -1) {
    return [content];
  }

  return trim([
    content.slice(0, lineIndex),
    content.slice(lineIndex, lineIndex + searchTerm.length),
    content.slice(lineIndex + searchTerm.length),
  ]);
}

function Search({ searchTerms, trie, episodeMap }) {
  const [searchTerm, setSearchTerm] = useState('');

  const results = searchTrie(trie, searchTerm.toLowerCase());

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
