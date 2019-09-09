import stripe from '../../../helpers/stripe';
import storage from '../../../helpers/storage';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import getHost from '../../../utils/get-host';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let account = storage
      .get('users')
      .find({userId: authenticatedUserId})
      .value();

    let listingId = req.body.listingId;

    let baseUrl = getHost(req) + `/listings/${listingId}`;
    let returnUrl = `${baseUrl}?action=booking&verified=true`;
    let cancelUrl = `${baseUrl}?action=booking&verified=false`;

    const verificationIntent = await stripe.verificationIntents.create({
      return_url: returnUrl,
      cancel_url: cancelUrl,
      requested_verifications: ['identity_document'],
      person_data: {
        email: account.email,
      },
    });

    return res.status(200).json({
      url: verificationIntent.next_action.redirect_to_url,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
});
