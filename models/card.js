import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please check your name',
    trim: true,
  },
  position: {
    type: Number,
  },
  color: {
    type: String,
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: 'Pleaae specify board id',
  },
  links: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
});
module.exports = mongoose.model('Card', cardSchema);
