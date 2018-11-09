/**
 * 1. connect to mongo server
 * 
 * // parent
 * const db = require('../models');
 * const users = await db.User.find();SECRET
 * 
 * // child
 * module.exports = mongoose.model('Poll', pollSchema);
 */
const mongoose = require('mongoose');
mongoose.set('debug', true); // log every transaction inside DB
mongoose.Promise = global.Promise; // allows us to use promise in mongoose to handle async mongo server calls
mongoose.connect(process.env.DATABASE); // app n mongo server both create TCP fd called "tutorial" using "mongodb://localhost/" protocol

module.exports.User = require('./user'); // schema
module.exports.MC = require('./mc');