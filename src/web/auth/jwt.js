const users = require('../../db/user');

async function jwtAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).send({ message: 'Unauthorized, no data' });
  }

  const credentials = new Buffer.from(auth.split(' ').pop(), 'base64').toString('ascii').split(':');

  try {
    // HAZI 1: szedjetek le a usert a db-bol es azt tegyetek fel a req.user-re
    // a token belseje helyett
    req.user = users.findByEmail(credentials[0]);
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized, invalid token' });
  }

  return next();
}

module.exports = jwtAuth;
