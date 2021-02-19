// Navigasjonsbar. Bruker UserContext for å hente ut bruker-objektet. Herfra brukes navnet til å vise i dropdown,
// og tilgangsnivå for å sjekke hvilke elementer som skal vises for brukeren og ikke.
// logOut blir også brukt så brukeren kan logge ut.

import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const NavBar = () => {
    const { user, logOut } = useContext(UserContext);
    const fullName = user.fullName ? user.fullName : "undefined user";

    const handleOnClick = () => {
        logOut();
    };

    return (
        <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Creative Technology</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">I dag</Nav.Link>
                        <Nav.Link href="/jobs">Jobs</Nav.Link>
                        <Nav.Link href="/status">Status</Nav.Link>
                        {user.accessLevel > 2 && (
                            <Nav.Link href="/vehicles">Kjøretøy</Nav.Link>
                        )}
                    </Nav>
                    <Nav>
                        <NavDropdown title={fullName}>
                            <NavDropdown.Item href="/preferences">
                                Innstillinger
                            </NavDropdown.Item>
                            {user.accessLevel > 3 && (
                                <NavDropdown.Item href="/admin">
                                    Admin
                                </NavDropdown.Item>
                            )}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onSelect={handleOnClick}>
                                Logg ut
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
