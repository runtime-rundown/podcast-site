import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from '../styles/ContactForm.module.css';

export const formTypes = {
  contact: 'contact',
  question: 'question',
}

function ContactForm({
  thanksMessage = 'Thank you for getting involved!',
  messageLabel = 'Your Message:',
  formType = formTypes.contact
}) {
  const [state, handleSubmit] = useForm('xkneoezr');
  if (state.succeeded) {
    return <p>{thanksMessage}</p>;
  }
  return (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <label htmlFor="email">Email Address:</label>
      <input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <label htmlFor="message">{messageLabel}</label>
      <textarea id="message" name="message" />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <input type="hidden" id="form-type" name="form-type" value={formType} />
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

export default ContactForm;
