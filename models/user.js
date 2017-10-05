import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

mongoose.Promise = global.Promise;
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Please check your mail',
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: 'you must specify password',
  },
});

userSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
