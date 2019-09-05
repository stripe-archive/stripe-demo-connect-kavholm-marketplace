const redirect = require('micro-redirect');
import fetch from 'isomorphic-unfetch';
import config from '../../../helpers/stripe';
import storage from '../../../helpers/storage';

import {validateToken} from '../../../utils/authToken';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);

  const decodedToken = validateToken(token);

  if (!decodedToken) {
    return res.status(400).json({message: 'invalid token'});
  }

  let userId = decodedToken.userId;

  // 1) Post the authorization code to Stripe to complete the Express onboarding flow
  let url = 'https://connect.stripe.com/oauth/token';

  console.log('/api/payouts/setup.1');

  try {
    const {code} = req.body;

    let params = {
      grant_type: 'authorization_code',
      client_id: config.stripe.clientId,
      client_secret: config.stripe.secretKey,
      code: code,
    };

    const stripeRequest = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {'Content-Type': 'application/json'},
    }).then((res) => res.json());

    console.log('/api/payouts/setup.2');

    // 2) Update User account with StripeUserId
    let stripeUserId = stripeRequest.stripe_user_id;

    if (!stripeUserId) {
      throw new Error('Request to Stripe failed');
    }

    let stripeObject = {
      stripeUserId: stripeUserId,
    };

    let userAccount = storage
      .get('users')
      .find({userId: userId})
      .assign({
        stripe: stripeObject,
      })
      .write();

    console.log('/api/payouts/setup.2b', userAccount);

    return res.status(200).json({status: 'ok'});
  } catch (err) {
    console.log('setup error', err);
    return res.status(400).json(err);
  }
};
