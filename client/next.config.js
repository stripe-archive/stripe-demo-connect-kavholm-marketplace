const config = require('./helpers/config');

module.exports = {
  target: 'server',
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    stripe: {
      publicKey:
        process.env.NODE_ENV === 'production'
          ? config.stripe.live.publicKey
          : config.stripe.test.publicKey,
    },
  },
};
