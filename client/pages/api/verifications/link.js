import stripe from '../../../helpers/stripe';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    // TODO Don't send this url along but use a configuration instead.
    let baseUrl = req.body.baseUrl;
    const verificationIntent = await stripe.verificationIntents.create({
      return_url: `${baseUrl}#success`,
      cancel_url: `${baseUrl}#faliure`,
      requested_verifications: ['identity_document'],
    });

    return res.status(200).json({
      url: verificationIntent.next_action.redirect_to_url,
    });
  } catch (err) {
    console.log('verifications.link.err', err);
    return res.status(400).json(err);
  }
});
