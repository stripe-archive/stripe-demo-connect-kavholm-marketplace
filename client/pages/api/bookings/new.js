import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import {validateToken} from '../../../utils/authToken';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);
  const decodedToken = validateToken(token);

  if (decodedToken) {
    let authenticatedUserId = decodedToken.userId;

    try {
      let {
        listingId,
        totalAmount,
        currency,
        endDate,
        startDate,
        chargeToken,
      } = req.body;

      // Step 1: Create new booking
      const bookingObject = {
        id: shortid.generate(),
        listingId: String(listingId),
        bookingUserId: String(authenticatedUserId),
        startDate: startDate,
        endDate: endDate,
        totalAmount: String(totalAmount),
        currency: currency,
      };

      storage
        .get('bookings')
        .push(bookingObject)
        .write();

      // Step 2: Make Payment Request to Stripe
      let response = {};

      if (chargeToken) {
        // Apple Pay aka Web Payment Request is using charges.
        const paymentCharge = await stripe.charges.create({
          amount: totalAmount,
          currency: currency,
          description: 'Kavholm',
          source: chargeToken,
        });
        response = {
          ...bookingObject,
        };
      } else {
        let payParams = {
          payment_method_types: ['card'],
          amount: totalAmount,
          currency: currency,
        };

        const paymentIntent = await stripe.paymentIntents.create(payParams);
        response = {
          ...bookingObject,
          paymentRequestSecret: paymentIntent.client_secret,
        };
      }

      return res.status(200).json(response);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
