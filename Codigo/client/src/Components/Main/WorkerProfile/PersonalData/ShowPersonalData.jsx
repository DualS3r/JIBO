import React from "react";
import { Col, Row } from "react-bootstrap";

export const ShowPersonalData = ({ workerData }) => {
  return (
    <Row className="pt-3 pb-5">
      <Col sm={12} className="mb-3 d-flex flex-column styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4">Sobre mí</h5>
            <p>{workerData?.worker_bio}</p>
          </Col>
        </Row>
      </Col>

      <Col>
        <Row className="mb-3 d-flex justify-content-between">
          <Col
            lg={6}
            className=" mb-3 mb-lg-0 d-flex flex-column styleInfo styleWidthPersonal"
          >
            <Row>
              <Col sm={12}>
                <h5 className="mb-4">Datos personales</h5>
              </Col>
              <Col sm={6}>
                <p className="fw-bold">Nombre</p>
                <p>{workerData?.name}</p>
              </Col>
              <Col sm={6}>
                <p className="fw-bold">Apellidos</p>
                <p>{workerData?.last_name}</p>
              </Col>

              <Col sm={12}>
                <p className="fw-bold">DNI/NIE</p>
                <p>{workerData?.dni_cif}</p>
              </Col>
            </Row>
          </Col>
          <Col
            lg={5}
            className="d-flex flex-column styleInfo styleWidthPersonal"
          >
            <Row>
              <Col sm={12}>
                <h5 className="mb-4">Datos de contacto</h5>
              </Col>

              <Col sm={12}>
                <p className="fw-bold">Correo electrónico</p>
                <p>{workerData?.email}</p>
              </Col>
              <Col sm={12}>
                <p className="fw-bold">Teléfono</p>
                <p>{workerData?.phone_number}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col sm={12} className="d-flex flex-column styleInfo">
        <Row>
          <Col sm={12}>
            <h5 className="py-4 ">Dirección</h5>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Dirección</p>
            <p>{workerData?.address}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Código Postal</p>
            <p>{workerData?.zip_code}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Provincia</p>
            <p>{workerData?.province}</p>
          </Col>
          <Col sm={6}>
            <p className="fw-bold">Ciudad</p>
            <p>{workerData?.city}</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
