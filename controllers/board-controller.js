import mongoose from 'mongoose';

const Board = mongoose.model('Board');

exports.gettingBoards = async function (req, res) {
  const board = await Board.find();
  res.json(board);
};

exports.gettingSingleBoard = async function (req, res) {
  const id = req.params.id;
  const board = await Board.findOne({ _id: id });
  res.json(board);
};

exports.addBoard = async function (req) {
  const board = new Board({
    name: req.body.name,
    userId: 1,
  });
  board.save();
};

