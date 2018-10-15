/** 
 * TODO:
 * 0. update reducer, 1 for store, 1 for display, 1 for filter term + action functor
 * 1. constructor() -> internal state store selected page + whether expanded
 * 2. componentWillMount() -> fill store DB tree w data
 * 3. mapStateToProps -> local props tree listen to global DB tree
 * 4. map() side bar components -> store DB tree get all exercises titles
 * 5. css style -> main page shift right when click
 * 6. side bar click logic -> mapDispatchToProps 
 *    -> functions when click side bar button 
 *    -> set internal state + updated DB tree w selected title + 
 *    -> filter DB tree based on selected title in DB tree
 *    -> update "display" DB tree(component listen to display) 
 *  
 * export as <SideBar> component
 */
import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import { connect } from 'react-redux';
import { LOAD_MCQ, STORE_MCQ, FILTER_MCQ } from '../constants/actionTypes';


// TODO: build list of sub side bar components


const mapStateToProps = state => {
    return {
      ...state.mc
}};

// ?? whats difference between calling it here or inside component
const mapDispatchToProps = dispatch => ({
    onLoad: (payload) => // this.props.onLoad()
        dispatch({ type: STORE_MCQ, payload }),  
    onSelect: (payload) => 
        dispatch({ type: FILTER_MCQ, payload }),
    onUpdateDisplay: (payload) => 
        dispatch({ type: LOAD_MCQ, payload })  
});

class TutorSideBar extends React.Component { 

    constructor(){
        super();
        this.state = {
            selected: 'home', // default home page
            expanded: false
        }
    }

    componentWillMount(){
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
        this.props.onLoad(fakeMC);
    }


    // TODO 
    filterDisplayComponent(storeMCQs, filterTerm){
        // filter array, only match stays
        return storeMCQs.filter( MCQ => 
            MCQ.class == filterTerm)    
    }

    selectEventListener(selected){
        this.setState({selected});   
        
        if(selected === "home"){
            this.props.onUpdateDisplay(this.props.store)
        } else{
            // this.dispatch({ type: FILTER_MCQ, selected });
            this.props.onSelect(selected);        
            
            const filteredMCQ = this.filterDisplayComponent(this.props.store, selected);        
            
            this.props.onUpdateDisplay(filteredMCQ) 
        }


        
    }

    // eventkey == selected ??
    render(){
        return(
            // <SideNav onSelect={(selected) => {
            //     // Add your code here
            // }}>
            
            <SideNav onSelect={this.selectEventListener.bind(this)}>
            <SideNav.Toggle />            
            <SideNav.Nav selected={this.state.selected}>
            {/* <SideNav.Nav defaultSelected="home"> */}

                <NavItem eventKey="home">

                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>

                    <NavText style={{ paddingRight: 32 }} title="Home">
                        Home
                    </NavText>

                </NavItem>
                
                <NavItem eventKey="MC">
                    
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                    </NavIcon>

                    <NavText>
                        MC exercises
                    </NavText>

                        <NavItem eventKey="MC/p5">
                            <NavText>
                                primary school 5
                            </NavText>
                        </NavItem>

                        <NavItem eventKey="MC/p6">
                            <NavText>
                                primary school 6
                            </NavText>
                        </NavItem>

                </NavItem>
                
            </SideNav.Nav>
            </SideNav>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TutorSideBar);