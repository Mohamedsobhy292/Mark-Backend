import express from 'express';
import passport from 'passport';
import userCtrl from '../controllers/user-controller';

const router = express.Router();

// SIGN UP
router.post('/', userCtrl.signUp);

// SIGN IN
router.post('/signin', passport.authenticate('local', { session: false }), userCtrl.signIn);
router.post('/signin/google', passport.authenticate('googleToken', { session: false }));

module.exports = router;
