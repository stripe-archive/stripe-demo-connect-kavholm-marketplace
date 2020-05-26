import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';
import API from '../../../helpers/api';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let {listingId} = req.body;

    // Step 1: Get listing details
    let listing = await API.makeRequest('get', `/api/listings/${listingId}`);

    let amount = listing.totalAmount;
    let currency = listing.price.currency;

    // Step 2: Resolve hosts Stripe account id
    let listingHostUser = storage
      .get('users')
      .find({userId: listing.authorId})
      .pick('stripe')
      .value();

    if (!listingHostUser.stripe) {
      throw new Error('No stripe account found for Host');
      return;
    }

    let listingHostUserStripeUserId = listingHostUser.stripe.stripeUserId;

    // Step 3: Make destination payment on Stripe where funds are taken from card and transferred to the host's Stripe account.

    let payParams = {
      payment_method_types: ['card'],
      amount: amount,
      currency: currency,
      transfer_data: {
        destination: listingHostUserStripeUserId,
        amount: (amount - Math.ceil(amount * 0.1)),
      },
    };

    const paymentIntent = await stripe.paymentIntents.create(payParams);

    // Step 4: Create new transaction
    const transaction = {
      id: shortid.generate(),
      listingId: String(listingId),
      bookingUserId: authenticatedUserId,
      totalAmount: String(amount),
      currency: currency,
      paymentId: paymentIntent.id,
    };

    storage
      .get('transactions')
      .push(transaction)
      .write();

    let response = {
      ...transaction,
      paymentRequestSecret: paymentIntent.client_secret,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.log('err', err);
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
});
