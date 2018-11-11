/**
 * 1. delete all db.MC
 * 2. map() for loop fakeMCs, array of JSON, into 1 JSON 
 * 3. fill schema w JSON
 * 4. actuall http to db.MC
 */
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const fakeMCs = [
  {      
    questionID: 0,
    class: null,
    question: "this is an article, and then student answers",
    choice1: null,
    choice2: null,
    choice3: null,
    choice4: null,
    answer: null        
  }
  ,{      
    questionID: 1,
    class: "MC/p6",
    question: "how many players in football team?",
    choice1: "30",
    choice2: "31",
    choice3: "32",
    choice4: "33",
    answer: "choice A. Explanation: choice A is better than B since ..."        
  }
  ,{
    questionID: 2,
    class: "MC/p5",
    question: "who is us president?",
    choice1: "trump",
    choice2: "josh kusner",
    choice3: "obama",
    choice4: "bush",
    answer: "choice B. Explanation: team 10 bitch "  
  }, {
    questionID: 3,
    class: "MC/p6",
    question: "who is google president?",
    choice1: "trump",
    choice2: "josh kusner",
    choice3: "obama",
    choice4: "bush",
    answer: "choice B. Explanation: team 10 bitch "
    
  },{
    questionID: 4,
    class: "MC/p5",
    question: "who is yahoo president?",
    choice1: "trump",
    choice2: "josh kusner",
    choice3: "obama",
    choice4: "bush",
    answer: "choice B. Explanation: team 10 bitch "
    
  },{
    questionID: 5,
    class: "MC/p5",
    question: "who is hello president?",
    choice1: "trump",
    choice2: "josh kusner",
    choice3: "obama",
    choice4: "bush",
    answer: "choice B. Explanation: team 10 bitch "    
  }      
];          

const seedMC = async () => {
  try {
    await db.MC.remove();
    console.log('DROP ALL MCs');
    
    // wait until all "await" inside Promise.all() finish
    await Promise.all(
      fakeMCs.map(async mcq => {
        const data = await db.MC.create(mcq); // fill schema w data
        console.log(data);
        await data.save(); // actual http to mongo server
      }),
    );
    console.log('WRITTEN FAKE MCQ INTO MONGO', JSON.stringify(fakeMCs));    
  } catch (err) {
    console.error(err);
  }
};

seedMC();


// const users = [
//   { username: 'username', password: 'password' },
//   { username: 'kelvin', password: 'password' },
// ];

// const polls = [
//   {
//     question: 'Which is the best JavaScript framework',
//     options: ['Angular', 'React', 'VueJS'],
//   },
//   { question: 'Who is the best mutant', options: ['Wolverine', 'Deadpool'] },
//   { question: 'Truth or dare', options: ['Truth', 'Dare'] },
//   { question: 'Boolean?', options: ['True', 'False'] },
// ]

// const seed = async () => {
//   try {
//     await db.User.remove();
//     console.log('DROP ALL USERS');

//     await db.Poll.remove();
//     console.log('DROP ALL POLLS');

//     await Promise.all(
//       users.map(async user => {
//         const data = await db.User.create(user);
//         await data.save();
//       }),
//     );
//     console.log('CREATED USERS', JSON.stringify(users));
    
//     // Wait until all Promise() resolve() to .then() run callback i.e. console.log
//     // takes however long the longest promise to return
//     await Promise.all(
//       polls.map(async poll => {
//         poll.options = poll.options.map(option => ({ option, votes: 0 }));
//         const data = await db.Poll.create(poll);
//         const user = await db.User.findOne({ username: 'username' });
//         data.user = user;
//         user.polls.push(data._id);
//         await user.save();
//         await data.save();
//       }),
//     );
//     console.log('CREATED POLLS', JSON.stringify(polls));
//   } catch (err) {
//     console.error(err);
//   }
// };

// seed();
