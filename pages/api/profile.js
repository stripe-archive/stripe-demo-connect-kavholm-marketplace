import fetch from 'isomorphic-unfetch';
import config from '../../helpers/stripe';

import {validateToken} from '../../utils/authToken';
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
      let account = await stripe.accounts.retrieve({
        stripe_account: stripeUserId,
      });
      return res.status(200).json(account);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
