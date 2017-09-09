import express from 'express';
import mongoose from 'mongoose';
import boardCtrl from '../controllers/board-controller';
import { catchErrors } from '../helpers';

const router = express.Router();

/* GET ALL BOARDS. */
router.get('/', catchErrors(boardCtrl.gettingBoards));

/* GET SINGLE BOARD. */
router.get('/board/:id', boardCtrl.gettingSingleBoard);

/* CREATE BOARD */
router.post('/add', boardCtrl.addBoard);


export default router;
