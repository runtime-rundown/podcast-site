import { format } from 'date-fns';
import { FEED, getFeed } from '../feeds/rss';
import Link from 'next/link';

const processTitle = (title) => {
  return title.toLowerCase().replaceAll(' ', '-');
};

export default function Home({ feed, items }) {
  return (
    <div>
      <h1>Welcome to Runtime Rundown!</h1>
      <div>
        {items.map((item) => {
          return (
            <Link
              href={{
                pathname: `/episodes/${processTitle(item.title)}`,
                query: {
                  ...item,
                  src: item.enclosure.url,
                },
              }}
              key={item.title}
            >
              <a>
                <div className="font-bold">{item.title}</div>
                <div>{format(new Date(item.isoDate), 'PPP')}</div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const feed = FEED;
  const detailedFeed = await getFeed(feed.url);

  return {
    props: {
      feed,
      items: detailedFeed.items,
    },
    revalidate: 1,
  };
}
