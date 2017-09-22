import mongoose from 'mongoose';

const Board = mongoose.model('Board');
const Card = mongoose.model('Card');
const Link = mongoose.model('Link');

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
            }
          );
        },
      );
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
