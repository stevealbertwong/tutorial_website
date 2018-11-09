/*
MC handler: controller/API to DB e.g. CRUD

*/
const db = require('../models');

exports.getAllMCs = async (req, res, next) => {
  console.log("get all mc is called");
  try {    
    // return all mongo
    const mcs = await db.MC.find();    
    return res.status(200).json(mcs);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};


// exports.vote = async (req, res, next) => {
//   const { id: pollId } = req.params;
//   const { id: userId } = req.decoded;
//   const { answer } = req.body;
//   try {
//     if (answer) {
//       const poll = await db.Poll.findById(pollId);
//       if (!poll) throw new Error('No poll found');

//       const vote = poll.options.map(
//         option =>
//           option.option === answer
//             ? {
//                 option: option.option,
//                 _id: option._id,
//                 votes: option.votes + 1,
//               }
//             : option,
//       );

//       console.log('VOTE: USERID ', userId);
//       console.log('VOTE: poll.voted ', poll.voted);
//       console.log(
//         'VOTE: vote filter',
//         poll.voted.filter(user => user.toString() === userId).length,
//       );

//       if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
//         poll.voted.push(userId);
//         poll.options = vote;
//         await poll.save();

//         return res.status(202).json(poll);
//       } else {
//         throw new Error('Already voted');
//       }
//     } else {
//       throw new Error('No Answer Provided');
//     }
//   } catch (err) {
//     return next({
//       status: 400,
//       message: err.message,
//     });
//   }
// };
