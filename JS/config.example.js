/**
 * PRIVATE CONFIG — DO NOT COMMIT THIS FILE WITH REAL KEYS
 *
 * Setup:
 * 1. Copy this file:  cp JS/config.example.js JS/config.js
 * 2. Add your real keys in JS/config.js
 * 3. JS/config.js is in .gitignore and will NOT be pushed to GitHub
 *
 * For live site (GitHub Pages):
 * - Add WEB3FORMS_ACCESS_KEY in GitHub → Settings → Secrets → Actions
 * - The deploy workflow generates config.js automatically on publish
 *
 * Extra security: enable domain restriction at https://web3forms.com
 */
const PORTFOLIO_CONFIG = {
  contact: {
    web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
    recipientEmail: 'your-email@gmail.com'
  }
};
