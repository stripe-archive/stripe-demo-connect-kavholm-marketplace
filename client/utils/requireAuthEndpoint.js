import {validateToken} from './authToken';

let requireAuthEndpoint = (fn) => {
  return (req, res) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      res.writeHead(401);
      res.end('missing Authorization header');
      return;
    }

    try {
      const {token} = JSON.parse(bearerToken);
      // const token = bearerToken.replace('Bearer ', '');
      let decodedToken = validateToken(token);
      req.authToken = decodedToken;
    } catch (err) {
      if (!whitelisted) {
        res.writeHead(401);
        res.end('invalid token in Authorization header');
        return;
      }
    }

    return fn(req, res);
  };
};

module.exports = requireAuthEndpoint;
