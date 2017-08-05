import express from 'express';
import mongoose from 'mongoose';

const Card = mongoose.model('Card');
const router = express.Router();

/* GET index page. */
router.get('/', async (req, res) => {
  const card = await Card.find();
  res.json(card);
});

export default router;
