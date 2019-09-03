const redirect = require('micro-redirect');

import config from '../../../helpers/stripe';
import getHost from '../../../utils/get-host';
import {validateToken} from '../../../utils/authToken';
import storage from '../../../helpers/storage';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);
  const decodedToken = validateToken(token);

  if (decodedToken) {
    let userId = decodedToken.userId;

    try {
      let userAccount = storage
        .get('users')
        .find({userId: userId})
        .value();

      let clientId = config.stripe.clientId;

      // Pass UserAccount info along to Stripe
      let userEmail = userAccount.email;
      let userNameParts = userAccount.fullName
        ? userAccount.fullName.split(' ')
        : [];
      let userFirstName = userNameParts.length ? userNameParts[0] : '';
      let userLastName = userNameParts.length ? userNameParts[1] : '';

      // Generate urls
      const redirect_uri = getHost(req) + '/stripe/callback';
      const location = `https://connect.stripe.com/express/oauth/authorize?response_type=code&redirect_uri=${redirect_uri}&client_id=${clientId}&scope=read_write &stripe_user[email]=${userEmail}&stripe_user[first_name]=${userFirstName}&stripe_user[last_name]=${userLastName}`;

      return res.status(200).json({
        location: location,
      });
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
