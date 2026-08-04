import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { contact } from '../../data';
import { backgrounds } from '../../config/backgrounds';
import { emailjsConfig, isEmailjsConfigured } from '../../config/emailjs';
import SectionHeading from '../shared/SectionHeading';
import SocialLinks from '../shared/SocialLinks';
import Reveal from '../shared/Reveal';
import './Contact.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!form.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!EMAIL_RE.test(form.email.trim())) {
    errors.email = 'That email address doesn\u2019t look right.';
  }
  if (!form.message.trim()) {
    errors.message = 'Please add a short message.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

function Contact() {
  const bgStyle = backgrounds.contact ? { backgroundImage: `url(${backgrounds.contact})` } : undefined;
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...form, [field]: value }));
    }
  };

  const markTouched = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('sending');

    if (isEmailjsConfigured) {
      try {
        emailjs.init(emailjsConfig.publicKey);
        const response = await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            from_name: form.name,
            name: form.name,
            user_name: form.name,
            from_email: form.email,
            email: form.email,
            user_email: form.email,
            reply_to: form.email,
            subject: form.subject || `Portfolio enquiry from ${form.name}`,
            message: form.message,
            to_name: 'Jegan Baskar',
            to_email: contact.email
          },
          emailjsConfig.publicKey
        );
        console.log('EmailJS Success:', response);
        setStatus('success');
        setForm(EMPTY_FORM);
        setTouched({});
        setErrors({});
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
      }
      return;
    }

    // Fallback: no EmailJS configured yet, just open the visitor's email app.
    try {
      const body = encodeURIComponent(`${form.message}\n\n\u2014 ${form.name} (${form.email})`);
      const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`);
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setStatus('success');
      setForm(EMPTY_FORM);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('mailto fallback error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section section--paper contact" style={bgStyle}>
      <div className="section__scrim" />
      <div className="container section__inner">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} description={contact.description} />

        <div className="contact__grid">
          <Reveal className="contact__info">
            <a className="contact__info-row" href={`mailto:${contact.email}`}>
              <FiMail size={18} />
              <span>{contact.email}</span>
            </a>
            <a className="contact__info-row" href={`tel:${contact.phone.replace(/\s/g, '')}`}>
              <FiPhone size={18} />
              <span>{contact.phone}</span>
            </a>
            <div className="contact__info-row">
              <FiMapPin size={18} />
              <span>{contact.location}</span>
            </div>
            <div className="contact__availability">
              <span className="contact__availability-dot" />
              {contact.availability}
            </div>

            <div className="contact__socials">
              <span className="contact__socials-label">Find me elsewhere</span>
              <SocialLinks variant="paper" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__row">
                <label>
                  <span>{contact.formLabels.name}</span>
                  <input
                    value={form.name}
                    onChange={update('name')}
                    onBlur={markTouched('name')}
                    type="text"
                    className={touched.name && errors.name ? 'contact__input--invalid' : ''}
                    aria-invalid={Boolean(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && <span className="contact__field-error">{errors.name}</span>}
                </label>
                <label>
                  <span>{contact.formLabels.email}</span>
                  <input
                    value={form.email}
                    onChange={update('email')}
                    onBlur={markTouched('email')}
                    type="email"
                    className={touched.email && errors.email ? 'contact__input--invalid' : ''}
                    aria-invalid={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && <span className="contact__field-error">{errors.email}</span>}
                </label>
              </div>
              <label>
                <span>{contact.formLabels.subject}</span>
                <input value={form.subject} onChange={update('subject')} type="text" />
              </label>
              <label>
                <span>{contact.formLabels.message}</span>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  onBlur={markTouched('message')}
                  rows={3}
                  className={touched.message && errors.message ? 'contact__input--invalid' : ''}
                  aria-invalid={Boolean(touched.message && errors.message)}
                />
                {touched.message && errors.message && <span className="contact__field-error">{errors.message}</span>}
              </label>

              <button type="submit" className="btn btn--solid contact__submit" disabled={status === 'sending'}>
                <FiSend size={15} />
                {status === 'sending' ? contact.formLabels.sending : contact.formLabels.submit}
              </button>

              {status === 'success' && (
                <div className="contact__status-card contact__status-card--success">
                  <span className="contact__status-title">✔ Message Sent Successfully!</span>
                  <p className="contact__status-text">
                    Thank you for reaching out. Your email has been delivered and I will respond as soon as possible.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="contact__status-card contact__status-card--error">
                  <span className="contact__status-title">✖ Could Not Send Email via Form</span>
                  <p className="contact__status-text">
                    Please reach out directly via email at{' '}
                    <a href={`mailto:${contact.email}`} className="contact__status-link">
                      {contact.email}
                    </a>{' '}
                    or call/WhatsApp at{' '}
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="contact__status-link">
                      {contact.phone}
                    </a>.
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
