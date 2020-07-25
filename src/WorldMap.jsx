import React, { useState, useEffect } from 'react';
import MapPoint from './MapPoint';
import map from './assets/middle-earth-map.jpg';
import wikiButtonStill from './assets/wiki_button_still.png';

function WorldMap(props) {

  const data = [
    {
      name: 'City 1',
      type: 'city',
      x: 401.1,
      y: 79.98
    },
    {
      name: 'City 2',
      type: 'city',
      x: 325.5,
      y: 267.1
    },
    {
      name: 'Crossroads',
      type: 'road',
      x: 513.9,
      y: 176.4
    }
  ];


  const initMapAspectRatio = () => {
    let image = new Image();
    image.src = map;
    let aspectRatio = image.width / image.height;
    setMapAspectRatio(aspectRatio);

    let mapContainer = document.getElementById("map");
    if (!map) return;
    let height = mapContainer.clientWidth / aspectRatio;
    mapContainer.style.maxHeight = height + "px";
    mapContainer.style.height = height + "px";
  }

  const setMapContainerSize = () => {
    let mapContainer = document.getElementById("map");

    let newWidth = mapContainer.clientWidth;
    let newHeight = newWidth / mapAspectRatio;

    mapContainer.style.maxHeight = newHeight + "px";
    mapContainer.style.height = newHeight + "px";
    setZoomOutLimit(newWidth);
    if (zoomLevel < newWidth) {
      setZoomLevel(newWidth);
    }
  }

  useEffect(() => {
    // initMapAspectRatio();
    // window.addEventListener('resize', setMapContainerSize);

    initLeafletMap();
  });


  const [mapAspectRatio, setMapAspectRatio] = useState(null);
  const [zoomInLimit, setZoomInLimit] = useState(2400);
  const [zoomOutLimit, setZoomOutLimit] = useState(800);
  const [zoomLevel, setZoomLevel] = useState(zoomOutLimit);
  const [mouseIsDragging, setMouseIsDragging] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const scrolled = (e) => {
    // Note: neg (-) value = zoom in, so we flip the value
    let map = document.getElementById("map");
    map.style.overflow = "scroll";
    let zoomDelta = -e.deltaY;
    let newZoomLevel = zoomLevel + zoomDelta;
    if (newZoomLevel > zoomInLimit) {
      map.style.overflow = "hidden";
      setZoomLevel(zoomInLimit);
      return;
    }
    else if (newZoomLevel < zoomOutLimit) {
      map.scrollBy(-e.deltaX, -e.deltaY);
      setZoomLevel(zoomOutLimit);
      return;
    }

    let aspectRatio = map.clientWidth / map.clientHeight;

    // add half the frame width/height to get "center" position
    let xPos = map.scrollLeft + map.clientWidth / 2;
    let yPos = map.scrollTop + map.clientHeight / 2;

    // get ratio of how far along we are on x and y, 0 = top/left, 1 = bottom/right
    // note: min = frame w or h / 2, max = full img w or h - frame w or h / 2
    // because of the "centering" we did earlier
    let xPosRatio = xPos / newZoomLevel;
    let yPosRatio = yPos / newZoomLevel;

    // how much do we want to "undo" from the scroll event?
    // we are moving by e.deltaX/Y already because of scroll event
    // img growing by e.deltaX
    let offsetByX = zoomDelta * xPosRatio;
    let offsetByY = zoomDelta * (1/aspectRatio) * yPosRatio;

    // pos (+) value = right / down
    map.scrollBy(-e.deltaX + offsetByX, -e.deltaY + offsetByY);
    setZoomLevel(newZoomLevel);
  }

  const mouseDown = (e) => {
    e.preventDefault();
    setMouseIsDragging(true);
  }
  const mouseUp = (e) => {
    e.preventDefault();
    setMouseIsDragging(false);
  }
  const mouseMove = (e) => {
    if (mouseIsDragging) {
      document.getElementById("map").scrollBy(-e.movementX, -e.movementY);
    }
  }
  const mouseLeave = () => {
    setMouseIsDragging(false);
  }

  const calcCoord = (coord) => {
    let coordMult = zoomLevel / zoomOutLimit;
    return coord * coordMult;
  }

  const selectPlace = (index) => {
    if (selectedPlace === index) {
      setSelectedPlace(null);
    }
    else {
      setSelectedPlace(index);
    }
  }


  const initLeafletMap = () => {
    var L = window.L;
    console.log(L);

    var mymap = L.map('mapid', {
      crs: L.CRS.Simple,
      center: [256.5, 450],
      zoomDelta: 0.01,
      zoomSnap: 0,
      maxZoom: 3,
      minZoom: 0,
      zoom: 0.3,
      wheelDebounceTime: 5,
      maxBounds: [[0,0], [513,900]],
      maxBoundsViscosity: 0.95,
      doubleClickZoom: false,
      zoomControl: false,
      zoomAnimation: false,
      inertia: false
    });
    var bounds = [[0,0], [513,900]];
    var image = L.imageOverlay(map, bounds).addTo(mymap);

    var pointA = L.point(300, 251);
    var myIcon = L.icon({
      iconUrl: wikiButtonStill,
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      popupAnchor: [-3, -76]
    });
    L.marker([400, 500], {icon: myIcon}).addTo(mymap);
  }



  // <div className="WorldMap">
  //   <div className="MapControls">
  //   </div>
  //   <div id="map" className="MapContainer" onWheel={scrolled} onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove} onMouseLeave={mouseLeave}>
  //     <div className="MapOverlay">
  //       {data.map((place, index) => {
  //         return (<MapPoint
  //           name={place.name}
  //           type={place.type}
  //           x={calcCoord(place.x)}
  //           y={calcCoord(place.y)}
  //           selectedPlace={selectedPlace}
  //           selectPlace={selectPlace}
  //           index={index}
  //           key={index} />)
  //       })}
  //     </div>
  //     <img id="mapImg" src={map} alt="Map" width={zoomLevel.toString()} onLoad={setMapContainerSize} />
  //   </div>
  // </div>


  return (
    <div class="WorldMapContainer">
      <div id="mapid"></div>

    </div>
  );
}

export default WorldMap;
