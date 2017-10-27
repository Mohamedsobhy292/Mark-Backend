import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config';


const User = mongoose.model('User');

function signToken(user) {
  return jwt.sign({
    iss: 'marky',
    sub: user.id,
    iat: new Date().getTime(),
    exp: Date.now() + (1 * 1000 * 60 * 60 * 24), // ADE ONE DAY

  }, config.jwt.secret);
}

exports.signUp = async function signUp(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;

  // if mail or password are empty return
  if (!email || !password) {
    res.status(403).send({ error: 403, message: 'check your credintials' });
  }
  const existingUser = await User.findOne({ 'local.email': email });
  if (existingUser) {
    res.status(403).send({ error: 403, message: 'user is already exists' });
  }
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err2, hash) => {
      const newUser = new User({
        method: 'local',
        local: {
          email,
          password: hash,
        },
      });
      try {
        await newUser.save();
        const token = signToken(newUser);
        res.json(token);
      } catch (error) {
        res.status(403).send({ error: 403, message: error });
      }
    });
  });
};

exports.signIn = async function siginIn(req, res) {
  const user = req.user;
  const token = signToken(user);
  res.json({ token });
};
