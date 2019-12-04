const https = require('https');
const {parse} = require('url');
const next = require('next');
const fs = require('fs');
const devcert = require('devcert');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const port = parseInt(process.env.PORT, 10) || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  if (dev) {
    devcert.certificateFor('localhost', {installCertutil: true}).then((ssl) => {
      https.createServer(ssl, server).listen(port, (err) => {
        if (err) throw err;
        // eslint-disable-next-line
        console.log(`> Ready on https://localhost:${port}`);
      });
    });
  } else {
    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
