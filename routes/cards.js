import express from 'express';
import mongoose from 'mongoose';
import cardCtrl from '../controllers/card-controller';
import { catchErrors } from '../helpers';

const router = express.Router();

/* GET ALL CARDS. */
router.get('/', catchErrors(cardCtrl.gettingCards));

router.post('/add', cardCtrl.addCard);

export default router;
