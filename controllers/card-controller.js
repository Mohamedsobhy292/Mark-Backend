/* eslint no-underscore-dangle: "off" */


import mongoose from 'mongoose';

const Card = mongoose.model('Card');
const Board = mongoose.model('Board');
const Link = mongoose.model('Link');

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
    await Board.findByIdAndUpdate(
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
    // REMOVE CARD
    Card.findByIdAndRemove(
      { _id: id },
      async (err, card) => {
        // REMOVE CARD ID FROM BOARD ARRAY
        await Board.findOneAndUpdate(
          { _id: card.boardId },
          { $pull: { cards: id } },
        );
        // REMOVE LINKS LINKED TO THIS CARD
        await Link.deleteMany(
          { _id: { $in: card.links } },
        );
        res.json(card);
      },
    );
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
      { new: true },
      (err, card) => {
        res.json(card);
      },
    );
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.movingCard = async function movingCard(req, res) {
  const id = req.params.id;
  try {
    Card.findOneAndUpdate(
      { _id: id },
      { $set: { position: req.body.position }},
      { new: true },
      (err, card) => {
        res.json(card);
      },
    );
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};
