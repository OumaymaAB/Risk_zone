import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { getUsers } from '../../../service/admin.service';
import ModalForm from '../Modals/ModalForm';
import DataTable from '../Tables/DataTable';


const UsersList = () => {

    const [items, setItems] = useState([]);
  
    const addItemToState = (item) => {
      setItems([...items, item])
    }
  
    const updateState = (item) => {
      const itemIndex = items.findIndex(data => data.id === item.id)
      const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)]
      setItems(newArray)
    }
  
    const deleteItemFromState = (id) => {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
    }
     
    useEffect(() => {
        getUsers()
        .then(res => setItems(res.data))
        .catch(err => console.log(err))
    }, []);
   
    
    return (  <Container className="App">
    <Row>
      <Col>
        <h1 style={{margin: "20px 0"}}>List of Users</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
      </Col>
    </Row>
    <Row>
      <Col>
        <ModalForm buttonLabel="Add New User" addItemToState={addItemToState}/>
      </Col>
    </Row>
  </Container>
 )
};

export default UsersList;