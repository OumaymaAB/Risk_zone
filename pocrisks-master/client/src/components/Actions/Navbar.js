import React, { useContext } from "react";

import {
  Form,
  Navbar,
  Nav,
  FormControl,
  Button,
  Dropdown,
} from "react-bootstrap";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Context, saveState } from "util/useAuth";
import { hist } from "App";

export default function CustomNavbar() {
  const { context, setContext } = useContext(Context);
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      className="customToggle"
      style={{
        textDecoration: "none",
      }}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  const handleDisconnect = () => {
    const state = {
      context:{
        isLogged: false,
        user: null
      },
      setContext
    }

    setContext(state);
    saveState(state);
    hist.push("/login")
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">LookUp Project</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/map">Home</Nav.Link>
          {context.isLogged && context.user.admin &&<Nav.Link href="/admin/users">Users</Nav.Link>}
          <Nav.Link href="#pricing">Map</Nav.Link>
          <Nav.Link href="#account">Account</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
        {context.isLogged && <Form inline>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              {context.isLogged && context.user.username}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="1" onClick={handleDisconnect}>Disconnect</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>}
      </Navbar>
    </>
  );
}
