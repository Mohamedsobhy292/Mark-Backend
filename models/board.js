import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please check your name',
    trim: true,
  },
  userId: {
    type: Number,
  },
  private: {
    type: Boolean,
    default: true,
  },
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = mongoose.model('Board', boardSchema);
