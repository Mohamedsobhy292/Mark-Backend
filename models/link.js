import mongoose from 'mongoose';

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please check your name',
    trim: true,
  },
  position: {
    type: Number,
  },
  icon: {
    type: String,
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Board',
  },
  tag: {
    type: String,
  },
  url: {
    type: String,
    required: 'Please check your url',
    trim: true,
  }
});
module.exports = mongoose.model('Link', linkSchema);
