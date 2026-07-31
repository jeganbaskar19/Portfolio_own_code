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

function Contact() {
  const bgStyle = backgrounds.contact ? { backgroundImage: `url(${backgrounds.contact})` } : undefined;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    if (isEmailjsConfigured) {
      try {
        await emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          {
            name: form.name,
            email: form.email,
            subject: form.subject || `Portfolio enquiry from ${form.name}`,
            message: form.message,
            to_email: contact.email
          },
          { publicKey: emailjsConfig.publicKey }
        );
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
      }
      return;
    }

    // Fallback: no EmailJS configured yet, just open the visitor's email app.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    const subject = encodeURIComponent(form.subject || `Portfolio enquiry from ${form.name}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('success'), 500);
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

          <Reveal delay={0.1} as="form" className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <label>
                <span>{contact.formLabels.name}</span>
                <input required value={form.name} onChange={update('name')} type="text" />
              </label>
              <label>
                <span>{contact.formLabels.email}</span>
                <input required value={form.email} onChange={update('email')} type="email" />
              </label>
            </div>
            <label>
              <span>{contact.formLabels.subject}</span>
              <input value={form.subject} onChange={update('subject')} type="text" />
            </label>
            <label>
              <span>{contact.formLabels.message}</span>
              <textarea required value={form.message} onChange={update('message')} rows={5} />
            </label>

            <button type="submit" className="btn btn--solid contact__submit" disabled={status === 'sending'}>
              <FiSend size={15} />
              {status === 'sending' ? contact.formLabels.sending : contact.formLabels.submit}
            </button>

            {status === 'success' && <p className="contact__status contact__status--ok">{contact.formLabels.success}</p>}
            {status === 'error' && <p className="contact__status contact__status--err">{contact.formLabels.error}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
