import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let userAccount = storage
      .get('users')
      .find({userId: authenticatedUserId})
      .unset('stripe')
      .write();

    return res.status(200).json('ok');
  } catch (err) {
    return res.status(400).json(err);
  }
});
