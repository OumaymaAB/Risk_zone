import React, { useEffect, useRef, useState } from "react";
import * as L from "mapbox-gl";
import { token } from "../../util/config";
import Popup from '../map/Popup'
import ReactDOM from 'react-dom'


L.accessToken = token;

const Map = ({ geoData }) => {
  const mapContainerRef = useRef(null);

  // offset puts the popup 15px above the feature
  const popUpRef = useRef(new L.Popup({ offset: 15 }));

  const [state, setState] = useState({
    lng: -7.3848547,
    lat: 33.6835086,
    zoom: 13,
  });

  //HOOKS => componentDidMount
  useEffect(() => {
    const map = new L.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [state.lng, state.lat],
      zoom: state.zoom,
    });

    // geoData &&
    // geoData.features.map((e) => 
    // new L.Marker().setLngLat(e.geometry.coordinates).addTo(map)
    // );

    
    // add navigation control (the +/- zoom buttons)
    map.addControl(new L.NavigationControl(), 'bottom-right');
    // add popup when user clicks a point

    
    map.on('click' , e =>
    {
      const result = map.queryRenderedFeatures(e.point, {layers : ['points']});
      if(result.length)
      {
        const popup  = new L.Popup({closeButton: false});
        console.log(result);
        const content = result[0].properties.descrip;

        popup.setLngLat(e.lngLat)
        .setHTML(`<p>${content}</p>`)
        .addTo(map);
      }
      console.log('click ', e.lngLat);
    })
    map.on("load", () => {
      map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        function (error, image) {
          if (error) throw error;
          map.addImage("custom-marker", image);
          map.addSource("points", {
            type: "geojson",
            data: geoData,
          });
          map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
              "icon-image": "custom-marker",
              // get the title name from the source's "title" property
              "text-field": ["get", "title"],
              "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
              "text-offset": [0, 1.25],
              "text-anchor": "top",
            },
          });
        }
      );
    });
  });

  return (
    <>
      <div ref={(el) => (mapContainerRef.current = el)} className="mapbox" />
    </>
  );
};

export default Map;
