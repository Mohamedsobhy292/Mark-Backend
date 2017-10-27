import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';
import config from '../config';

const User = mongoose.model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-plus-token');
const FacebookStrategy = require('passport-facebook-token');
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = config.jwt.secret;

// JWT Strategy

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

// GOOGLE Strategy

passport.use('googleToken', new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.secret,
  callbackURL: 'http://localhost:4000/' },
 async (accessToken, refreshToken, profile, done) => {
   try {
     const userFound = await User.findOne({ 'google.id': profile.id }) ||
     await User.findOne({ 'local.email': profile.emails[0].value });
     if (userFound) {
       return done(null, userFound);
     }
     const newUser = new User({
       method: 'google',
       google: {
         id: profile.id,
         email: profile.emails[0].value,
       },
     });
     await newUser.save();
     return done(null, newUser);
   } catch (err) {
     return done(err, false, err.message);
   }
 },
));

// Facebook Strategy

passport.use(new FacebookStrategy({
  clientID: config.facebook.clientId,
  clientSecret: config.facebook.secret,
  callbackURL: 'http://localhost:4000/' },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userFound = await User.findOne({ 'facebook.id': profile.id }) ||
      await User.findOne({ 'local.email': profile.emails[0].value });
      if (userFound) {
        return done(null, userFound);
      }
      const newUser = new User({
        method: 'facebook',
        facebook: {
          id: profile.id,
          email: profile.emails[0].value,
        },
      });
      await newUser.save();
      return done(null, newUser);
    } catch (err) {
      return done(err, false, err.message);
    }
  },
));

// LOCAL Strategy

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) { return done(null, false); }
      const passwordMatch = await user.verifyPassword(password);
      if (!passwordMatch) { return done(null, false); }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  },
));
