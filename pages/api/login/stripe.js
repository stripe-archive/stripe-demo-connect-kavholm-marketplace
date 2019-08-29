const redirect = require('micro-redirect');
import fetch from 'isomorphic-unfetch';

import config from '../../../helpers/stripe';

import {generateToken} from '../../../utils/authToken';

export default async (req, res) => {
  // 1) Post the authorization code to Stripe to complete the Express onboarding flow
  let url = 'https://connect.stripe.com/oauth/token';

  const {code} = req.body;

  let params = {
    grant_type: 'authorization_code',
    client_id: config.stripe.clientId,
    client_secret: config.stripe.secretKey,
    code: code,
  };

  const request = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  }).then((res) => res.json());

  console.log('request', request);

  if (request.error) {
    return res.status(400).json(request);
  } else {
    let stripeUserId = request.stripe_user_id;
    let stripeAccessToken = request.access_token;

    const token = generateToken({stripeUserId: stripeUserId});

    console.log('api/login/stripe.token', token);

    return res.send({token: token});
  }
};
