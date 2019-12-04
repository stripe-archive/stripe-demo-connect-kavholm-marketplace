import storage from '../../../helpers/storage';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  let id = req.query.id;

  // TODO: Decide on permission model

  try {
    let transactions = storage
      .get('transactions')
      .find({id: id})
      .value();

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(400).json(err);
  }
});
