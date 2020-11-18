import React, { useEffect, useState } from "react";
import Map from "./components/map/index";
import { getGeoData } from "./service/geodata";
import CustomNavbar from './components/Actions/Navbar'
import "./style.css";
// import {getItems } from './components/Admin/index'

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

  // const modalRef = React.useRef();

  // const openModal = () => {
  //   modalRef.current.openModal()
  // };

  return (
    <>
    <CustomNavbar/>
    <Map geoData={geoData} />
    </>
  );
};

export default App;
