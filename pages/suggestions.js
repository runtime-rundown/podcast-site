import styles from '../styles/SuggestionsPage.module.css';
import Comments from '../components/Comments';
import LineBreak from '../components/LineBreak';
import LogoBanner from '../components/LogoBanner';

const Suggestions = () => {
  return (
    <div className={styles.suggestions}>
      <LogoBanner />
      <h2>Get Involved in the Show</h2>
      <p>
        We have a few ways to get involved. First up is the message board below.
        You can use this to give us a suggestion, shout out the show, etc.{' '}
      </p>
    </div>
  );
};

export default Suggestions;
