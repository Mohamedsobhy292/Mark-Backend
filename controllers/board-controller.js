import mongoose from 'mongoose';

const Board = mongoose.model('Board');

exports.gettingBoards = async function (req, res) {
  const board = await Board.find();
  res.json(board);
};

exports.gettingSingleBoard = async function (req, res) {
  const id = req.params.id;
  try {
    const board = await Board.findOne({ _id: id });
    res.json(board);
  } catch (e) {
    res.status(404).send({ error: 404, message: e })
  }
};

exports.addBoard = async function (req, res) {
  const board = new Board({
    name: req.body.name,
    userId: 1,
  });
  try {
    await board.save();
    res.json(board);
  } catch (e) {
    res.status(500).send({ message: e.errors.name.message });
  }
};

