/**
 * 1. user schema
 * 2. middleware to encrypt password
 * 3. api to verify password
 * 
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  // reference to pollSchema
  polls: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' }],
});

// middleware to encrypt password before saving to mongo
userSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    // lock until hashed, then update userSchema object, before send to mongo server
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function(attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('User', userSchema);
