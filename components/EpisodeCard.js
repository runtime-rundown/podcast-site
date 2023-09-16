import Link from 'next/link';
import { format } from 'date-fns';
import styles from '../styles/EpisodeCard.module.css';

const processTitle = title => {
  return title.toLowerCase().replaceAll(' ', '-');
};

function truncate(str, n, useWordBoundary = true) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(' '))
      : subString) + '...'
  );
}

function getBackgroundColor() {
  const int = Math.floor(Math.random() * 8);
  return colors[int];
}

const colors = {
  0: '--color-accent-pink',
  1: '--color-accent-purple',
  2: '--color-accent-teal',
  3: '--color-base-teal',
  4: '--color-accent-pink',
  5: '--color-accent-purple',
  6: '--color-accent-teal',
  7: '--color-base-teal',
};

const EpisodeCard = ({ href, title, isoDate, contentSnippet, ...rest }) => {
  return (
    <div
      style={{ backgroundColor: `var(${getBackgroundColor()})` }}
      className={styles.episodeCardWrapper}
    >
      <Link
        href={`/episodes/${processTitle(title)}`}
        className={styles.episodeCard}
      >
        <div className={styles.episodeCardInternals}>
          <div className={styles.episodeDate}>
            {format(new Date(isoDate), 'PP')}
          </div>
          <div>
            <h3 className={styles.episodeTitle}>{title}</h3>
            <p className={styles.episodeSnippet}>
              {truncate(contentSnippet, 100)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
