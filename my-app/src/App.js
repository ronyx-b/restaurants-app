import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import About from './About';
import NotFound from './NotFound';

import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import React, {useState, useEffect} from 'react';
import queryString from 'query-string';

function App() {
  const [searchString, setSearchString] = useState("");
  const history = useHistory(); // – HINT: You can use the "useHistory" hook – see: "'Redirecting' to a Route" https://web422.ca/notes/react-routing
  const handleSubmit = function(e) {
    e.preventDefault(); // Prevents the default action for the event (parameter e)
    history.push(`/restaurants?borough=${searchString}`); // Navigates to the route: /restaurants?borough=searchString where searchString is the value in the state (above)
    setSearchString(""); // Resets the value of searchString to ""
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <Switch>
              <Route exact path='/' render={() => ( <Restaurants /> )}/>
              <Route exact path='/about' render={() => ( <About /> )}/>
              <Route path='/Restaurants' render={(props) => ( <Restaurants query={queryString.parse(props.location.search).borough} /> )}/>
              <Route path='/Restaurant/:id' render={(props) => ( <Restaurant id={props.match.params.id} /> )}/>
              <Route render={()=>(<NotFound />)} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
}

export default App;
