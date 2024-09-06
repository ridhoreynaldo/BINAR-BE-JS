const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
require('dotenv').config();

// Inisialisasi Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // new Sentry.Integrations.Http({ tracing: true }),  // Enable HTTP tracing
    new Tracing.Integrations.Express({ app: null }), // Tracing untuk Express.js
  ],
  tracesSampleRate: 1.0,  // Atur sampling rate untuk tracing
});

module.exports = Sentry;
