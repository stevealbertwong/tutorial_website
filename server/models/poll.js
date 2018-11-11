/**
 * define schema + middleware + mongo server API
 * 
 */
const mongoose = require('mongoose');
const User = require('./user'); // userSchema

const optionSchema = new mongoose.Schema({
  option: String,
  // votes expect num type, default to 0
  votes: {
    type: Number,
    default: 0,
  },
});
// schema properties that we want to use .populate() on 
// are properties that have a type of mongoose.Schema.Types.ObjectId. 
// This tells Mongoose “Hey, I’m gonna be referencing other documents from other collections
const pollSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  created: {
    type: Date,
    default: Date.now,
  },  
  question: String, // string w no extra feature
  options: [optionSchema], // array of another schema
  // tracking all users that has voted
  // track all ObjectId of User object i.e. userSchema
  voted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// validate user has permission to delete poll
pollSchema.pre('remove', async function(next) {
  try {
    const user = await User.findById(this.user);
    user.polls = user.polls.filter(
      poll => poll._id.toString() !== this._id.toString(),
    );
    await user.save();
    return next();
  } catch (err) {
    return next(err);
  }
});

// module.exports.User = require('./user');
module.exports = mongoose.model('Poll', pollSchema);
