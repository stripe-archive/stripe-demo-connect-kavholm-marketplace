import storage from '../../helpers/storage';
import {validateToken} from '../../utils/authToken';

export default async (req, res) => {
  if (!('authorization' in req.headers)) {
    return res.status(401).send('Authorization header missing');
  }
  const auth = await req.headers.authorization;
  const {token} = JSON.parse(auth);

  const decodedToken = validateToken(token);

  console.log('decodedToken', decodedToken);

  if (decodedToken) {
    let userId = decodedToken.userId;

    try {
      let userAccount = storage
        .get('users')
        .find({userId: userId})
        .pick('userId', 'avatar', 'fullName', 'email', 'stripe')
        .value();
      return res.status(200).json(userAccount);
    } catch (err) {
      return res.status(400).json(err);
    }
  } else {
    return res.status(400).json({message: 'invalid token'});
  }
};
