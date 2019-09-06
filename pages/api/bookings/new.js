import storage from '../../../helpers/storage';
import {validateToken} from '../../../utils/authToken';
import shortid from 'shortid';
import {start} from 'repl';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);
  const decodedToken = validateToken(token);

  if (decodedToken) {
    let authenticatedUserId = decodedToken.userId;
    let {listingId, totalAmount, currency, endDate, startDate} = req.body;

    // Step 1: Create new booking
    const bookingObject = {
      id: shortid.generate(),
      listingId: listingId,
      bookingUserId: authenticatedUserId,
      startDate: startDate,
      endDate: endDate,
      totalAmount: totalAmount,
      currency: currency,
    };

    try {
      storage
        .get('bookings')
        .push(bookingObject)
        .write();

      // Step 2: Make Payment Request to Stripe

      return res.status(200).json(bookingObject);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
