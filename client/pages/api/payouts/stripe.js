import config from '../../../helpers/config';
import getHost from '../../../utils/get-host';
import {validateToken} from '../../../utils/authToken';
import storage from '../../../helpers/storage';
const querystring = require('querystring');

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
    let userAccount = storage
      .get('users')
      .find({userId: userId})
      .value();

    let clientId =
      process.env.NODE_ENV === 'production'
        ? config.stripe.live.clientId
        : config.stripe.test.clientId;

    // Pass UserAccount info along to Stripe
    let userEmail = userAccount.email;
    let userNameParts = userAccount.fullName
      ? userAccount.fullName.split(' ')
      : [];
    let userFirstName = userNameParts.length ? userNameParts[0] : '';
    let userLastName = userNameParts.length ? userNameParts[1] : '';

    const redirect_uri = getHost(req) + '/stripe/callback';

    let stripeConnectParams = {
      response_type: 'code',
      redirect_uri: redirect_uri,
      client_id: clientId,
      scope: 'read_write',
      'stripe_user[email]': userEmail,
      'stripe_user[first_name]': userFirstName,
      'stripe_user[last_name]': userLastName,
      'stripe_user[business_type]': 'individual',
      'stripe_user[country]': 'SG',
    };

    let reqQuery = querystring.stringify(stripeConnectParams);

    const location = `https://connect.stripe.com/express/oauth/authorize?${reqQuery}`;

    return res.status(200).json({
      location: location,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};
