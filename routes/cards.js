import express from 'express';
import cardCtrl from '../controllers/card-controller';
import { catchErrors } from '../helpers';

const router = express.Router();

/* GET ALL CARDS. */
router.get('/', catchErrors(cardCtrl.gettingCards));

/* GET SINGLE CARD. */
router.get('/card/:id', cardCtrl.gettingSingleCard);

/* ADD CARD */
router.post('/add', cardCtrl.addCard);

/* DELETE CARD */
router.delete('/card/:id', cardCtrl.deleteCard);

/* EDIT CARD */
router.patch('/card/:id', cardCtrl.editCard);

export default router;
