/**
 * this page originally exists for tabs
 * 
 * Backend call to fetch MCQ data n populate global DB tree
 */
import TutorBanner from './TutorBanner';
import TutorMainView from './TutorMainView';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { LOAD_MCQ } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.mc,  // this.props = state.mc
  
  // if i do this, either use this level, or dumb component
  // this.props.appName = state.common.appName  
  appName: state.common.appName,    
});

// register function(API to update global DB tree) in props
const mapDispatchToProps = dispatch => ({      
  onLoad: (payload) => // this.props.onLoad()
    dispatch({ type: LOAD_MCQ, payload }),    
});

// index.js export MCQ component -> used in Tutor.js
class MCQ extends React.Component {
  // BEFORE COMPONENT RENDER (For Ajax / Dispatcher Events)
  componentWillMount() {
    console.log("debug componentWillMount", this.props)
    
    var fakeMC = [
      {      
        questionID: 0,
        class: null,
        question: "this is an article, and then student answers",
        choice1: null,
        choice2: null,
        choice3: null,
        choice4: null,
        answer: null        
      },
      {      
        questionID: 1,
        class: "MC/p6",
        question: "how many players in football team?",
        choice1: 30,
        choice2: 31,
        choice3: 32,
        choice4: 33,
        answer: "choice A. Explanation: choice A is better than B since ..."        
      },
      {
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

    // this.props.onLoad(parsed_content);
    this.props.onLoad(fakeMC);        
  }

  render() {
    return (
      <div className="home-page">

        <TutorBanner appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <div className="mainview-pos">
            <TutorMainView />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MCQ);
