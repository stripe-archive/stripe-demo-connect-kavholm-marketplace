import fetch from 'isomorphic-unfetch';
import config from '../../../helpers/config';
import storage from '../../../helpers/storage';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

let makeStripeConnectRequest = async (code) => {
  let clientId =
    process.env.NODE_ENV === 'production'
      ? config.stripe.live.clientId
      : config.stripe.test.clientId;
  let secretKey =
    process.env.NODE_ENV === 'production'
      ? config.stripe.live.secretKey
      : config.stripe.test.secretKey;

  let params = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: secretKey,
    code: code,
  };

  let url = 'https://connect.stripe.com/oauth/token';

  console.log('StripeSetup', params);

  return await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {'Content-Type': 'application/json'},
  }).then((res) => res.json());
};

let updateUserAccount = async (authenticatedUserId, stripeUserId) => {
  try {
    let stripeObject = {
      stripeUserId: stripeUserId,
    };

    storage
      .get('users')
      .find({userId: authenticatedUserId})
      .assign({
        stripe: stripeObject,
      })
      .write();
  } catch (err) {
    throw new Error('StripeSetup.update.user.failed', err);
  }
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
      console.log('StripeSetup.abort.no.stripeUserId');
      return;
    }

    await updateUserAccount(authenticatedUserId, stripeUserId);

    return res.status(200).json({status: 'ok'});
  } catch (err) {
    console.log('StripeSetup.error', err);
    return res.status(400).json(err);
  }
});
