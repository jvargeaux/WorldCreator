import React, { useState } from 'react';
import WikiListItem from './WikiListItem';
import WikiPage from './WikiPage';

function Wiki(props) {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);

  const selectCharacters = () => {
    setSelectedCategory(0);
    setSelectedPage(null);
  }
  const selectLocations = () => {
    setSelectedCategory(1);
    setSelectedPage(null);
  }
  const selectSystem = () => {
    setSelectedCategory(2);
    setSelectedPage(null);
  }
  const selectLore = () => {
    setSelectedCategory(3);
    setSelectedPage(null);
  }

  const selectPage = (id) => {
    setSelectedPage(id);
  }

  return (
    <div className="Wiki">
      <div className="WikiContent">
        <div className="WikiMainButtons">
          <button className={selectedCategory === 0 ? "WikiCategorySelected" : ""} onClick={selectCharacters}>
            <i className="fas fa-user-secret fa-3x WikiButtonIcon"></i>
            <span>Characters</span>
          </button>
          <button className={selectedCategory === 1 ? "WikiCategorySelected" : ""} onClick={selectLocations}>
            <i className="fas fa-mountain fa-3x WikiButtonIcon"></i>
            <span>Locations</span>
          </button>
          <button className={selectedCategory === 2 ? "WikiCategorySelected" : ""} onClick={selectSystem}>
            <i className="fas fa-hand-sparkles fa-3x WikiButtonIcon"></i>
            <span>System</span>
          </button>
          <button className={selectedCategory === 3 ? "WikiCategorySelected" : ""} onClick={selectLore}>
            <i className="fas fa-feather fa-3x WikiButtonIcon"></i>
            <span>Lore</span>
          </button>
        </div>
        {selectedCategory !== null && selectedPage === null &&
          <div className="WikiList">
            {props.data.map((item, index) => {
              if (item.category === selectedCategory) return (
                <WikiListItem category={selectedCategory} data={item} handleClick={selectPage} key={item.id} />
              )
            })}
          </div>
        }
        {selectedPage !== null &&
          <WikiPage data={props.data.find(item => item.id === selectedPage)} />
        }
      </div>
      <div className="WikiBG BG"></div>
      <div className="WikiBGOverlay BG"></div>
    </div>
  );
}

export default Wiki;
