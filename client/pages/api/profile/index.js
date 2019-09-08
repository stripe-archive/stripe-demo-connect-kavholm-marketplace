import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    let userAccount = storage
      .get('users')
      .find({userId: authenticatedUserId})
      .pick('userId', 'avatar', 'firstName', 'lastName', 'email', 'stripe')
      .value();
    return res.status(200).json(userAccount);
  } catch (err) {
    return res.status(400).json(err);
  }
});
