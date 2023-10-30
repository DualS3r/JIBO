import React, { useContext, useState } from "react";
import { JiboContext } from "../../Context/JiboContext";
import { getRandomNumber } from "../../Utils/getRandomNumber";
import { Link, useNavigate } from "react-router-dom";
import { delLocalStorage } from "../../Utils/localStorageUtils";
import { Col, Navbar, Container, Nav } from "react-bootstrap";
import "./navbarJibo.scss";
import "../../Style/general.scss";

export const NavbarUserJibo = () => {
  const navigate = useNavigate();
  const {
    setShowModal,
    userType,
    workerData,
    companyData,
    setIsLogged,
    setUserType,
    setWorkerData,
    setCompanyData,
  } = useContext(JiboContext);
  const [randomBanner, setRandomBanner] = useState(getRandomNumber(0, 10));
  const [showNavbar, setShowNavbar] = useState(false);

  const imgWorker = workerData?.img;
  const imgCompany = companyData?.img;

  return (
    <>
      <Col sm={12} className="p-0">
        <Navbar expand="lg" className="ppal-navbar2">
          <Container fluid className="d-flex justify-content-between p-0 m-0">
            <div className="d-flex justify-content-center align-items-center">
              <div className="ppal-logo d-flex justify-content-center align-items-center px-5">
                {userType === 1 ? (
                  <Navbar.Brand
                    className="format-textLogo"
                    as={Link}
                    to={`/workerProfile/${workerData.user_id}`}
                  >
                    JIBO
                  </Navbar.Brand>
                ) : userType === 2 ? (
                  <Navbar.Brand
                    className="format-textLogo"
                    as={Link}
                    to={`/companyProfile/${companyData.user_id}`}
                  >
                    JIBO
                  </Navbar.Brand>
                ) : userType === 0 ? (
                  <Navbar.Brand
                    className="format-textLogo"
                    as={Link}
                    to={`/admin`}
                  >
                    JIBO
                  </Navbar.Brand>
                ) : null}
              </div>

              <div className="ms-5">
                {userType === 1 ? (
                  <h4 className="noneText">Perfil profesional</h4>
                ) : userType === 2 ? (
                  <h4 className="noneText">Perfil empresa</h4>
                ) : userType === 0 ? (
                  <h4 className="noneText">Perfil administrador</h4>
                ) : null}
              </div>
            </div>
            <Navbar.Toggle
              onClick={() => setShowNavbar(!showNavbar)}
              className="me-3"
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse
              in={showNavbar}
              className="justify-content-end "
              id="basic-navbar-nav"
            >
              <div className="d-flex align-items-center">
                <Nav className="me-auto navbar-nav-user ">
                  <div className="noneImg">
                    {userType != 0 && (
                      <img
                        className="format-imgProfile mt-5 "
                        src={
                          !imgWorker && imgCompany
                            ? `http://localhost:3000/images/company_profile/${imgCompany}`
                            : imgWorker && !imgCompany
                            ? `http://localhost:3000/images/worker_profile/${imgWorker}`
                            : `/images/profileImg/default.png`
                        }
                        alt=""
                      />
                    )}
                  </div>

                  <div className="noneText2">
                    {userType === 1 ? (
                      <h4>Perfil profesional</h4>
                    ) : userType === 2 ? (
                      <h4>Perfil empresa</h4>
                    ) : userType === 0 ? (
                      <h4 className="mt-3">Perfil administrador</h4>
                    ) : null}
                  </div>

                  {userType === 1 && workerData.complete_profile === 1 ? (
                    <>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/search/allOffers"), setShowNavbar(false);
                        }}
                      >
                        Ofertas disponibles
                      </Nav.Link>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate(
                            `/workerProfile/${workerData.user_id}/offersApply`
                          ),
                            setShowNavbar(false);
                        }}
                      >
                        Ofertas inscritas
                      </Nav.Link>
                    </>
                  ) : userType === 2 && companyData.is_validated === 1 ? (
                    <>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/search/allWorkers"), setShowNavbar(false);
                        }}
                      >
                        Buscar profesionales
                      </Nav.Link>
                    </>
                  ) : userType === 0 ? (
                    <>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/search/allCompany"), setShowNavbar(false);
                        }}
                      >
                        Empresas
                      </Nav.Link>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/search/allWorkers"), setShowNavbar(false);
                        }}
                      >
                        Profesionales
                      </Nav.Link>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/search/allOffers"), setShowNavbar(false);
                        }}
                      >
                        Ofertas
                      </Nav.Link>
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        onClick={() => {
                          navigate("/admin/editRoles"), setShowNavbar(false);
                        }}
                      >
                        Configurar especialidades
                      </Nav.Link>
                    </>
                  ) : null}
                  {userType === 0 ? (
                    <Nav.Link
                      className="d-flex align-items-center mx-lg-3"
                      as={Link}
                      to={`/admin`}
                      onClick={() => setShowNavbar(false)}
                    >
                      Mi perfil
                    </Nav.Link>
                  ) : userType === 2 ? (
                    <Nav.Link
                      className="d-flex align-items-center mx-lg-3"
                      as={Link}
                      to={`/companyProfile/${companyData.user_id}`}
                      onClick={() => setShowNavbar(false)}
                    >
                      Mi perfil
                    </Nav.Link>
                  ) : (
                    userType === 1 && (
                      <Nav.Link
                        className="d-flex align-items-center mx-lg-3"
                        as={Link}
                        to={`/workerProfile/${workerData.user_id}`}
                        onClick={() => setShowNavbar(false)}
                      >
                        Mi perfil
                      </Nav.Link>
                    )
                  )}

                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => {
                        setShowModal(0),
                          setIsLogged(false),
                          setUserType(-1),
                          navigate("/"),
                          delLocalStorage("token");
                        setWorkerData({});
                        setCompanyData({});
                      }}
                      variant="light"
                      className=" buttom3 mx-lg-5 my-3 my-lg-0"
                    >
                      Cerrar Sesión
                    </button>
                  </div>

                  <div className="viewImg">
                    {userType != 0 && (
                      <img
                        className="format-imgProfile me-lg-5"
                        src={
                          !imgWorker && imgCompany
                            ? `http://localhost:3000/images/company_profile/${imgCompany}`
                            : imgWorker && !imgCompany
                            ? `http://localhost:3000/images/worker_profile/${imgWorker}`
                            : `/images/profileImg/default.png`
                        }
                        alt=""
                      />
                    )}
                  </div>
                </Nav>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Col>
      <Col sm={12} className="p-0">
        <img
          className="imgBanner"
          src={`/images/banner/${randomBanner}.jpg`}
          alt="Foto banner"
        />
      </Col>
    </>
  );
};
