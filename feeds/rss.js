import Parser from 'rss-parser';

export const FEED = {
  slug: 'runtime-rundown',
  title: 'Runtime Rundown Episodes',
  url: 'https://anchor.fm/s/a82ae100/podcast/rss',
};

export async function getFeed(feedUrl) {
  let parser = new Parser();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}
