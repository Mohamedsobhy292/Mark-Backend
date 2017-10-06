import express from 'express';
import passport from 'passport';
import { catchErrors } from '../helpers';
import boardCtrl from '../controllers/board-controller';

const router = express.Router();

/* GET ALL BOARDS. */
router.get('/', passport.authenticate('jwt', { session: false }), catchErrors(boardCtrl.gettingBoards));

/* GET SINGLE BOARD. */
router.get('/:id', passport.authenticate('jwt', { session: false }), boardCtrl.gettingSingleBoard);

/* CREATE BOARD */
router.post('/add', passport.authenticate('jwt', { session: false }), boardCtrl.addBoard);

/* EDIT BOARD */
router.patch('/:id', passport.authenticate('jwt', { session: false }), boardCtrl.editboard);

/* DELETE BOARD */
router.delete('/:id', passport.authenticate('jwt', { session: false }), boardCtrl.deleteboard);


export default router;
