import mongoose from 'mongoose';

const Board = mongoose.model('Board');

exports.gettingBoards = async function gettingBoards(req, res) {
  const board = await Board.find();
  res.json(board);
};

exports.gettingSingleBoard = async function gettingSingleBoard(req, res) {
  const id = req.params.id;
  try {
    const board = await Board.findOne({ _id: id });
    res.json(board);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.addBoard = async function addBoard(req, res) {
  const board = new Board({
    name: req.body.name,
    userId: 1,
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
  try {
    const deletedboard = await Board.deleteOne({ _id: id });
    res.json(deletedboard);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};

exports.editboard = async function editboard(req, res) {
  const id = req.params.id;
  const board = {
    name: req.body.name,
    position: req.body.position,
    color: req.body.color,
    boardId: req.body.boardId,
    private: req.body.private,
  };
  try {
    await Board.findOneAndUpdate(
      { _id: id },
      { $set: board },
    );
    res.json(board);
  } catch (e) {
    res.status(400).send({ error: 400, message: e });
  }
};
