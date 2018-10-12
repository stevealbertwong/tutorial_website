/**
 * user click "show answer" => 
 * save props in internal state + logic to compare answer
 * show state back in component
 */

import { Link } from 'react-router-dom';
import React from 'react';

const TutorMC = props => {
  const choice = props.mcq;
  console.log(props);
  return (
    <div className="article-meta">
    <p>{choice}</p>
    </div>
  );
};

export default TutorMC;