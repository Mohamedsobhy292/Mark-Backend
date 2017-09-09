import express from 'express';
import mongoose from 'mongoose';
import boardCtrl from '../controllers/board-controller';

const Board = mongoose.model('Board');
const router = express.Router();

/* GET ALL BOARDS. */
router.get('/', boardCtrl.gettingBoards);

/* GET SINGLE BOARD. */
router.get('/:id', boardCtrl.gettingSingleBoard);

export default router;
