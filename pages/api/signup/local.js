import bcrypt from 'bcrypt';
import shortid from 'shortid';
import storage from '../../../helpers/storage';

import {generateToken} from '../../../utils/authToken';

export default async (req, res) => {
  const {fullname, email, password} = req.body;
  console.log('userinfo', email, fullname, password);

  let hashedPassword = await bcrypt.hash(password, 10);
  let normalizedEmail = email.toLowerCase();

  const userObject = {
    userId: shortid.generate(),
    fullName: fullname,
    email: normalizedEmail,
    password: hashedPassword,
  };

  await storage
    .get('users')
    .push(userObject)
    .write();

  const token = generateToken({
    userId: userObject.userId,
  });

  res.send({token: token});
};
