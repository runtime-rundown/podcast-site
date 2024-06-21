export const episodesFixture = [
  { title: 'React', contentSnippet: 'An episode about React\nalways React' },
  { title: 'Testing', contentSnippet: 'An episode about testing' },
  { title: 'Testing Two', contentSnippet: 'Another episode about testing' },
  { title: 'Other', contentSnippet: 'Another random episode' },
  { title: 'Another', contentSnippet: 'Another other random episode' },
  { title: 'Career', contentSnippet: 'Career episode' },
];

export const episodeMapFixture = {
  React: {
    title: 'React',
    contentSnippet: 'An episode about React\nalways React',
  },
  Testing: { title: 'Testing', contentSnippet: 'An episode about testing' },
  'Testing Two': {
    title: 'Testing Two',
    contentSnippet: 'Another episode about testing',
  },
  Another: {
    title: 'Another',
    contentSnippet: 'Another other random episode',
  },
  Other: {
    title: 'Other',
    contentSnippet: 'Another random episode',
  },
  Career: { title: 'Career', contentSnippet: 'Career episode' },
};

export const searchTermsFixture = {
  about: new Set(['React', 'Testing', 'Testing Two']),
  always: new Set(['React']),
  an: new Set(['React', 'Testing']),
  career: new Set(['Career']),
  other: new Set(['Other', 'Another']),
  another: new Set(['Testing Two', 'Other', 'Another']),
  episode: new Set([
    'React',
    'Testing',
    'Testing Two',
    'Other',
    'Career',
    'Another',
  ]),
  react: new Set(['React']),
  random: new Set(['Other', 'Another']),
  two: new Set(['Testing Two']),
  testing: new Set(['Testing', 'Testing Two']),
};

export const trieFixture = {
  a: {
    b: {
      o: {
        u: {
          t: {
            words: ['about'],
          },
          words: ['about'],
        },
        words: ['about'],
      },
      words: ['about'],
    },
    l: {
      w: {
        a: {
          y: {
            s: {
              words: ['always'],
            },
            words: ['always'],
          },
          words: ['always'],
        },
        words: ['always'],
      },
      words: ['always'],
    },
    n: {
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
      words: ['an', 'another'],
    },
    words: ['about', 'always', 'an', 'another'],
  },
  c: {
    a: {
      r: {
        e: {
          e: {
            r: {
              words: ['career'],
            },
            words: ['career'],
          },
          words: ['career'],
        },
        words: ['career'],
      },
      words: ['career'],
    },
    words: ['career'],
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
  r: {
    a: {
      n: {
        d: {
          o: {
            m: {
              words: ['random'],
            },
            words: ['random'],
          },
          words: ['random'],
        },
        words: ['random'],
      },
      words: ['random'],
    },
    e: {
      a: {
        c: {
          t: {
            words: ['react'],
          },
          words: ['react'],
        },
        words: ['react'],
      },
      words: ['react'],
    },
    words: ['random', 'react'],
  },
  o: {
    t: {
      h: {
        e: {
          r: {
            words: ['other'],
          },
          words: ['other'],
        },
        words: ['other'],
      },
      words: ['other'],
    },
    words: ['other'],
  },
  t: {
    e: {
      s: {
        t: {
          i: {
            n: {
              g: {
                words: ['testing'],
              },
              words: ['testing'],
            },
            words: ['testing'],
          },
          words: ['testing'],
        },
        words: ['testing'],
      },
      words: ['testing'],
    },
    w: {
      o: {
        words: ['two'],
      },
      words: ['two'],
    },
    words: ['testing', 'two'],
  },
  words: [],
};
