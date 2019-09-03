import {generateToken} from '../../../utils/authToken';
import bcrypt from 'bcrypt';
import storage from '../../../helpers/storage';

export default async (req, res) => {
  const {email, password} = req.body;

  let userAccount = storage
    .get('users')
    .find({email: email})
    .value();

  let hashedPassword = userAccount.password;

  let isPasswordMatch = await bcrypt.compare(password, hashedPassword);

  if (isPasswordMatch) {
    const token = generateToken({
      userId: userAccount.userId,
    });

    res.send({token: token});
  } else {
    return res.status(400).json({message: 'invalid password'});
  }
};
