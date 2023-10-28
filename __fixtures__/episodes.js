export const episodesFixture = [
  { title: 'React', contentSnippet: 'An episode about React\nalways React' },
  { title: 'Testing', contentSnippet: 'An episode about testing' },
  { title: 'Other', contentSnippet: 'Another random episode' },
  { title: 'Bee', contentSnippet: 'Bee episode' },
];

export const episodeMapFixture = {
  React: {
    title: 'React',
    contentSnippet: 'An episode about React\nalways React',
  },
  Testing: { title: 'Testing', contentSnippet: 'An episode about testing' },
  Other: {
    title: 'Other',
    contentSnippet: 'Another random episode',
  },
  Bee: { title: 'Bee', contentSnippet: 'Bee episode' },
};

export const searchTermsFixture = {
  about: new Set(['React', 'Testing']),
  always: new Set(['React']),
  an: new Set(['React', 'Testing']),
  bee: new Set(['Bee']),
  other: new Set(['Other']),
  another: new Set(['Other']),
  episode: new Set(['React', 'Testing', 'Other', 'Bee']),
  react: new Set(['React']),
  random: new Set(['Other']),
  testing: new Set(['Testing']),
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
  b: {
    e: {
      e: {
        words: ['bee'],
      },
      words: ['bee'],
    },
    words: ['bee'],
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
    words: ['testing'],
  },
  words: [],
};
