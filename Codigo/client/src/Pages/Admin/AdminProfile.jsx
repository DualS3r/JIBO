import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import "./adminprofile.scss";

export const AdminProfile = () => {
  const [companyCount, setCompanyCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/company/countCompany")
      .then((res) => {
        setCompanyCount(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/worker/countWorker")
      .then((res) => {
        setWorkerCount(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/offer/countOffer")
      .then((res) => {
        setOffersCount(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  return (
    <Row className="py-5 gap-5 m-0 d-flex justify-content-evenly align-items-center admin-ppal column">
      <Col
        md={4}
        onClick={() => {
          navigate("/search/allCompany");
        }}
        className="cardAdmin d-flex flex-column align-items-center adminCompany larger "
      >
        <h3>Empresas</h3>
        <h4 className="h4AdminProfile">{`${companyCount["count(user_id)"]}`}</h4>
      </Col>
      <Col
        md={4}
        onClick={() => {
          navigate("/search/allWorkers");
        }}
        className="cardAdmin d-flex flex-column align-items-center adminWorker larger"
      >
        <h3>Profesionales</h3>
        <h4 className="h4AdminProfile">{`${workerCount["count(user_id)"]}`}</h4>
      </Col>
      <Col
        md={4}
        onClick={() => {
          navigate("/search/allOffers");
        }}
        className="cardAdmin d-flex flex-column align-items-center adminOffer larger"
      >
        <h3>Ofertas</h3>
        <h4 className="h4AdminProfile">{`${offersCount["count(job_offer_id)"]}`}</h4>
      </Col>
    </Row>
  );
};
