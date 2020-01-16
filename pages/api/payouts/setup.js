import fetch from 'isomorphic-unfetch';
import storage from '../../../helpers/storage';
import logger from '../../../helpers/logger';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

const env = require('dotenv').config({path: './.env'});

let makeStripeConnectRequest = async (code) => {
  let clientId = process.env.STRIPE_CLIENT_ID;
  let secretKey = process.env.STRIPE_SECRET_KEY;

  let params = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: secretKey,
    code: code,
  };

  let url = 'https://connect.stripe.com/oauth/token';

  logger.log('StripeSetup.makeStripeConnectRequest.params', params);

  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  })
    .then((res) => res.json())
    .catch((err) => {
      logger.log('StripeSetup.makeStripeConnectRequest.error', err);
    });
};

let updateUserAccount = async (authenticatedUserId, stripeUserId) => {
  let stripeObject = {
    stripeUserId: stripeUserId,
  };

  return storage
    .get('users')
    .find({userId: authenticatedUserId})
    .assign({
      stripe: stripeObject,
    })
    .write();
};

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    const {code} = req.body;

    // 1) Post the authorization code to Stripe to complete the Express onboarding flow
    let stripeConnectRequest = await makeStripeConnectRequest(code);

    console.log('stripeConnectRequest', stripeConnectRequest);
    // 2) Update User account with StripeUserId
    let stripeUserId = stripeConnectRequest.stripe_user_id;

    if (!stripeUserId) {
      logger.log('StripeSetup.abort.no.stripeUserId');
      return res.status(400).json({msg: 'Connect request to Stripe failed'});
    }

    updateUserAccount(authenticatedUserId, stripeUserId);

    return res.status(200).json({status: 'ok'});
  } catch (err) {
    logger.log('StripeSetup.error', err);
    return res.status(400).json(err);
  }
});
