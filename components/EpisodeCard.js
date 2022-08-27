import Link from 'next/link';
import { format } from 'date-fns';
import styles from '../styles/EpisodeCard.module.css';

const processTitle = title => {
  return title.toLowerCase().replaceAll(' ', '-');
};

const EpisodeCard = ({ href, title, isoDate, ...rest }) => {
  console.log(rest);
  return (
    <div
      style={{ backgroundColor: 'var(--color-accent-pink)' }}
      className={styles.episodeCardWrapper}
    >
      <Link href={`/episodes/${processTitle(title)}`}>
        <a className={styles.episodeCard}>
          <div className={styles.episodeCardInternals}>
            <div className="font-bold">{title}</div>
            <div>{format(new Date(isoDate), 'PPP')}</div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default EpisodeCard;
