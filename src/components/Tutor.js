/**
 * routing
 * dispatch fake data to model
 * from reducer import state
 * 
 */
import React from 'react';
import TutorHeader from './TutorHeader';
import { LOAD_MCQ } from '../constants/actionTypes';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import agent from '../agent';

// import state from reducer 
// map state to props => easy display to child component
const mapStateToProps = state => {
  return {
    ...state, // ?? necessary
    // this.props.appName => map state to props
    appName: state.common.appName,  
    currentUser: state.common.currentUser,
    mcq: state.question.questions
  }};

// API to update state
const mapDispatchToProps = dispatch => ({  
  // this.props.onLoad()
  onLoad: (payload) =>
    dispatch({ type: LOAD_MCQ, payload }),
});

class Tutor extends React.Component { 
  componentWillMount() {
    // fake data 
    const fakeMC = {
        question: "what is my age?",
        choice1: 35,
        choice2: 36,
        choice3: 37,
        choice4: 39
    }
    // dispatch fake data to model
    this.props.onLoad(fakeMC);
  }
  
  // {this.props.mcq.choice1}
  render() {
    return (
      <div>
        <TutorHeader
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        <p>
          
        </p>
        <button>testing MCQ</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutor);
