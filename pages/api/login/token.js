import {generateToken} from '../../../utils/authToken';

export default async (req, res) => {
  const {username} = req.body;
  console.log('username', username);

  const token = generateToken({username: username});

  res.send({token: token});
};
