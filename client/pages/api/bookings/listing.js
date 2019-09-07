import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;
  let listingId = req.query.listingId;

  // TODO: Does the authenticated user have permissions to read bookings for listing?

  try {
    let bookings = storage
      .get('bookings')
      .filter({listingId: listingId})
      .value();

    return res.status(200).json(bookings);
  } catch (err) {
    return res.status(400).json(err);
  }
});
