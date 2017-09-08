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
  },
  tag: {
    type: String,
  }
});
module.exports = mongoose.model('Link', linkSchema);
