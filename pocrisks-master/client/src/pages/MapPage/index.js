import CustomNavbar from "../../components/Actions/Navbar";
import React, { useEffect, useState } from "react";
import { getGeoData } from "../../service/geodata";
import Map from "../../components/map";


const MapPage = () => {
    const [geoData, setGeoData] = useState(null);
  
    useEffect(() => {
      getGeoData()
        .then((res) => {setGeoData(res.data); console.log("data ", res.data)})
        .catch((err) => console.error("API ERROR : ", err.message));
    },[]);
  
    return (
      <>
      <CustomNavbar/>
      <Map geoData={geoData} />
      </>
    );
  };

  export default MapPage;