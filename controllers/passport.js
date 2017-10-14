import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import config from '../config';

const User = mongoose.model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.jwt.secret;

passport.use(new JwtStrategy(opts,
  async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
));

passport.use('googleToken', new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.secret,
  callbackURL: 'http://localhost:4000/',
},
 (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken);
  console.log(profile);
},
));

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) { return done(null, false); }
      const passwordMatch = await user.verifyPassword(password);
      if (!passwordMatch) { return done(null, false); }
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  },
));
