import styles from '../styles/LineBreak.module.css';

const LineBreak = ({ content }) => {
  return <hr className={styles.lineBreak} data-content={content} />;
};

export default LineBreak;
