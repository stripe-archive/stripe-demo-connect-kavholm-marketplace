import config from '../../../helpers/stripe';

import {validateToken} from '../../../utils/authToken';
const stripe = require('stripe')(config.stripe.secretKey);

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }

  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);

  const decodedToken = validateToken(token);

  if (decodedToken) {
    let stripeUserId = decodedToken.stripeUserId;

    try {
      let accountLink = await stripe.accountLinks.create({
        stripe_account: stripeUserId,
        type: 'custom_account_update',
        failure_url: 'http://localhost:3000/faliure',
        success_url: 'http://localhost:3000/success',
      });

      console.log('accountLink', accountLink);

      return res.status(200).json(accountLink);
    } catch (err) {
      console.log('accountLink.err', err);
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
