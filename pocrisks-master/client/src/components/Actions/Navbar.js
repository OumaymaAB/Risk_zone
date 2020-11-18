import React from "react";

import { Form , Navbar , Nav , FormControl , Button } from 'react-bootstrap'

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomNavbar() {

return(
<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">LookUp Project</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#users">Users</Nav.Link>
      <Nav.Link href="#pricing">Map</Nav.Link>
      <Nav.Link href="#account">Account</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  </>
)
}