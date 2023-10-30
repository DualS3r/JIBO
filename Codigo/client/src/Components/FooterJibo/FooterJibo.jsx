import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./footer.scss";

export const FooterJibo = () => {
  const navigate = useNavigate();
  return (
    <Col className="ppal-footer p-0 mt-5">
      <div className="wave"></div>
      <Row className="w-100 pt-5 pt-lg-5">
        <Col
          lg={6}
          className="d-flex justify-content-around align-items-end zDelante"
        >
          <Row className=" text-center">
            <Col>
              <img
                className=""
                src="/images/iconos/facebook.png"
                alt="icono facebook"
              />
            </Col>
            <Col>
              <img
                className=""
                src="/images/iconos/twitter.png"
                alt="icono twitter"
              />
            </Col>
            <Col>
              <img
                className=""
                src="/images/iconos/instagram.png"
                alt="icono instagram"
              />
            </Col>
            <Col>
              <img
                className=""
                src="/images/iconos/linkedin.png"
                alt="icono linkedin"
              />
            </Col>
            <Col sm={12} className="mt-3 d-flex justify-content-center">
              <h5>@JIBO 2023</h5>
            </Col>
          </Row>
        </Col>

        <Col
          lg={6}
          className="d-flex justify-content-center justify-content-lg-end text-center my-3 zDelante"
        >
          <Row className="justify-content-center align-items-center">
            <Col sm={12} md={4}>
              <h6 onClick={() => navigate("/disclaimer")}>AVISO LEGAL</h6>
            </Col>
            <Col sm={12} md={4}>
              <h6 onClick={() => navigate("/privacyPolicy")}>
                POLÍTICA DE PRIVACIDAD
              </h6>
            </Col>
            <Col sm={12} md={4}>
              <h6 onClick={() => navigate("/cookiePolicy")}>
                POLÍTICA DE COOKIES
              </h6>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};
