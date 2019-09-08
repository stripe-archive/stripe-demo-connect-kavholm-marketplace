import Router from 'next/router';

function redirect(url, context) {
  console.log('redirect.redirect', url);

  if (context && context.res) {
    console.log('redirect.redirect.server');
    context.res.writeHead(302, {Location: url});
    context.res.end();
  } else {
    console.log('redirect.redirect.client');
    Router.push(url);
  }

  return {};
}

export {redirect};
