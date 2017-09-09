import express from 'express';
import mongoose from 'mongoose';

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');
const router = express.Router();

/* GET index page. */
router.get('/', async (req, res) => {
  const board = await Board.find();
  res.json(board);
});

export default router;
