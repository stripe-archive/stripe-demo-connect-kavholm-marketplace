import shortid from 'shortid';
import storage from '../../../helpers/storage';
import stripe from '../../../helpers/stripe';
import logger from '../../../helpers/logger';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let {listingId} = req.body;

    let response = {
      msg: 'To be implemented',
    };

    return res.status(200).json(response);
  } catch (err) {
    logger.log('err', err);
    return res.status(400).json({
      error: err,
    });
  }
});
