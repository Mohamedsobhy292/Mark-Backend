/* eslint no-underscore-dangle: "off" */


import mongoose from 'mongoose';

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');

exports.gettingCards = async function gettingCards(req, res) {
  const card = await Card.find();
  res.json(card);
};

exports.gettingSingleCard = async function gettingCards(req, res) {
  const id = req.params.id;
  try {
    const card = await Card.findOne({ _id: id });
    res.json(card);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};


exports.addCard = async function addCard(req, res) {
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

exports.deleteCard = async function deleteCard(req, res) {
  const id = req.params.id;
  try {
    const deletedcard = await Card.deleteOne({ _id: id });
    res.json(deletedcard);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.editCard = async function editCard(req, res) {
  const id = req.params.id;
  try {
    Card.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      {new: true},
      (err, card) => {
        res.json(card);
      },
    );
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

