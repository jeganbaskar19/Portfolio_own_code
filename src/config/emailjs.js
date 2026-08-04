// ============================================================
// EMAILJS CONFIGURATION
// Lets your contact form send real emails to your inbox with no
// backend server. It's free for up to 200 emails/month.
//
// SETUP (5 minutes):
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. connect your Gmail) -> copy its
//    "Service ID" into SERVICE_ID below.
// 3. Create an Email Template (use {{name}}, {{email}}, {{subject}},
//    {{message}} as variables in the template body) -> copy its
//    "Template ID" into TEMPLATE_ID below.
// 4. Go to Account > General -> copy your "Public Key" into
//    PUBLIC_KEY below.
//
// Until you fill these in, the contact form automatically falls
// back to opening the visitor's email app instead (mailto) —
// nothing breaks either way.
// ============================================================

export const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_hc1zlpr',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ux8luvu',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'EydQGaYKCAQ9zCOcU'
};

export const isEmailjsConfigured =
  Boolean(emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey) &&
  !emailjsConfig.serviceId.startsWith('YOUR_') &&
  !emailjsConfig.templateId.startsWith('YOUR_') &&
  !emailjsConfig.publicKey.startsWith('YOUR_');

export default emailjsConfig;
