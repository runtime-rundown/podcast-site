import React from 'react';
import styles from '../styles/EpisodePage.module.css';
import LineBreak from './LineBreak';
import Comments from './Comments';

export default function Episode({ episodeDetails, src, content }) {
  console.log('episodeDetails', episodeDetails);
  return (
    <>
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
