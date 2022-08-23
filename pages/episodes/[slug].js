import { FEED, getFeed } from '../../feeds/rss';

const processTitle = (title) => {
  return title.toLowerCase().replaceAll(' ', '-');
};

const EpisodePage = ({ pubDate, content, enclosure: { url: src } }) => {
  return (
    <>
      <div>{pubDate}</div>
      <audio controls>
        <source src={src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default EpisodePage;

// produces a page for every episode
export async function getStaticPaths() {
  const detailedFeed = await getFeed(FEED.url);
  const paths = detailedFeed.items.map((feedItem) => ({
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
  const episode = items.find((item) => {
    return processTitle(item.title) === slug;
  });
  return {
    // Passed to the page component as props
    props: { ...episode },
  };
}
