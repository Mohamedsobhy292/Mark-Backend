import mongoose from 'mongoose';

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
  }
});
module.exports = mongoose.model('Card', cardSchema);
