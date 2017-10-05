import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import config from '../config';

const User = mongoose.model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = config.jwt.secret;
opts.issuer = 'mohamedsobhy292@gmail.com';

passport.use(new JwtStrategy(opts, (payload, done) => {
  User.findOne({ id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(err, false);
    }
    return done(null, user);
  });
}));

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    } catch(error) {
      done(error, false);
    }
  },
));
