import styles from '../../styles/EpisodePage.module.css';
import Hero from '../../components/Hero';
import Comments from '../../components/Comments';
import LineBreak from '../../components/LineBreak';
import { FEED, getFeed } from '../../feeds/rss';
import AudioCard from 'audiocard';

const processTitle = title => {
  return title.toLowerCase().replaceAll(' ', '-');
};

const EpisodePage = ({
  pubDate,
  content,
  enclosure: { url: src },
  ...episodeDetails
}) => {
  return (
    <>
      <Hero isShort />
      <div className={styles.episodePlayer}>
        <AudioCard
          source={src}
          title={episodeDetails.title}
          skipBackSeconds={15}
          skipForwardSeconds={15}
          color="var(--color-base-blue)"
          background="transparent"
          progressBarBackground="var(--color-base-white)"
          progressBarCompleteBackground="var(--color-base-blue)"
        />
      </div>
      <div className={styles.episodePageCard}>
        <h3 className={styles.episodeTitle}>{episodeDetails.title}</h3>
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
      <div className={styles.episodePageCard}>
        <LineBreak content="Comment On This Episode" />
        <Comments />
      </div>
    </>
  );
};

export default EpisodePage;

// produces a page for every episode
export async function getStaticPaths() {
  const detailedFeed = await getFeed(FEED.url);
  const paths = detailedFeed.items.map(feedItem => ({
    params: { slug: `${processTitle(feedItem.title)}` },
  }));

  return {
    paths,
    fallback: false,
  };
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;
  const { items } = await getFeed(FEED.url);
  const episode = items.find(item => {
    return processTitle(item.title) === slug;
  });
  return {
    // Passed to the page component as props
    props: { ...episode },
  };
}
