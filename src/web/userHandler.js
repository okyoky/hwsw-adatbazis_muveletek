const jwt = require('jsonwebtoken');
const users = require('../db/user');
const { jwtSecret } = require('../config');

async function register(req, res) {
  const user = await users.register(req.body);
  // HAZI 3: keszitsetek egy jwt tokent es kuldjetek el a user mellet { token, user }

  const { email } = req.body;
  const token = jwt.sign({ email }, jwtSecret);

  res.send({ token, user });
}

async function login(req, res) {
  const { email, password } = req.body;

  // HAZI 4: kerjetek le a usert a db-bol es validaljatok az email/jelszo parost
  // ha hibas adatot kaptok valaszoljatok relevans statusz koddal es uzenettel

  try {
    const user = await users.findByEmail(email);
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  if (password !== user.password) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const token = jwt.sign({ email }, jwtSecret);

  // HAZI 4: kuldjetek vissza a usert a token mellett { token, user }
  res.send({ token, user });
}

/* async function loginBasicCookie(req, res) {
  const { email, password } = req.body;
  // validalni kell a usert!!
  const sessionToken = Buffer.from(`${email}:${password}`).toString('base64');
  res.cookie('session', sessionToken, { maxAge: 9000000, httpOnly: true }).end();
  // user elkuldese
} */

/* async function loginJWTCookie(req, res) {
  const { email, password } = req.body;
  // validalni kell a usert!!
  const token = jwt.sign({ email }, jwtSecret, { maxAge: 90000000 });

  // user elkuldese
  res.cookie('token', token, { maxAge: 900000000, httpOnly: true }).end();
} */

async function me(req, res) {
  const user = await users.findByEmail(req.user.email);
  res.send(user);
}

module.exports = {
  register,
  login,
  me,
};
