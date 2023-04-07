import * as Sentry from '@sentry/browser';
import Constants from 'expo-constants';

const pJson = require('../../package.json');

Sentry.init({
  dsn: Constants.expoConfig.extra.SENTRY_DSN,

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: `puppy@${pJson.version}`,
  integrations: [new Sentry.BrowserTracing()],
  environment: Constants.expoConfig.extra.APP_ENV,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: Constants.expoConfig.extra.APP_ENV === 'production' ? 0.3 : 1.0,
});

const logger = Sentry;

export default logger;
