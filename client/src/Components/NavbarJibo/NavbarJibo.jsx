import React, { useContext, useState } from "react";
import { JiboContext } from "../../Context/JiboContext";
import { Link } from "react-router-dom";
import { Col, Navbar, Container, Nav } from "react-bootstrap";
import "./navbarJibo.scss";

export const NavbarJibo = () => {
  const { setShowModal } = useContext(JiboContext);
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <Col className="p-0">
      <Navbar expand="lg" className="ppal-navbar">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand href="/" className="format-textLogo format-homeLogo">
            JIBO
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={() => setShowNavbar(!showNavbar)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse
            in={showNavbar}
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="navbar-nav-user navbar-nav-home">
              <Nav.Link
                onClick={() => setShowNavbar(false)}
                as={Link}
                to="/company"
              >
                Para empresas
              </Nav.Link>
              <Nav.Link
                onClick={() => setShowNavbar(false)}
                as={Link}
                to="/worker"
              >
                Para profesionales
              </Nav.Link>
              <button
                onClick={() => {
                  setShowModal(1), setShowNavbar(false);
                }}
                variant="light"
                className="my-3 my-lg-0 ms-lg-5 buttom2"
              >
                Acceder
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Col>
  );
};
