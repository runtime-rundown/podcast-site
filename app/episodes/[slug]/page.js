import { notFound } from 'next/navigation';
import styles from '../../../styles/EpisodePage.module.css';
import Comments from '../../../components/Comments';
import LineBreak from '../../../components/LineBreak';
import Hero from '../../../components/Hero';
import { FEED, getFeed } from '../../../feeds/rss';

export const revalidate = 604800;

// TODO: Deduplicate
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
      <div className={styles.episodeDetailsWrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.episodeTitle}>{episodeDetails.title}</h3>
          <audio controls>
            <source src={src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className={styles.episodePageCard}>
          <LineBreak content="Episode Details" />
          <div
            className={styles.episodeDetails}
            dangerouslySetInnerHTML={{
              __html: content.replace(
                /href/g,
                "target='_blank' rel='noreferrer' href",
              ),
            }}
          />
        </div>
      </div>
      <div className={styles.episodePageCard}>
        <LineBreak content="Comment On This Episode" />
        <Comments />
      </div>
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
