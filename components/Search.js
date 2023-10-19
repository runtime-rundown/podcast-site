'use client';
import React, { useState } from 'react';
import Link from 'next/link';

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

// TODO: Deduplicate
function processTitle(title) {
  return title.toLowerCase().replaceAll(' ', '-');
}

function Search({ searchTerms, trie }) {
  const [searchTerm, setSearchTerm] = useState('');

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
