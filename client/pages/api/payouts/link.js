import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    // 1) Get User
    let userAccount = storage
      .get('users')
      .find({userId: authenticatedUserId})
      .value();

    if (!userAccount.stripe) {
      throw new Error('No stripe account found');
    }

    // 2) Call Stripe
    let stripeUserId = userAccount.stripe.stripeUserId;
    let stripeReq = await stripe.accounts.createLoginLink(stripeUserId);

    // 3) Return url
    return res.status(200).json(stripeReq);
  } catch (err) {
    logger.log('accountLink.err', err);
    return res.status(400).json(err);
  }
});
