import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';
import API from '../../../helpers/api';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  let listingId = req.query.listingId;

  // TODO: Does the authenticated user have permissions to read transactions for listing?

  try {
    let transactionsRaw = storage
      .get('transactions')
      .filter({listingId: listingId})
      .value();

    let transactions = {...transactionsRaw};

    transactions.forEach(async (t) => {
      if (t.bookingUserId) {
        let bookingUser = await API.makeRequest(
          'get',
          `/api/users/userInfo?id=${t.bookingUserId}`,
        );
        t.bookingUser = bookingUser;
      }
    });

    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(400).json(err);
  }
});
