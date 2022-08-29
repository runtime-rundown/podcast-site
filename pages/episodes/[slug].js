import styles from '../../styles/EpisodePage.module.css';
import Hero from '../../components/Hero';
import { FEED, getFeed } from '../../feeds/rss';
import Script from 'next/script';

const processTitle = title => {
  return title.toLowerCase().replaceAll(' ', '-');
};

const EpisodePage = ({
  pubDate,
  content,
  enclosure: { url: src },
  ...episodeDetails
}) => {
  console.log(episodeDetails);
  return (
    <>
      <Hero isShort />
      <div className={styles.episodePage}>
        <h3>{episodeDetails.title}</h3>
        <audio controls>
          <source src={src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
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
      <Script
        src="https://utteranc.es/client.js"
        repo="Cooperbuilt/runtime-rundown"
        issue-term="title"
        label="suggestion"
        theme="github-light"
        crossorigin="anonymous"
        async
      />
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
