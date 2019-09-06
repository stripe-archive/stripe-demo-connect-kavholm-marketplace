import config from '../../../helpers/config';

import {validateToken} from '../../../utils/authToken';
const stripe = require('stripe')(config.stripe.secretKey);

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

  let authenticatedUserId = decodedToken.userId;

  try {
    let baseUrl = req.body.baseUrl;
    // TODO Don't send this url along but use a configuration instead.
    const verificationIntent = await stripe.verificationIntents.create({
      return_url: `${baseUrl}#success`,
      cancel_url: `${baseUrl}#faliure`,
      requested_verifications: ['identity_document'],
    });

    return res.status(200).json({
      url: verificationIntent.next_action.redirect_to_url,
    });
  } catch (err) {
    console.log('verifiations.link.err', err);
    return res.status(400).json(err);
  }
};
