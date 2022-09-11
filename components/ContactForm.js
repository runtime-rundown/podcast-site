import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/ContactForm.module.css';

function ContactForm() {
  const [state, handleSubmit] = useForm('xkneoezr');
  if (state.succeeded) {
    return <p>Thank you for getting involved!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <label htmlFor="email">Email Address:</label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <label htmlFor="message">Your Message:</label>
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button
        type="submit"
        disabled={state.submitting}
        className={styles.contactFormButtonWrapper}
      >
        <div className={styles.contactFormButtonText}>Submit</div>
      </button>
    </form>
  );
}
function App() {
  return <ContactForm />;
}
export default App;
