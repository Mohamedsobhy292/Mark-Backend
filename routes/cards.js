import express from 'express';
import passport from 'passport';
import cardCtrl from '../controllers/card-controller';
import { catchErrors } from '../helpers';

const router = express.Router();

/* GET ALL CARDS. */
router.get('/', passport.authenticate('jwt', { session: false }), catchErrors(cardCtrl.gettingCards));

/* GET SINGLE CARD. */
router.get('/:id', passport.authenticate('jwt', { session: false }), cardCtrl.gettingSingleCard);

/* ADD CARD */
router.post('/add', passport.authenticate('jwt', { session: false }), cardCtrl.addCard);

/* DELETE CARD */
router.delete('/:id', passport.authenticate('jwt', { session: false }), cardCtrl.deleteCard);

/* EDIT CARD */
router.patch('/:id', passport.authenticate('jwt', { session: false }), cardCtrl.editCard);

/* MOVING CARD */
router.patch('/move/:id', passport.authenticate('jwt', { session: false }), cardCtrl.movingCard);

export default router;
