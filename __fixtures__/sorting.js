export const sortingFixture = [
  { title: 'Title with foo', contentSnippet: 'An episode with foo and bar' },
  {
    title: 'Title with bar',
    contentSnippet: 'An episode with bar and foo',
  },
  {
    title: 'Title with foo and bar',
    contentSnippet: 'An episode with both foo and bar',
  },
  {
    title: 'Title with baz',
    contentSnippet: 'Another episode with both foo and bar and baz',
  },
];

export const sortingMapFixture = {
  'Title with foo': {
    title: 'Title with foo',
    contentSnippet: 'An episode with foo and bar',
  },
  'Title with bar': {
    title: 'Title with bar',
    contentSnippet: 'An episode with bar and foo',
  },
  'Title with foo and bar': {
    title: 'Title with foo and bar',
    contentSnippet: 'An episode with both foo and bar',
  },
  'Title with baz': {
    title: 'Title with baz',
    contentSnippet: 'Another episode with both foo and bar and baz',
  },
};

export const sortingSearchTermsFixture = {
  an: new Set(['Title with foo', 'Title with bar', 'Title with foo and bar']),
  and: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
  another: new Set(['Title with baz']),
  bar: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
  baz: new Set(['Title with baz']),
  both: new Set(['Title with foo and bar', 'Title with baz']),
  episode: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
  foo: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
  title: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
  with: new Set([
    'Title with foo',
    'Title with bar',
    'Title with foo and bar',
    'Title with baz',
  ]),
};

export const sortingTrieFixture = {
  a: {
    n: {
      d: {
        words: ['and'],
      },
      o: {
        t: {
          h: {
            e: {
              r: {
                words: ['another'],
              },
              words: ['another'],
            },
            words: ['another'],
          },
          words: ['another'],
        },
        words: ['another'],
      },
      words: ['an', 'and', 'another'],
    },
    words: ['an', 'and', 'another'],
  },
  b: {
    a: {
      r: {
        words: ['bar'],
      },
      words: ['bar', 'baz'],
      z: {
        words: ['baz'],
      },
    },
    o: {
      t: {
        h: {
          words: ['both'],
        },
        words: ['both'],
      },
      words: ['both'],
    },
    words: ['bar', 'baz', 'both'],
  },
  e: {
    p: {
      i: {
        s: {
          o: {
            d: {
              e: {
                words: ['episode'],
              },
              words: ['episode'],
            },
            words: ['episode'],
          },
          words: ['episode'],
        },
        words: ['episode'],
      },
      words: ['episode'],
    },
    words: ['episode'],
  },
  f: {
    o: {
      o: {
        words: ['foo'],
      },
      words: ['foo'],
    },
    words: ['foo'],
  },
  t: {
    i: {
      t: {
        l: {
          e: {
            words: ['title'],
          },
          words: ['title'],
        },
        words: ['title'],
      },
      words: ['title'],
    },
    words: ['title'],
  },
  w: {
    i: {
      t: {
        h: {
          words: ['with'],
        },
        words: ['with'],
      },
      words: ['with'],
    },
    words: ['with'],
  },
  words: [],
};
