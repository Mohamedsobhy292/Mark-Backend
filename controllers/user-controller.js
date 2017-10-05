import config from '../config';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const User = mongoose.model('User');

function signToken(user) {
  return jwt.sign({
    iss: 'marky',
    sub: user.id,
    iat: new Date().getTime(),
    exp: Date.now() + (1 * 1000 * 60 * 60 * 24), // ADE ONE DAY

  }, config.jwt.secret);
}

exports.signUp = function signUp(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10;

  // if mail or password are empty return
  if (!email || !password) {
    res.status(403).send({ error: 403, message: 'check your credintials' });
  }
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, async (err2, hash) => {
      const newUser = new User({
        email,
        password: hash,
      });
      try {
        await newUser.save();
        const token = signToken(newUser);
        res.json(token);
      } catch (error) {
        res.status(403).send({ error: 403, message: 'mail is already exits' });
      }
    });
  });
};

exports.signIn = async function siginIn(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(403).send({ error: 403, message: 'check your credintials' });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(403).send({ error: 403, message: 'check your credintials' });
  }
  bcrypt.compare(password, user.password, async (err, result) => {
    const token = await signToken(user);
    res.json(token);
  });
};
