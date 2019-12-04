import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let transactions = storage
      .get('transactions')
      .filter({bookingUserId: authenticatedUserId})
      .value();

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(400).json(err);
  }
});
