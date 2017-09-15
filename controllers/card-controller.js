import mongoose from 'mongoose';

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');

exports.gettingCards = async function (req, res) {
  const card = await Card.find();
  res.json(card);
};

exports.addCard = async function (req, res) {
  const card = new Card({
    name: req.body.name,
    position: req.body.position,
    color: req.body.color,
    boardId: req.body.boardId,
  });
  try {
    await card.save();
    Board.findByIdAndUpdate(
      card.boardId,
      { $push: { cards: card._id } },
      { safe: true, new: true },
    );
    res.json(card);
  } catch (e) {
    res.status(400).send({ message: e.errors });
  }
};

