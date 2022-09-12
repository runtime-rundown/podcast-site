import styles from '../styles/SuggestionsPage.module.css';
import Comments from '../components/Comments';
import LineBreak from '../components/LineBreak';
import LogoBanner from '../components/LogoBanner';
import ContactForm from '../components/ContactForm';

const Suggestions = () => {
  return (
    <>
      <div className={styles.suggestionsCard}>
        <LogoBanner />
      </div>
      <div className={styles.suggestionsCard}>
        <h2>Get Involved in the Show</h2>
        <p>
          Read a good article lately? Feedback on the show in general? We would
          love to hear from you! There&apos;s a few ways to get involved,
          choose the one that makes the most sense.{' '}
        </p>
      </div>
      <div className={styles.suggestionsWrapper}>
        <div className={styles.suggestionsCard}>
          <LineBreak content="Send us an email" />
          <ContactForm />
        </div>
        <div className={styles.suggestionsCard}>
          <LineBreak content="Make a Quick Comment" />
          <Comments />
        </div>
      </div>
    </>
  );
};

export default Suggestions;
