import React, { useState, useEffect, useContext } from "react";
import { JiboContext } from "../../../Context/JiboContext";
import axios from "axios";
import { Carrousel } from "../../../Components/Main/Carrousel/Carrousel";
import { ModalLogin } from "../../../Components/Main/Modals/ModalLogin";
import { ModalRegistroCompany } from "../../../Components/Main/Modals/ModalRegistroCompany";
import { ModalRegistroWorker } from "../../../Components/Main/Modals/ModalRegistroWorker";
import { ModalSelectRegister } from "../../../Components/Main/Modals/ModalSelectRegister";
import { CompanyGallery } from "./Gallery/CompanyGallery";
import { Col, Row } from "react-bootstrap";
import "../HomeCompany/HomeCompWork.scss";
import "../../../Style/general.scss";

export const HomeWorker = () => {
  const { setShowModal, showModal } = useContext(JiboContext);
  const [companyCount, setCompanyCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);

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

  useEffect(() => {
    axios
      .get("http://localhost:3000/company/countCompany")
      .then((res) => {
        setCompanyCount(res.data[0]);
      })
      .catch((err) => {});
  }, []);

  return (
    <Col className="ppal-height3 d-flex flex-column justify-content-center align-items-center py-5 px-0">
      <Row className="d-flex justify-content-center w-100">
        <Col
          sm={12}
          lg={3}
          className="d-flex flex-column justify-content-center align-items-start"
        >
          <h2>Busca,</h2>
          <h2> contacta</h2>
          <h2> y encuentra ofertas</h2>
          <p className="">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            architecto recusandae ipsum atque nostrum numquam voluptatem
            similique delectus deleniti repellat!
          </p>
          <button className="buttom2" onClick={() => setShowModal(3)}>
            ¡Únete a nosotros!
          </button>
        </Col>

        <Col none={12} lg={6} className="d-flex justify-content-end mt-3 carr">
          <Carrousel />
        </Col>
      </Row>

      <Row className="sect2 d-flex flex-column my-5 w-100">
        <Col className="d-flex justify-content-center py-4">
          <h2>¡Únete a nosotros!</h2>
        </Col>
        <Col>
          <Row className="d-flex justify-content-center">
            <Col sm={4} className="d-flex flex-column align-items-center py-3">
              <h3>Empresas</h3>
              <h3>{`${companyCount["count(user_id)"]}`}</h3>
            </Col>
            <Col sm={4} className="d-flex flex-column align-items-center py-3">
              <h3>Ofertas</h3>
              <h3>{`${offersCount["count(job_offer_id)"]}`}</h3>
            </Col>
            <Col
              sm={4}
              className="d-flex flex-column align-items-center py-3 text-center"
            >
              <h3>Profesionales cualificados</h3>
              <h3>{`${workerCount["count(user_id)"]}`}</h3>
            </Col>
          </Row>
        </Col>
      </Row>

      {showModal === 1 ? (
        <ModalLogin show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 2 ? (
        <ModalRegistroCompany show={showModal} onHide={() => setShowModal(0)} />
      ) : showModal === 3 ? (
        <ModalRegistroWorker show={showModal} onHide={() => setShowModal(0)} />
      ) : (
        showModal === 4 && (
          <ModalSelectRegister
            show={showModal}
            onHide={() => setShowModal(0)}
          />
        )
      )}

      <Row className="w-100 d-flex justify-content-center">
        <CompanyGallery />
      </Row>
    </Col>
  );
};
