import React, { useEffect, useRef, useState } from "react";
import * as L from "mapbox-gl";
import { token } from "../../util/config";
import 'bootstrap/dist/css/bootstrap.min.css'



L.accessToken = token;

const Map = ({ geoData }) => {
  const mapContainerRef = useRef(null);
  const {show, setShow} = useState(true);
  const closeModalHandler = () => setShow(false);  

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

    geoData &&
    geoData.features.map((e) => {
      const content = e.properties.descrip;
      let pop = new L.Popup({ closeButton: false, offset: 25 })
      .setText("" + e.properties.descrip)
      .setHTML(`
       <p>${content}</p>
       <img src='1.jpg' width="150" height="150"/>
      `)
      var el = document.createElement("div");
      el.id = "marker";
      new L.Marker(el)
        .setLngLat(e.geometry.coordinates)
        .setPopup(pop)
        .addTo(map);
       
    });
    
    
    // add navigation control (the +/- zoom buttons)
    map.addControl(new L.NavigationControl(), 'bottom-right');
    // add popup when user clicks a point

    // // add new marker
    // map.on("click", function (e) {
    //   console.log(Object.values(e.lngLat.wrap()))
    //   let pop = new L.Popup({ offset: 25 }).setText(
    //     "this is a new marker"
    //   );
    //   var el = document.createElement("div");
    //   el.id = "marker";
    //   new L.Marker(el)
    //     .setLngLat(Object.values(e.lngLat.wrap()))
    //     .setPopup(pop)
    //     .addTo(map);
      
    //       });

    //display Modal
    // map.on("click", e => {
    
    //   let pop = new L.Popup({ offset: 25 }).setText(
    //     "this is a new marker"
    //   );
    //   var el = document.createElement("div");
    //    el.id = "marker";
    //   new L.Point(el)
    //   .setLngLat(Object.values(e.lngLat.wrap()))
    //   .setPopup(pop);
    // //   var el = document.createElement("div");
    // //   el.id = "marker";
    // //   new L.Marker(el)
    // //     .setLngLat(Object.values(e.lngLat.wrap()))
    // //     .setPopup(pop)
    // //     .addTo(map);
    //     // <Modal show={show} closeModalHandler={closeModalHandler} />
    //     console.log("Clicked");
    // });
          
    map.on('click', function(e) {
      // $('#mymodal').modal('show');
      console.log("map Clicked");
    });

    // map.on('click' , e =>
    // {
    //   const result = map.queryRenderedFeatures(e.point, {layers : ['points']});
    //   if(result.length)
    //   {
    //     const popup  = new L.Popup({closeButton: false});
    //     e.id='marker';
    //     console.log(result);
    //     const content = result[0].properties.descrip;

    //     popup.setLngLat(e.lngLat)
    //     .setHTML(`<p>${content}</p>`)
    //     .addTo(map);
    //   }
    //   console.log('click ', e.lngLat);
    // })
    // map.on("load", () => {
    //   map.loadImage(
    //     "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
    //     function (error, image) {
    //       if (error) throw error;
    //       map.addImage("custom-marker", image);
    //       map.addSource("points", {
    //         type: "geojson",
    //         data: geoData,
    //       });
    //       map.addLayer({
    //         id: "points",
    //         type: "symbol",
    //         source: "points",
    //         layout: {
    //           "icon-image": "custom-marker",
    //           // get the title name from the source's "title" property
    //           "text-field": ["get", "title"],
    //           "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    //           "text-offset": [0, 1.25],
    //           "text-anchor": "top",
    //         },
    //       });
    //     }
    //   );
    // });
  });

  
  return (
    <>
      <div ref={(el) => (mapContainerRef.current = el)} className="mapbox" />
      {/* <div>
      { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
      <button onClick={() => setShow(true)} className="btn-openModal">Open Modal</button>
      <Modal show={show} close={closeModalHandler} />
    </div> */}
    </>
  );
};

export default Map;
