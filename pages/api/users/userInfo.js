import storage from '../../../helpers/storage';
import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  let id = req.query.id;

  try {
    let user = storage
      .get('users')
      .find({userId: id})
      .pick('userId', 'avatar', 'firstName', 'lastName', 'email')
      .value();

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
});
