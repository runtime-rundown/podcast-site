import { notFound } from 'next/navigation';
import Hero from '../../../components/Hero';
import Episode from '../../../components/Episode';
import { FEED, getFeed } from '../../../feeds/rss';

export const revalidate = 604800;

const processTitle = title => {
  return title.toLowerCase().replaceAll(' ', '-');
};

async function EpisodePage({ params: { slug } }) {
  // With `revalidate` this is treated like getStaticProps
  // https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#incremental-static-regeneration-getstaticprops-with-revalidate
  // https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#background-revalidation
  const { items } = await getFeed(FEED.url);
  const episode = items.find(item => {
    return processTitle(item.title) === slug;
  });

  if (!episode) {
    notFound();
  }

  const {
    pubDate,
    content,
    enclosure: { url: src },
    ...episodeDetails
  } = episode;

  return (
    <>
      <Hero isShort />
      <Episode episodeDetails={episodeDetails} content={content} src={src} />
    </>
  );
}

export default EpisodePage;

// produces a page for every episode
export async function generateStaticParams() {
  const { items } = await getFeed(FEED.url);

  return items.map(({ title }) => ({
    slug: `${processTitle(title)}`,
  }));
}
