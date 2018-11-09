/**
 * dumb component
 * 
 */

import React from 'react';

const TutorBanner = ({ appName }) => {
  return (
    <div className="banner-color">
      <div className="container">
        <h1 className="banner-header">
          {appName.toLowerCase()}
        </h1>
        <p className="banner-paragraph">A place to share your knowledge.</p>
      </div>
    </div>
  );
};

export default TutorBanner;
