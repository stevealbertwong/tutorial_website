/**
 * routing
 * dispatch fake data to model
 * from reducer import state
 * 
 */
import React from 'react';
import TutorHeader from './TutorHeader';
import TutorMC from './TutorMC';
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
    mcq: state.question
  }};

// register function in props
const mapDispatchToProps = dispatch => ({  
  // API to update state
  // this.props.onLoad()
  onLoad: (payload) =>
    dispatch({ type: LOAD_MCQ, payload }),    
});


class Tutor extends React.Component { 
  constructor() {
    super(); // boilerplate
    // state is like global variable that render() could access
    this.state = {
      answer: "",
    };
  }

  componentWillMount() {
    console.log("debug componentWillMount", this.props) // check what is passed in
    
    // fake data => API call
    // var fakeMC = {
    //   content:[
    //     {question: "what is my age?"},
    //     {choice1: 35},
    //     {choice2: 36},
    //     {choice3: 37},
    //     {choice4: 39}
    //   ]
    // }

    var fakeMC = {      
      question: "how many players in football team?",
      choice1: 30,
      choice2: 31,
      choice3: 32,
      choice4: 33      
    }
    
    var parsed_content = fakeMC.question;    
    // this.props.onLoad(parsed_content);
    this.props.onLoad(fakeMC);        
  }

  // TODO: construct a list of mc questions


  showAnswer(){
    const answer = this.props.mcq.questions.choice4;
    this.setState({answer});
    console.log(this.state.answer);
  }

  debug(){
    console.log(this.props.mcq);
    console.log(this.props.mcq.questions.question);
    console.log(this.props.mcq.questions.choice1);    
  }
  
  // {this.props.mcq.choice1}
  render() {
                
    
    console.log(this.props.mcq);
    // try use child dumb component to display JSON ??
    return (      
      <div>        
        <TutorHeader
          appName={this.props.appName}
          currentUser={this.props.currentUser} />                  
        
        <p>{this.props.mcq.questions.question}</p>

        <TutorMC mcq={this.props.mcq.questions.choice1} />
        <TutorMC mcq={this.props.mcq.questions.choice2} />
        <TutorMC mcq={this.props.mcq.questions.choice3} />
        <TutorMC mcq={this.props.mcq.questions.choice4} />
        <button onClick={this.debug.bind(this)}>debug</button>        

        <button onClick={this.showAnswer.bind(this)}>show answer</button>        
        <p>{this.state.answer}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tutor);
