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
function mapContentWordsToEpisodes(items) {
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
 * Takes a map of words to episodes and returns a trie
 * @param {SearchTerms} searchTerms
 */
function createTrieFromSearchTerms(searchTerms) {
  const trie = new Map();
  for (const [word, episodes] of searchTerms) {
    // console.log('episodes', episodes);
    // console.log('word', word);
    let node = trie;
    word.split('').forEach(char => {
      if (!node.has(char)) {
        node.set(char, new Map());
      }
      node = node.get(char);
      node.set('episodes', episodes);
    });
  }
  return trie;
}

function searchTrie(trie, searchTerm) {
  let node = trie;
  console.log('node', node);
  searchTerm.split('').forEach(char => {
    if (!node.has(char)) {
      return false;
    }
    node = node.get(char);
  });
  if (node.has('episodes')) {
    return node.get('episodes');
  }
  return [];
}

function Search({ episodes }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Only recompute searchTerms when episodes changes
  const searchTerms = useMemo(
    () => mapContentWordsToEpisodes(episodes),
    [episodes],
  );

  const trie = useMemo(
    () => createTrieFromSearchTerms(searchTerms),
    [searchTerms],
  );
  // console.log('trie', trie);

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
      {searchTerm && (
        <ul>
          {[...searchTrie(searchTerms, searchTerm)].map(title => {
            return (
              <div key={title}>
                <Link href={`/episodes/${processTitle(title)}`}>
                  <li key={title}>{title}</li>
                </Link>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Search;
