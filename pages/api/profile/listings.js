import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let listings = storage
      .get('listings')
      .filter({authorId: authenticatedUserId})
      .value();

    return res.status(200).json(listings);
  } catch (err) {
    return res.status(400).json(err);
  }
});
