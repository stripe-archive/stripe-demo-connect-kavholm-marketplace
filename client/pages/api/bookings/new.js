import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let {
      listingId,
      amount,
      currency,
      endDate,
      startDate,
      chargeToken,
    } = req.body;

    // Step 1: Create new booking in Kavholm
    const bookingObject = {
      id: shortid.generate(),
      listingId: String(listingId),
      bookingUserId: authenticatedUserId,
      startDate: startDate,
      endDate: endDate,
      totalAmount: String(amount),
      currency: currency,
    };

    storage
      .get('bookings')
      .push(bookingObject)
      .write();

    // Step 2: Resolve hosts Stripe account id
    let listing = storage
      .get('listings')
      .find({id: String(listingId)})
      .value();

    let listingHostUser = storage
      .get('users')
      .find({userId: listing.owner})
      .pick('stripe')
      .value();

    if (!listingHostUser.stripe) {
      throw new Error('No stripe account found for Host');
      return;
    }

    let listingHostUserStripeUserId = listingHostUser.stripe.stripeUserId;

    // Step 3: Make Payment Request to Stripe
    let response = {...bookingObject};

    amount = amount / 100;

    let payParams = {
      payment_method_types: ['card'],
      amount: amount,
      currency: currency,
      transfer_data: {
        destination: listingHostUserStripeUserId,
        amount: amount,
      },
    };

    const paymentIntent = await stripe.paymentIntents.create(payParams);
    response = {
      ...response,
      paymentRequestSecret: paymentIntent.client_secret,
    };

    return res.status(200).json(response);
  } catch (err) {
    logger.log('err', err);
    return res.status(400).json({
      error: err,
    });
  }
});
