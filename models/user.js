const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide email'],
    match: [emailRegex, 'Please provide valid email'],
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide password'],
    minLength: 6,
  }
});

UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.createJWT = function() {
  return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
}

UserSchema.methods.comparePassword = async function(userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);

  return isMatch;
}

const User = mongoose.model('User', UserSchema);
User.createIndexes();

module.exports = User;