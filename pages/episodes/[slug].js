import { FEED, getFeed } from '../../feeds/rss';
import { useRouter } from 'next/router';

const EpisodePage = (props) => {
  console.log(props.link);
  const router = useRouter();
  if (router.isFallback) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div>{props.pubDate}</div>
      <audio controls>
        <source src={props.src} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div dangerouslySetInnerHTML={{ __html: props.content }} />
    </>
  );
};

export default EpisodePage;

export async function getServerSideProps(context) {
  console.log(context.query);
  console.log('HEY');

  return {
    props: {
      ...context.query,
    },
  };
}
