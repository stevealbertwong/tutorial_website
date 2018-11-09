/**
 * 1. defines schema
 * 2. msg handler
 */
import { LOAD_MCQ, STORE_MCQ, FILTER_MCQ } from '../constants/actionTypes';

// !! pass in default state to prevent TypeError: Cannot read property 'question' of undefined
const questions = {     
  question: "original data",
  choice1: 11,
  choice2: 12,
  choice3: 13,
  choice4: 14        
};

export default (state = {}, action) => {
    // console.log("debug mc.js",action);
    switch (action.type) {
      
      case LOAD_MCQ: // display DB        
        return {
          ...state, // state.mc.questions      
          questions: action.payload
        };
      
      case FILTER_MCQ: // filter term
        return {
          ...state, // state.mc.filter                   
          filter: action.payload
        };        

      case STORE_MCQ: // store DB
        return {
          ...state,          
          store: action.payload
        };        
      default:
        return state;
    }
  };