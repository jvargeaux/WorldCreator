import React from 'react';

function MapPoint(props) {

  const select = () => {
    props.selectPlace(props.index);
  }

  const locationIcon = () => {
    switch (props.type) {
      case 'city':
        return 'fa-map-marker';
      case 'road':
        return 'fa-map-signs';
      default:
        return '';
    }
  }

  return (
    <div className={`MapPoint ${props.selectedPlace === props.index ? "MapPointSelected" : ""}`} onClick={select} style={{left: props.x + "px", top: props.y + "px"}}>
      <p className="MapPointText">{props.name}</p>
      <i className={`MapPointIcon fas ${locationIcon()} fa-lg`}></i>
    </div>
  );
}

export default MapPoint;
