import storage from '../../../helpers/storage';
import {validateToken} from '../../../utils/authToken';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);
  const decodedToken = validateToken(token);

  if (decodedToken) {
    let authenticatedUserId = decodedToken.userId;
    let id = req.query.id;

    try {
      let user = storage
        .get('users')
        .find({userId: id})
        .pick('userId', 'avatar', 'fullName', 'email')
        .value();

      return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
