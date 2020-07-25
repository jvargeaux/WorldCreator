import React from 'react';

function SideMenu(props) {

  const selectMap = () => {
    props.selectMenuItem(0);
  }
  const selectWiki = () => {
    props.selectMenuItem(1);
  }
  const select = () => {
    props.selectMenuItem(2);
  }
  const selectSettings = () => {
    props.selectMenuItem(3);
  }

  return (
    <div className="SideMenu">
      <div className="SideMenuFixedContainer">
        <div className="SideMenuItemContainer" onMouseDown={selectMap}>
          <i className="fas fa-map fa-2x"></i>
          <h3>Map</h3>
        </div>
        <div className="SideMenuItemContainer" onMouseDown={selectWiki}>
          <i className="fas fa-book fa-2x"></i>
          <h3>Wiki</h3>
        </div>
        <div className="SideMenuItemContainer" onMouseDown={select}>
          <i className="fas fa-book fa-2x"></i>
          <h3>Wiki</h3>
        </div>
        <div className="SideMenuItemContainer" onMouseDown={selectSettings}>
          <i className="fas fa-cogs fa-2x"></i>
          <h3>Settings</h3>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
