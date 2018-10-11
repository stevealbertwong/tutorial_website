import { LOAD_MCQ } from '../constants/actionTypes';

  export default (state = {}, action) => {
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