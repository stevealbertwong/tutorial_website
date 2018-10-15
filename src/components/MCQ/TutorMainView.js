import TutorMC from './TutorMC';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

// only props.mcqs, passed from parent, cannot access DB tree as not connect(mapStateToProps) 
const TutorMCList = props => {
  console.log("TutorMCList debug: only mcq inside props, passed by parent", props);  
  console.log("TutorMCList debug: cannot access DB tree as not connect(mapStateToProps)", props.questions);
  
  // each re-render() only 1 return is called  
  if (!props.mcqs) {
    return (
      <div className="article-preview">Loading list of MC questions ...</div>
    );
  }
  return (
    <div>
      {
        props.mcqs.map(mcq => {
          return (
            <TutorMC mcq={mcq} key={mcq.questionID} />
          );
        })
      }
    </div>
  );
};

// local props tree listen to global DB tree
const mapStateToProps = state => ({
  ...state.mc, // this.props = state.mc    
});

const TutorMainView = props => {
  console.log("TutorMainView debug: mapStateToProps + parent, but parent does not pass shit", props);
  console.log("TutorMainView debug: this.props does not exist", this.props);
  console.log("TutorMainView debug", props.questions);
    
  if(props.questions[0]){
    return (
      <div className="col-md-9">
        <TutorMCList        
          mcqs={props.questions} />
      </div>
    );
  }

  return(
    <div className="article-preview">loading ... </div>
  );

};

// mapStateToProps only available to TutorMainView not TutorMCList
export default connect(mapStateToProps)(TutorMainView);
