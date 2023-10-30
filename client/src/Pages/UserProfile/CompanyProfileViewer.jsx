import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { JiboContext } from "../../Context/JiboContext";
import { Col, Row } from "react-bootstrap";
import "../../Style/general.scss";
import "./profileWorker.scss";

export const CompanyProfileViewer = () => {
  const { companyData, activeNavLat, setActiveNavLat } =
    useContext(JiboContext);
  const { img, user_id } = companyData;
  const navigate = useNavigate();

  return (
    <Col className="d-flex justify-content-center">
      <Row className="d-flex justify-content-center">
        <Col lg={3} className="mb-0">
          <Row className="d-flex justify-content-center gap-3 mx-lg-5 text-center">
            <Col sm={12}>
              <img
                className="profile-img"
                src={
                  !img
                    ? `/images/profileImg/default.png`
                    : `http://localhost:3000/images/company_profile/${img}`
                }
                alt=""
              />
            </Col>

            <Col sm={12}>
              {companyData.is_validated === 1 && (
                <h3 className="mb-5">CUENTA ACTIVA</h3>
              )}
              {companyData.is_validated === 0 && (
                <h3 className="mb-5">CUENTA INACTIVA</h3>
              )}
              <Col sm={12}>
                <button
                  className="buttom2"
                  onClick={() =>
                    navigate(`/companyProfile/${user_id}/viewAppliers`)
                  }
                >
                  Volver a Candidatos
                </button>
              </Col>
            </Col>

            <Col
              sm={12}
              className={
                activeNavLat === 1
                  ? `active_navigateLateral `
                  : `navigateLateral`
              }
            >
              <h5
                onClick={() => {
                  navigate("/viewApplierProfile/:worker_id"),
                    setActiveNavLat(1);
                }}
              >
                Datos Personales
              </h5>
            </Col>
            <Col
              sm={12}
              className={
                activeNavLat === 2
                  ? `active_navigateLateral `
                  : `navigateLateral`
              }
            >
              <h5
                onClick={() => {
                  navigate("applierOtherData"), setActiveNavLat(2);
                }}
              >
                Otros datos
              </h5>
            </Col>
            <Col
              sm={12}
              className={
                activeNavLat === 3
                  ? `active_navigateLateral `
                  : `navigateLateral`
              }
            >
              <h5
                onClick={() => {
                  navigate("applierJobPreferences"), setActiveNavLat(3);
                }}
              >
                Preferencias laborales
              </h5>
            </Col>
            <Col
              sm={12}
              className={
                activeNavLat === 4
                  ? `active_navigateLateral `
                  : `navigateLateral`
              }
            >
              <h5
                onClick={() => {
                  navigate("applierCurriculum"), setActiveNavLat(4);
                }}
              >
                Curriculum
              </h5>
            </Col>
          </Row>
        </Col>
        <Col sm={12} lg={9}>
          <Outlet />
        </Col>
      </Row>
    </Col>
  );
};
