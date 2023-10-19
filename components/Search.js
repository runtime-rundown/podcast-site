'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Search.module.css';

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
function processTitle(title) {
  return title.toLowerCase().replaceAll(' ', '-');
}

function splitContent(line, searchTerm) {
  const lineIndex = line.toLowerCase().indexOf(searchTerm.toLowerCase());

  return [
    line.slice(0, lineIndex),
    line.slice(lineIndex, lineIndex + searchTerm.length),
    line.slice(lineIndex + searchTerm.length),
  ];
}

function Search({ searchTerms, trie, episodeMap }) {
  const [searchTerm, setSearchTerm] = useState('');

  const results = searchTrie(trie, searchTerm);

  return (
    <>
      <label>
        <p>Search episodes</p>
        <input
          className={styles.input}
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      {results.length > 0 && (
        <ul className={styles.searchResults}>
          {results.map(result => {
            const titles = [...searchTerms[result]];

            return titles.map(title => {
              const contentLines =
                episodeMap[title].contentSnippet.split(/\. |\n/);

              const line = contentLines.find(line =>
                line.toLowerCase().includes(searchTerm.toLowerCase()),
              );

              const [start, highlight, end] = splitContent(line, searchTerm);

              return (
                <li className={styles.episodeResult} key={title}>
                  <Link href={`/episodes/${processTitle(title)}`}>
                    <span className={styles.episodeTitle}>{title}</span>
                    <div>
                      <span>{start}</span>
                      <span className={styles.searchTerm}>{highlight}</span>
                      <span>{end}</span>
                    </div>
                  </Link>
                </li>
              );
            });
          })}
        </ul>
      )}
    </>
  );
}

export default Search;
