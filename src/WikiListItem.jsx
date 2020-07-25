import React from 'react';

function WikiListItem(props) {

  const select = () => {
    props.handleClick(props.data.id);
  }

  return (
    <div className="WikiListItem" onClick={select}>
      <img className="WikiListItemAvatar" src={props.data.avatarImage} />
      <p>{props.data.name}</p>
      <p>{props.data.subcategory}</p>
    </div>
  );
}

export default WikiListItem;
