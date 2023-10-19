import Parser from 'rss-parser';

export const FEED = {
  slug: 'runtime-rundown',
  title: 'Runtime Rundown Episodes',
  url: 'https://anchor.fm/s/a82ae100/podcast/rss',
};

/**
 * @typedef {{title: string, link: string, pubDate: string, content: string, contentSnippet: string}} FeedItem
 */

/**
 * @typedef {{items: FeedItem}} FeedResponse
 */

/**
 * @param {string} feedUrl
 * @returns {Promise<FeedResponse>}
 */
export async function getFeed(feedUrl) {
  let parser = new Parser();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}
