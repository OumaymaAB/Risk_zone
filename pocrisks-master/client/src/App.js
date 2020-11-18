import React, { useEffect, useState } from "react";
import Map from "./components/map/index";
import { getGeoData } from "./service/geodata";
import "./style.css";
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './components/map/Modals/ModalForm'
import DataTable from './components/map/Tables/DataTable'
import UsersList from "./components/Admin/users";
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
  
     <div>
       <UsersList />
        {/* <Map geoData={geoData} /> */}
      </div> 
      
  
   
  );
};

export default App;
