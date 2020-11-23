import React from 'react'
import { Navbar, Nav, Container} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
    return(
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>WELCOME</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <LinkContainer to="/fruitlist">
                            <Nav.Link>Fruit List</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/addfruit">
                            <Nav.Link>Add New Fruit</Nav.Link>
                        </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header