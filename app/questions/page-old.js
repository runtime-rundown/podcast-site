'use client';
import styles from '../../styles/SuggestionsPage.module.css';
import LineBreak from '../../components/LineBreak';
import LogoBanner from '../../components/LogoBanner';
import ContactForm, { formTypes } from '../../components/ContactForm';

const Questions = () => {
  return (
    <>
      <div className={styles.suggestionsCard}>
        <LogoBanner />
      </div>
      <div className={styles.suggestionsCard}>
        <h2>Ask a Question</h2>
        <p>
          Have a question for us? Post it here and we might answer it on a
          future show!
        </p>
      </div>
      <div className={styles.suggestionsWrapper}>
        <div className={styles.suggestionsCard}>
          <LineBreak content="Ask us a Question" />
          <ContactForm
            formType={formTypes.question}
            thanksMessage="Thank you for your question!"
            messageLabel="Your Question (include a name, we won't read your email address on the show):"
          />
        </div>
      </div>
    </>
  );
};

export default Questions;
