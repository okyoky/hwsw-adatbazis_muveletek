const users = require('../../db/user');

async function jwtAuth(req, res, next) {
  const { email } = req.body;

  try {
    // HAZI 1: szedjetek le a usert a db-bol es azt tegyetek fel a req.user-re
    // a token belseje helyett
    req.user = await users.findByEmail(email);
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized, invalid token' });
  }

  return next();
}

module.exports = jwtAuth;
