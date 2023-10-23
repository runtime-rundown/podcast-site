import Parser from 'rss-parser';

export const FEED = {
  slug: 'runtime-rundown',
  title: 'Runtime Rundown Episodes',
  url: 'https://anchor.fm/s/a82ae100/podcast/rss',
};

export type Episode = {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  contentSnippet: string;
};

type FeedResponse = {
  items: Episode[];
};

export async function getFeed(feedUrl: string): Promise<FeedResponse> {
  let parser = new Parser<FeedResponse>();

  let feed = await parser.parseURL(feedUrl);

  return feed;
}
