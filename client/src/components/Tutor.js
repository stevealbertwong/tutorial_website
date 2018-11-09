/**
 * routing
 * 
 */
import React from 'react';
import TutorHeader from './TutorHeader';
import MCQ from '../components/MCQ';
import TutorSideBar from './TutorSideBar.js'
import './Tutor.css';
import { LOAD_MCQ } from '../constants/actionTypes';
import { Link } from 'react-router-dom';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import agent from '../agent';

// local props tree listen to global DB tree
// i.e. root component subscribed to frontend model
const mapStateToProps = state => {
  return {
    ...state, // this.props == state -> by default, not strictly necessary
    // this.props.appName = state.common.appName
    appName: state.common.appName,
    currentUser: state.common.currentUser
  }};

class Tutor extends React.Component { 
  // get data from frontend model, pass to child component
  render() {
    if(this.props.appName){
      return (           
        <div>  

        <TutorHeader
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
        
        <Switch>
          <Route exact path="/" component={MCQ}/>
          <Route exact path="/home" component={MCQ}/>
        </Switch>
        
        <TutorSideBar/>

      </div>
      );
    }                           

    return (
      <div className="article-preview">Website under updating</div>
    );    
  }
}

// export component + outside component subscription
export default connect(mapStateToProps)(Tutor);


/**
 
 1. potnental fix of "undefined" bug + map()
 
 ArticleList.js
 const ArticleList = props => {
    
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }
  
  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No articles are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <ArticlePreview article={article} key={article.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

ArticlePreview.js
const ArticlePreview = props => {
  const article = props.article;
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>
      </div>
    </div>  

2. 

  // TODO: map() a list of mc questions into html tag
  // then call this function in render
  constructListMCQ(){
    this.props.mcqs.map(mcq=>{
      return(
        <p>{this.props.mcq.questions.choice1}</p>
        ...
      )
    })
  }

          <p>{this.props.mcq.questions.question}</p>  
          <TutorMC mcq={this.props.mcq.questions.choice1} />
          <TutorMC mcq={this.props.mcq.questions.choice2} />
          <TutorMC mcq={this.props.mcq.questions.choice3} />
          <TutorMC mcq={this.props.mcq.questions.choice4} />
          <button onClick={this.debug.bind(this)}>debug</button>        
          <button onClick={this.showAnswer.bind(this)}>show answer</button>        
          <p>{this.state.answer}</p>



  
 */