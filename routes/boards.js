import express from 'express';
import boardCtrl from '../controllers/board-controller';
import { catchErrors } from '../helpers';

const router = express.Router();

/* GET ALL BOARDS. */
router.get('/', catchErrors(boardCtrl.gettingBoards));

/* GET SINGLE BOARD. */
router.get('/:id', boardCtrl.gettingSingleBoard);

/* CREATE BOARD */
router.post('/add', boardCtrl.addBoard);

/* EDIT BOARD */
router.patch('/:id', boardCtrl.editboard);

/* DELETE BOARD */
router.delete('/:id', boardCtrl.deleteboard);


export default router;
