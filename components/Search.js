'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

/**
 * @typedef SearchTerms
 * @type {Map<string, Set<string>>}
 */

function processTitle(title) {
  return title.toLowerCase().replaceAll(' ', '-');
}

/**
 * @returns {SearchTerms} Map of words to episodes
 */
function mapWordsToEpisodes(items) {
  const searchTerms = new Map();
  items.forEach(item => {
    const { contentSnippet, title } = item;
    const words = `${contentSnippet}${title}`
      .toLowerCase()
      .replace(/\n/g, ' ')
      .replace(/[^\w ]*/g, '')
      .split(' ');

    words.forEach(word => {
      if (searchTerms.has(word)) {
        searchTerms.get(word).add(title);
      } else {
        searchTerms.set(word, new Set([title]));
      }
    });
  });
  return searchTerms;
}

/**
 * @param {string} wordStart
 * @param {SearchTerms} searchTerms
 */
function getWords(wordStart, searchTerms) {
  return [...searchTerms.keys()].filter(key => key.startsWith(wordStart));
}

/**
 * Takes a map of words to episodes and returns a trie
 * @param {SearchTerms} searchTerms
 */
function createTrie(searchTerms) {
  const trie = new Map();
  for (const [word] of searchTerms) {
    let node = trie;
    word.split('').forEach((char, i) => {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
      node.set('words', getWords(word.substring(0, i + 1), searchTerms));
    });
  }
  return trie;
}

function searchTrie(trie, searchTerm) {
  let node = trie;
  for (const char of searchTerm.split('')) {
    if (node.has(char)) {
      node = node.get(char);
    } else {
      return [];
    }
  }

  return node.get('words') || [];
}

function Search({ episodes }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Only need to compute these once. TODO: Move this to the server
  const searchTerms = useMemo(() => mapWordsToEpisodes(episodes), [episodes]);
  const trie = useMemo(() => createTrie(searchTerms), [searchTerms]);

  const results = searchTrie(trie, searchTerm);

  return (
    <>
      <label>
        Search episodes
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </label>
      {results.length > 0 && (
        <ul>
          {results.map(result => {
            const titles = [...searchTerms.get(result)];
            return titles.map(title => (
              <div key={title}>
                <Link href={`/episodes/${processTitle(title)}`}>
                  <li key={title}>{title}</li>
                </Link>
              </div>
            ));
          })}
        </ul>
      )}
    </>
  );
}

export default Search;
