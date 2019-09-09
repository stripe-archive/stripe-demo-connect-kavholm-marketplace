import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';

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

    // Step 2: Make Payment Request to Stripe
    let response = {...bookingObject};

    if (chargeToken) {
      // Apple Pay aka Web Payment Request is using charges.
      const paymentCharge = await stripe.charges.create({
        amount: amount / 100,
        currency: currency,
        description: 'Kavholm',
        source: chargeToken,
      });
    } else {
      let payParams = {
        payment_method_types: ['card'],
        amount: amount / 100,
        currency: currency,
      };

      const paymentIntent = await stripe.paymentIntents.create(payParams);
      response = {
        ...response,
        paymentRequestSecret: paymentIntent.client_secret,
      };
    }

    // Step 3: Make transfer to the host account on Stripe
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

    await stripe.transfers.create({
      amount: amount,
      currency: currency,
      destination: listingHostUserStripeUserId,
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log('err', err);
    return res.status(400).json({
      error: err,
    });
  }
});
