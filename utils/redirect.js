import Router from 'next/router';

function redirect(url, context) {
  console.log('redirect.redirect', url);

  if (typeof window !== 'undefined') {
    console.log('redirect.redirect.client');
    Router.push(url);
  } else {
    console.log('redirect.redirect.server');
    // context.res.writeHead(302, {Location: url}).end();
  }
}

export {redirect};
