import storage from '../../../helpers/storage';

import requireAuthEndpoint from '../../../utils/requireAuthEndpoint';

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId;

  try {
    storage
      .get('transactions')
      .remove()
      .write();

    return res.status(200).json('ok');
  } catch (err) {
    return res.status(400).json(err);
  }
});
