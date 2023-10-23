export const episodesFixture = [
  { title: 'React', contentSnippet: 'An episode about React\nalways React' },
  { title: 'Testing', contentSnippet: 'An episode about testing' },
  {
    title: 'Another title',
    contentSnippet: 'An episode about something else',
  },
];

export const episodeMapFixture = {
  React: {
    title: 'React',
    contentSnippet: 'An episode about React\nalways React',
  },
  Testing: { title: 'Testing', contentSnippet: 'An episode about testing' },
  'Another title': {
    title: 'Another title',
    contentSnippet: 'An episode about something else',
  },
};

export const searchTermsFixture = {
  about: new Set(['React', 'Testing', 'Another title']),
  always: new Set(['React']),
  an: new Set(['React', 'Testing', 'Another title']),
  another: new Set(['Another title']),
  else: new Set(['Another title']),
  episode: new Set(['React', 'Testing', 'Another title']),
  react: new Set(['React']),
  something: new Set(['Another title']),
  testing: new Set(['Testing']),
  title: new Set(['Another title']),
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
  e: {
    l: {
      s: {
        e: {
          words: ['else'],
        },
        words: ['else'],
      },
      words: ['else'],
    },
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
    words: ['else', 'episode'],
  },
  r: {
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
    words: ['react'],
  },
  s: {
    o: {
      m: {
        e: {
          t: {
            h: {
              i: {
                n: {
                  g: {
                    words: ['something'],
                  },
                  words: ['something'],
                },
                words: ['something'],
              },
              words: ['something'],
            },
            words: ['something'],
          },
          words: ['something'],
        },
        words: ['something'],
      },
      words: ['something'],
    },
    words: ['something'],
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
    words: ['testing', 'title'],
  },
  words: [],
};
