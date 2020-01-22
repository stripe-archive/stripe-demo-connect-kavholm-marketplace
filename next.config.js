const env = require('dotenv').config({path: './.env'});

module.exports = {
  target: 'server',
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },

  experimental: {publicDirectory: true},
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    stripe: {
      publicKey: process.env.STRIPE_PUBLIC_KEY,
    },
    isTestMode:
      process.env.STRIPE_PUBLIC_KEY &&
      process.env.STRIPE_PUBLIC_KEY.indexOf('pk') > -1,
  },
};
