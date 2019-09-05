import storage from '../../../helpers/storage';
import {validateToken} from '../../../utils/authToken';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);
  const decodedToken = validateToken(token);

  if (decodedToken) {
    let userId = decodedToken.userId;
    let listingId = req.query.listingId;

    // TODO: Does the authenticated user have permissions to read bookings for listing?

    try {
      let bookings = storage
        .get('bookings')
        .filter({listingId: listingId})
        .value();

      return res.status(200).json(bookings);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
