import React, { useState } from 'react';
import SideMenu from './SideMenu';
import WorldMap from './WorldMap';
import Wiki from './Wiki';
import './App.scss';
import wikiData from './WikiData.js';

function App() {

  const [selectedMenu, setSelectedMenu] = useState(1);
  const [data, setData] = useState(wikiData);

  const selectMenuItem = (index) => {
    setSelectedMenu(index);
  }

  return (
    <div className="App">
      <SideMenu selectMenuItem={selectMenuItem} />
      {selectedMenu === 0 ? <WorldMap /> : ''}
      {selectedMenu >= 1 ? <Wiki data={data} /> : ''}
    </div>
  );
}

export default App;
