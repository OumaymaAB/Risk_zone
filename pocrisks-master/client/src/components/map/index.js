import React, { useEffect, useRef, useState } from "react";
import * as L from "mapbox-gl";
import { token } from "../../util/config";
import CustomModal from '../Actions/CustomModal'


L.accessToken = token;


const Map = ({ geoData }) => {
  const mapContainerRef = useRef(null);

  // offset puts the popup 15px above the feature


  const [showPopUp , setShowPopUp] = useState(false)

  const [ clickedPos , setclickedPos] = useState({
    lg : 0,
    lt : 0
  })
  const [state, setState] = useState({
    lng: -7.3848547,
    lat: 33.6835086,
    zoom: 13,
  });

  const handleShow = () => setShowPopUp(true);

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
      let pop = new L.Popup({ closeButton: true, offset: 25 }).setHTML(
        "<ul><li>Risk :" + e.properties.descrip + '</li><li>Date of notice : '+ (e.properties.date || 'Not specified') +'</li>' +
          ( window.location.pathname === '/admin/map' ? '<li>Added By :</li>' : ' ' )
      );
      var el = document.createElement("div");
      el.id = "marker";
      return new L.Marker(el)
        .setLngLat(e.geometry.coordinates)
        .setPopup(pop)
        .addTo(map);
       
    });
    
    
    // add navigation control (the +/- zoom buttons)
    map.addControl(new L.NavigationControl(), 'bottom-right');


    // add popup when user clicks a point

    // add new marker on right click 
    map.on("contextmenu", async function (e) {

      setclickedPos({
        lt : e.lngLat.lat , 
        lg : e.lngLat.lng
        })
      handleShow()
      console.log(clickedPos)
      //console.log(e.lngLat)
    
    })
            

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
      {showPopUp && <CustomModal lg={clickedPos.lg} lt={clickedPos.lt}  launch={showPopUp} /> }
    </>
  );
};

export default Map;
