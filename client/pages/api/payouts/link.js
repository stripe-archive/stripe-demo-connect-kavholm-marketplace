import storage from '../../../helpers/storage';

import {validateToken} from '../../../utils/authToken';
import stripe from '../../../helpers/stripe';

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
  try {
    // 1) Get User
    let userAccount = storage
      .get('users')
      .find({userId: userId})
      .value();

    console.log('userAccount', userAccount);

    if (!userAccount.stripe) {
      throw new Error('No stripe account found');
    }

    // 2) Call Stripe
    let stripeUserId = userAccount.stripe.stripeUserId;
    let stripeReq = await stripe.accounts.createLoginLink(stripeUserId);

    // 3) Return url
    return res.status(200).json(stripeReq);
  } catch (err) {
    console.log('accountLink.err', err);
    return res.status(400).json(err);
  }
};
