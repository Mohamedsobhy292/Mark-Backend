/* eslint no-underscore-dangle: "off" */
import mongoose from 'mongoose';

const Board = mongoose.model('Board');
const Card = mongoose.model('Card');
const Link = mongoose.model('Link');

exports.gettingBoards = async function gettingBoards(req, res) {
  const user = req.user;
  const board = await Board.find({ userId: user.id });
  res.json(board);
};

exports.gettingSingleBoard = async function gettingSingleBoard(req, res) {
  const user = req.user;
  const id = req.params.id;
  try {
    const board = await Board.findOne({ _id: id, userId: user.id });
    res.json(board);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.addBoard = async function addBoard(req, res) {
  const board = new Board({
    name: req.body.name,
    userId: req.user,
  });
  try {
    await board.save();
    res.json(board);
  } catch (e) {
    res.status(400).send({ message: e.errors.name.message });
  }
};

exports.deleteboard = async function deleteboard(req, res) {
  const id = req.params.id;
  const user = req.user._id;

  try {
    const boardtodelete = await Board.findOne({ _id: id, userId: user });
    if (!boardtodelete) {
      res.status(400).send({ error: 401, message: 'You cant delete this board' });
    } else {
      Board.findByIdAndRemove(
          { _id: id },
          async (err, board) => {
            const cardsToDelete = await Card.find({ _id: { $in: board.cards } });
            await cardsToDelete.forEach(async (card) => {
              await Link.deleteMany(
                { _id: { $in: card.links } },
              );
            });
            await Card.deleteMany(
              { _id: { $in: board.cards } },
              (err2, deletedCards) => {
                res.json(deletedCards);
              },
            );
          },
        );
    }
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.editboard = async function editboard(req, res) {
  const user = req.user.id;
  const id = req.params.id;
  const boardtoedit = await Board.findOne({ _id: id, userId: user });
  try {
    if (!boardtoedit) {
      res.status(400).send({ error: 401, message: 'You cant edit this board' });
    } else {
      await Board.findOneAndUpdate(
        { _id: id },
        { $set: req.body },
      );
      res.json(boardtoedit);
    }
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};
