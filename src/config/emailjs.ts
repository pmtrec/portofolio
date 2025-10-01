// EmailJS Configuration
// Get these values from https://www.emailjs.com/
// 1. Create an account
// 2. Add a service (e.g., Gmail)
// 3. Create an email template
// 4. Get your Public Key from Account > General


export const EMAILJS_CONFIG = {
  SERVICE_ID: "porto",
  TEMPLATE_ID: "template_daoioch",
  PUBLIC_KEY: "8RJqtFB3vFtLR-WND"
};

// Template variables you can use in your EmailJS template:
// {{from_name}} - sender's name
// {{from_email}} - sender's email
// {{subject}} - email subject
// {{message}} - email message
// {{budget}} - budget (if provided)
// {{timeline}} - timeline (if provided)