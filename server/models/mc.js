/**
 * 1. mongo server config: 
 * define schema + middleware + mongo server API
 * 
 * duplicated key error: 
 * http://andrewkoroluk.com/blog/5533066b6098ef3d1b4c23c0 - explain very well
 * https://medium.com/@skboadu/mongoose-duplicate-key-errors-6b52d700294b
 * https://stackoverflow.com/questions/24430220/e11000-duplicate-key-error-index-in-mongodb-mongoose
 * 
 * 
 */
const mongoose = require('mongoose');
var slug = require('slug'); 

// const choiceSchema = new mongoose.Schema({
//   choiceContent: String,
// });

// var mcSchema = new mongoose.Schema({
//     slug: {type: String, lowercase: true, unique: true},
//     question: String,                
//     mcChoices: [choiceSchema],
//     trueAnswer: choiceSchema    
// });

// mcSchema.methods.toJSONFor = function(user){
//   return {
//     slug: this.slug,
//     question: this.question,
//     mcChoices: this.mcChoices,
//     trueAnswer: this.trueAnswer,
//   };
// };

// why slug ?? { MongoError: E11000 duplicate key error collection: <DATABASE_NAME>.mcs index: slug_1 dup key: { : null } ??
var mcSchema = new mongoose.Schema({
  // since mongo auto expect _id n slug to be present n unique index
  // db.mcs.getIndexes() -> return all unique index in schema
  // solution: either use slug or drop slug as unique index or recreate slug as sparse index i.e. skip over documents that do not have the property in question, and will also ignore documents that have the property but is set to null
  slug: {type: String, lowercase: true, unique: true},
  questionID: {type: Number, unique: true},
  // questionID: Number, 
  class: String,
  question: String,                
  choice1: String,
  choice2: String,
  choice3: String,
  choice4: String,
  answer: String    
});

mcSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next(); // call validate() as next function
});
mcSchema.methods.slugify = function() {
  text = this.question.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text 
  this.slug = slug(text) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

// turn object into json before send to client/mongodb
mcSchema.methods.toJSONFor = function(user){
  return {    
    slug: this.slug,
    questionID: this.questionID,
    class: this.class,
    question: this.question,
    choice1: this.choice1,
    choice2: this.choice2,
    choice3: this.choice3,
    choice4: this.choice4,
    answer: this.answer
  };
};


module.exports = mongoose.model('MC', mcSchema);
