import React from 'react';
import lorem from './LoremIpsum.js';

function WikiPage(props) {

  const linkTo = () => {

  }

  return (
    <div className="WikiPage">
      <div className="WikiPageHeader">
        <img className="WikiPageAvatar" src={props.data.avatarImage} />
        <div className="WikiPageSubHeader">
          <h1>{props.data.name}</h1>
          <h2>{lorem.subtitle}</h2>
          <h3>{lorem.sentence1}</h3>
        </div>
      </div>
      <div className="WikiPageBody">
        <h4>History & Bio</h4>
        <p>{lorem.paragraph2}</p>
        <h4>{lorem.title}</h4>
        <p>{lorem.paragraph6}</p>
      </div>
    </div>
  );
}

export default WikiPage;
