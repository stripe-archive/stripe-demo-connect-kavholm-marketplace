import {validateToken} from './authToken';
import API from './../helpers/api';

let requireAuthEndpoint = (fn) => {
  return (req, res) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      res.writeHead(401);
      res.end('missing Authorization header');
      return;
    }

    if (!API.context) {
      API.setContext({
        req: req,
      });
    }

    try {
      const token = bearerToken.replace('Bearer ', '');
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
