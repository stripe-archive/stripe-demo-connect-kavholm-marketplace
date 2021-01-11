import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    const {title, location, price, currency, description} = req.body;

    const listingObject = {
      id: shortid.generate(),
      authorId: authenticatedUserId,
      description: description,
      title: title,
      location: location,
      image:
        'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80',
      price: {
        amount: parseInt(price),
        currency: currency,
      },
    };

    await storage
      .get('listings')
      .push(listingObject)
      .write();

    let response = {
      status: 'ok',
      listing: listingObject,
    };

    return res.status(200).json(response);
  } catch (err) {
    logger.log('err', err);
    return res.status(400).json({
      error: err,
    });
  }
});
