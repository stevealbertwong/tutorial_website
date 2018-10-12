import { LOAD_MCQ } from '../constants/actionTypes';

  
const questions = {     
  question: "original data",
  choice1: 11,
  choice2: 12,
  choice3: 13,
  choice4: 14      
  
};

// !! pass in default state to prevent TypeError: Cannot read property 'question' of undefined
export default (state = {questions}, action) => {
    switch (action.type) {
      case LOAD_MCQ:
        // overwrites state.question.questions
        return {
          ...state,
          // ...state.question : action.payload
          questions: action.payload
        };
      default:
        return state;
    }
  };