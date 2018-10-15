/**
 * Dumb
 * 
 */

import React from 'react';

// React.Component since need constructor()
class TutorMC extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: '',    
    };
  }

  showAnswer(){
    const answer = this.props.mcq.answer;
    
    this.setState({answer});
    console.log(this.state.answer);
  }

  render(){
    const mcq = this.props.mcq;
    // if it is a question
    if(mcq.questionID === 0){
      return(
        <div className="article-preview">
        <div className="article-meta">
          <h1>{mcq.question}</h1>
        </div>
        </div>
      )


    } else {
      return (
        <div className="article-preview">
          <div className="article-meta">
          <h5>{mcq.question}</h5>
          <p>{mcq.choice1}</p>
          <p>{mcq.choice2}</p>
          <p>{mcq.choice3}</p>
          <p>{mcq.choice4}</p>        
          
          <button onClick={this.showAnswer.bind(this)}>show answer</button>        
          <p>{this.state.answer}</p>
          
          </div>
        </div>
      );

    }


  }
}

export default TutorMC;