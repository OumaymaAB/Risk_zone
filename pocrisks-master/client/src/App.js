import React, { useEffect, useState } from "react";
import Map from "./components/map";
import { getGeoData } from "./service/geodata";
import CustomNavbar from './components/Actions/Navbar'
import "./style.css";

const App = () => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    console.log(
      "MOUNTED"
    )
   
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

export default App;
