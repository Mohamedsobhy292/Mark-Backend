import express from 'express';
import passport from 'passport';
import userCtrl from '../controllers/user-controller';

const router = express.Router();

// SIGN UP
router.post('/', userCtrl.signUp);

// SIGN IN
router.post('/signin', passport.authenticate('local', { session: false }), userCtrl.signIn);

module.exports = router;
