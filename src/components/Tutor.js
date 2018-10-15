/**
 * routing
 * 
 */
import React from 'react';
import TutorHeader from './TutorHeader';
import MCQ from '../components/MCQ';
import './Tutor.css';
import { LOAD_MCQ } from '../constants/actionTypes';

import { Link } from 'react-router-dom';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { store } from '../store';
import agent from '../agent';


const Main = () => (
  <Switch>
    <Route exact path="/" component={MCQ} />
    <Route path="/aboutme" component={MCQ} />
    <Route path="/contact" component={MCQ} />
    <Route path="/projects" component={MCQ} />
    <Route path="/resume" component={MCQ} />
  </Switch>
)

// local props tree listen to global DB tree
const mapStateToProps = state => {
  return {
    ...state, // this.props == state -> by default, not strictly necessary
    // this.props.appName = state.common.appName
    appName: state.common.appName,
    currentUser: state.common.currentUser

  }};

class Tutor extends React.Component { 
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

        <SideNav
    onSelect={(selected) => {
        // Add your code here
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="home">
            <NavIcon>
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Home
            </NavText>
        </NavItem>
        <NavItem eventKey="charts">
            <NavIcon>
                <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
                Charts
            </NavText>
            <NavItem eventKey="charts/linechart">
                <NavText>
                    Line Chart
                </NavText>
            </NavItem>
            <NavItem eventKey="charts/barchart">
                <NavText>
                    Bar Chart
                </NavText>
            </NavItem>
        </NavItem>
    </SideNav.Nav>
</SideNav>



      </div>
      );
    }                           

    return (
      <div className="article-preview">Website under updating</div>
    );    
  }
}

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