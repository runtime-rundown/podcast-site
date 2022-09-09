import styles from '../../styles/EpisodePage.module.css';
import Comments from '../../components/Comments';
import LineBreak from '../../components/LineBreak';
import LogoBanner from '../../components/LogoBanner';
import Hero from '../..components/Hero';
import { FEED, getFeed } from '../../feeds/rss';

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
      Hero
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
    revalidate: 604800, // this is a week
  };
}
